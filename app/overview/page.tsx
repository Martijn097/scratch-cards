import Card from '@/components/ui/Card';
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card />
      </div>
      <Footer />
    </div>
  );
}