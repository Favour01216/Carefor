import Image from "next/image";
import Link from "next/link";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Preload the form component
const PatientForm = dynamic(
  () => import('@/components/forms/PatientForm').then((mod) => mod.PatientForm),
  {
    loading: () => (
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-full rounded-md bg-dark-400" />
        <div className="h-10 w-full rounded-md bg-dark-400" />
        <div className="h-10 w-full rounded-md bg-dark-400" />
      </div>
    ),
    ssr: true // Enable SSR for faster initial paint
  }
);

const PasskeyModal = dynamic(
  () => import('@/components/PasskeyModal').then((mod) => mod.PasskeyModal),
  { ssr: false }
);

// Add metadata for better SEO and preloading hints
export const metadata = {
  alternates: {
    canonical: '/'
  }
};

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-icon.svg"
            height={240}
            width={240}
            alt="CareFor Logo"
            className="mb-8 h-auto w-[240px]"
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,..."
          />

          <Suspense
            fallback={
              <div className="animate-pulse space-y-6">
                <div className="h-10 w-full rounded-md bg-dark-400" />
                <div className="h-10 w-full rounded-md bg-dark-400" />
                <div className="h-10 w-full rounded-md bg-dark-400" />
              </div>
            }
          >
            <PatientForm />
          </Suspense>

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CareFor
            </p>
            <Link href="/?admin=true" className="text-green-500" prefetch={false}>
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={900}
        width={900}
        alt="Healthcare professional with patient"
        className="side-img max-w-[50%] object-cover"
        priority
        quality={85}
        loading="eager"
      />
    </div>
  );
};

export default Home;