"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useCallback, memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";
import dynamic from 'next/dynamic';

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";

// Dynamically import the submit button to reduce initial JS bundle
const SubmitButton = dynamic(() => import("../SubmitButton"), {
  ssr: true,
  loading: () => <div className="h-10 w-full animate-pulse rounded-md bg-dark-400" />
});

const PatientForm = memo(function PatientForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = useCallback(async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    setError(null);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        form.reset();
        router.refresh(); // Update server cache
        router.replace(`/patients/${newUser.$id}/register`);
      }
    } catch (error: any) {
      console.error('Error during sign up:', error);
      setError(error?.message || 'An error occurred during sign up. Please try again.');
      setIsLoading(false);
    }
  }, [form, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6" autoComplete="off">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Get started with appointments.</p>
        </section>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          autoComplete="name"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          autoComplete="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
          autoComplete="tel"
        />

        <SubmitButton isLoading={isLoading}>
          {isLoading ? 'Creating Account...' : 'Get Started'}
        </SubmitButton>
      </form>
    </Form>
  );
});

export { PatientForm };