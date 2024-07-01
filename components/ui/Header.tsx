import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex mt-8 items-center w-full justify-center flex-col gap-4">
      <div className="text-4xl flex font-bold">
        <span>Hi Dana</span>
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
        <span>Welkom in je persoonlijke krasposter app!</span>
      </div>
    </div>
  );
}
