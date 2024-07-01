import { HomeIcon, UserIcon, GiftIcon } from "@/components/ui/Icons";
import AuthButton from "@/components/AuthButton";
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="flex items-center mb-8">
      <div className="bg-purple-400 px-8 py-4 flex gap-4 rounded-full shadow">
        <Link href="/">
          <HomeIcon className="h-8 w-8 text-white cursor-pointer" />
        </Link>
        <Link href="/about">
          <UserIcon className="h-8 w-8 text-white cursor-pointer" />
        </Link>
        <Link href="/overview">
          <GiftIcon className="h-8 w-8 text-white cursor-pointer" />
        </Link>
        <AuthButton />
      </div>
    </div>
  );
}