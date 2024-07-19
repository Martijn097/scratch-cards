import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
// import { redirect } from "next/navigation";
import { useRouter } from 'next/router';
import { LogoutIcon } from "@/components/ui/Icons";

export default async function AuthButton() {
  const supabase = createClient();
  const router = useRouter();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use client";

    const supabase = createClient();
    await supabase.auth.signOut();
    // return redirect("/login");
    router.push('/login');
  };

  return user ? (
    <div className="flex items-center gap-4">
      {/* Hey, {user.email}! */}
      <form action={signOut}>
        <button className="flex p-3 border border-neutral-200 rounded-lg">
          <LogoutIcon className="h-8 w-8 cursor-pointer" />
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
