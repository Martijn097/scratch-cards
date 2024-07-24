import { createClient } from "@/utils/supabase/server";
import Image from 'next/image';
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
    <div className="min-h-screen flex-1 w-full flex flex-col gap-12 items-center">

      <div className="flex max-w-[1080px] mx-auto px-4 mt-8 items-center w-full justify-center flex-col gap-2">
        <div className="text-4xl flex font-bold gap-2">
          <span className="text-center">Hi Dana</span>
          <div className="animate-customPulse">
            <Image
              src="/emojis/heart.png"
              alt="Heart emoji"
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="text-xl font-normal text-black-400">
          <span className="text-center flex w-full">Welkom in je persoonlijke krasposter app!</span>
        </div>
      </div>
      <main className="flex-1 flex flex-col gap-6 w-full max-w-[1080px] mx-auto px-10 flex items-center">
        <div className="relative aspect-square flex items-center justify-center w-full h-full sm:w-[32rem] sm:h-[32rem]">
          <div className="absolute bg-purple-100 rounded-full w-full h-full sm:w-[24rem] sm:h-[24rem]"></div>
          <div className="absolute bg-purple-200 rounded-full w-[90%] h-[90%] sm:w-[20rem] sm:h-[20rem]"></div>
          <div className="rotate-[-10deg] shadow-custom bg-pattern-opacity absolute bg-purple-300 w-[80%] h-[80%] rounded-lg flex items-center justify-center sm:w-[16rem] sm:h-[16rem]">
            <div className="absolute bg-purple-400 w-[60%] h-[60%] rounded-full flex items-center justify-center sm:h-[8rem] sm:w-[8rem]">
              <span className="text-white text-3xl text-center leading-7">Kras<br></br>& win</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
