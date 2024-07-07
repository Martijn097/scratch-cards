import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
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
    <div className="min-h-screen flex-1 w-full flex flex-col gap-20 items-center">

      <Header />
      <main className="flex-1 flex flex-col gap-6">
        <div className="relative h-[32rem] w-[32rem] flex items-center justify-center">
          <div className="absolute bg-purple-100 h-[24rem] w-[24rem] rounded-full"></div>
          <div className="absolute bg-purple-200 h-[20rem] w-[20rem] rounded-full"></div>
          <div className="rotate-[-10deg] shadow-custom bg-pattern-opacity absolute bg-purple-300 h-[16rem] w-[16rem] rounded-lg flex items-center justify-center">
            <div className="absolute bg-purple-400 h-[8rem] w-[8rem] rounded-full flex items-center justify-center">
              <span className="text-white text-3xl text-center leading-7">Kras<br></br>& win</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
