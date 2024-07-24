import { HomeIcon, UserIcon, GiftIcon, HamburgerIcon } from "@/components/ui/Icons";
// import HeaderOpenMenu from "@/components/ui/HeaderOpenMenu";
import AuthButton from "@/components/AuthButton";
import Link from 'next/link';

export default function Header() {
  return (
    <div className="z-10 bg-white top-0 w-full gap-4 border-b border-neutral-200 fixed">

      {/* Mobile Header */}
      {/* <div className="block md:hidden h-[4.5rem] flex items-center justify-between px-4">
        <Link
          className="flex items-center px-4 py-3 border border-neutral-200 rounded-lg bg-purple-400 shadow gap-2"
          href="/overview">
          <GiftIcon className="h-8 w-8 text-white cursor-pointer" />
          <span className="text-white text-xl bold">Krasloten</span>
        </Link>
        <HeaderOpenMenu />
      </div> */}

      {/* Desktop Header */}
      <div className="flex max-w-[1080px] h-[4.5rem] sm:h-[6rem] mx-auto px-4 w-full flex items-center justify-between">
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
          <AuthButton />
        </div>
      </div>

    </div>
  );
}
