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
    <div className="flex flex-col-reverse gap-12 p-4 overflow-hidden xl:flex-row xl:min-h-screen xl:p-8">
      
      <div className="w-full flex justify-center xl:w-2/4">
        <div className="max-w-md h-full w-full flex items-center xl:max-w-lg">

          <div className="flex-1 flex flex-col w-full justify-center gap-2">
            <span className="text-3xl mb-2 xl:text-4xl xl:mb-4">Inloggen</span>
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
                className="bg-purple-400 text-white rounded-md px-4 py-3 text-foreground mb-2"
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

        </div>
      </div>

      <div className="w-full h-[24rem] text-4xl flex flex-col items-center font-bold bg-purple-300 bg-pattern-opacity-160 
                      rounded-2xl p-8 overflow-hidden xl:w-2/4 sm:h-[40rem] xl:h-[unset] xl:py-16 xl:px-12">
        <div className="h-full w-full z-10 gap-2 flex flex-col items-center xl:gap-10 xl:max-w-xl">
          <div className="flex items-center h-[4rem]">
            <span className="text-white text-3xl mr-2 xl:text-5xl xl:mr-4">Hey, Dana</span> 
            <div className="animate-customWave">
              <Image
                src="/emojis/wave.png"
                className="w-12 h-12 xl:w-16 xl:h-16"
                alt="Wave emoji"
                width={64}
                height={64}
              />
            </div>
          </div>

          <div className="max-w-[16rem] z-10 h-[calc(100%-4rem)] w-full relative xl:max-w-[unset]">
            <div className="bg-white p-3 rounded-2xl shadow-images h-[80%] w-[60%] absolute z-10 xl:p-6">
              <Image
                src="/images/about_image_1.jpg"
                className="w-full h-full object-cover rounded-xl"
                alt="About image 1"
                width={1000}
                height={1000}
              />
            </div>
            <div className="bg-white p-3 rounded-2xl shadow-images h-[60%] w-[60%] top-[10%] right-0 absolute z-20 xl:p-6">
              <Image
                src="/images/about_image_2.jpg"
                className="w-full h-full object-cover rounded-xl"
                alt="About image 2"
                width={1000}
                height={1000}
              />
            </div>
            <div className="bg-white p-3 rounded-2xl shadow-images h-[60%] w-[60%] absolute z-30 left-1/2 transform -translate-x-1/2 bottom-0 xl:p-6">
              <Image
                src="/images/about_image_3.jpg"
                className="w-full h-full object-cover rounded-xl"
                alt="About image 3"
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
