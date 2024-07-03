import Card from '@/components/ui/Card';
import Home from '@/components/ui/test'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Footer from "@/components/ui/Footer";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="min-h-screen flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <Card />
        <Home />
      </div>
      <Footer />
    </div>
  );
}