import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-[90rem] flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
      <p lang="ko" className="font-hangul text-4xl text-berry">
        어머나
      </p>
      <h1 className="type-display mt-4 max-w-[14ch] text-[clamp(2.75rem,7vw,5.5rem)]">This glass is empty.</h1>
      <p className="mt-6 max-w-md text-lg text-muted">
        The page you’re looking for doesn’t exist or has moved. Let’s get you back to the good stuff.
      </p>
      <Link href="/" className="btn btn-primary mt-10 self-start">
        Back to Sojuholics
        <ArrowIcon />
      </Link>
    </section>
  );
}
