"use server";

import { ID, InputFile, Query } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    if (!DATABASE_ID || !PATIENT_COLLECTION_ID) {
      throw new Error("Database configuration is missing");
    }

    // Check for existing users by both email and phone in parallel
    const [emailResults, phoneResults] = await Promise.all([
      users.list([Query.equal("email", [user.email]), Query.limit(1)]),
      users.list([Query.equal("phone", [user.phone]), Query.limit(1)]),
    ]);

    // Return existing user if found
    if (emailResults.total > 0) {
      return emailResults.users[0];
    }

    if (phoneResults.total > 0) {
      return phoneResults.users[0];
    }

    // Create new user if doesn't exist
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    // Create patient document
    await databases.createDocument(
      DATABASE_ID,
      PATIENT_COLLECTION_ID,
      ID.unique(),
      {
        userId: newUser.$id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: false,
      }
    );

    return parseStringify(newUser);
  } catch (error: any) {
    if (error?.code === 409) {
      // Handle race condition where user was created between our check and create
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
        Query.limit(1),
      ]);

      if (existingUser.total > 0) {
        return existingUser.users[0];
      }
    }

    console.error("Error creating user:", error);
    throw new Error(error?.message || "Failed to create user");
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBlob(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};