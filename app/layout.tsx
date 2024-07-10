import "./globals.css";
import Header from "@/components/ui/Header";
import { createClient } from "@/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <html lang="en">
        <body className="min-h-screen bg-white text-black font-sans font-bold">
          <div className="max-w-[1080px] mx-auto px-4">
            {children}
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black font-sans font-bold pt-[6rem]">
        <Header />
        <div className="max-w-[1080px] mx-auto px-4">
          {children}
        </div>
      </body>
    </html>
  );
}
