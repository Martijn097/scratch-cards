import { HomeIcon, UserIcon, GiftIcon } from "@/components/ui/Icons";
import AuthButton from "@/components/AuthButton";
import Link from 'next/link';

export default function Header() {
  return (
    <div className="z-10 bg-white top-0 w-full gap-4 border-b border-neutral-200 fixed h-[6rem]">
      <div className="max-w-[1080px] mx-auto px-4 w-full h-full flex items-center justify-between">
        <div className="flex flex-1 justify-start">
          <Link 
            className="flex p-3 border border-neutral-200 rounded-lg"
            href="/"
          >
            <HomeIcon className="h-8 w-8 cursor-pointer" />
          </Link>
        </div>
        <Link
          className="flex items-center px-4 py-3 border border-neutral-200 rounded-lg bg-purple-400 shadow gap-2 mx-auto"
          href="/overview">
          <GiftIcon className="h-8 w-8 text-white cursor-pointer" />
          <span className="text-white text-xl bold">Krasloten</span>
        </Link>
        <div className="flex justify-end gap-4 flex-1">
          <Link
            className="flex p-3 border border-neutral-200 rounded-lg"
            href="/about"
          >
            <UserIcon className="h-8 w-8 cursor-pointer" />
          </Link>
          <AuthButton />
        </div>
      </div>
    </div>
  );
}
