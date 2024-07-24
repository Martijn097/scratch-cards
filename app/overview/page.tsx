import Cards from "@/components/ui/Cards";
import OverviewHeader from "@/components/ui/OverviewHeader";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="min-h-screen flex-1 w-full flex flex-col items-center">
      <OverviewHeader />
      <div className="w-full max-w-[1080px] mx-auto px-10 sm:px-4 my-12 sm:my-20">
        <Cards />
      </div>
    </div>
  );
}