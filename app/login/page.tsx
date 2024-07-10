import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import Container from "@/components/ui/Container"
import Image from 'next/image';

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const supabase = createClient();

  // Check if the user is already logged in
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // If the user is logged in, redirect to the homepage
    return redirect("/");
  }

  const signIn = async (formData: FormData) => {
    "use server";

    const supabase = createClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  // const signUp = async (formData: FormData) => {
  //   "use server";

  //   const origin = headers().get("origin");
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
  //   const supabase = createClient();

  //   const { error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${origin}/auth/callback`,
  //     },
  //   });

  //   if (error) {
  //     return redirect("/login?message=Could not authenticate user");
  //   }

  //   return redirect("/login?message=Check email to continue sign in process");
  // };

  return (
    <Container>
      <div className="text-4xl flex font-bold">
        <span>Hi Dana</span> 
        <div className="animate-customPulse">
          <Image
            src="/emojis/heart.png"
            alt="Heart emoji"
            width={40}
            height={40}
          />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col w-full sm:max-w-md justify-center gap-2">
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <label className="text-md" htmlFor="email">
            E-mailadres
          </label>
          <input
            className="rounded-md px-4 py-2 h-12 bg-inherit border-black-200 border mb-6 font-normal"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Wachtwoord
          </label>
          <input
            className="rounded-md px-4 py-2 h-12 bg-inherit border border-black-200 mb-6 font-normal"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="bg-purple-400 text-white rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing In..."
          >
            Inloggen
          </SubmitButton>
          {/* <SubmitButton
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton> */}
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </Container>
  );
}
