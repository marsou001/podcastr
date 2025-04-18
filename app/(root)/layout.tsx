import LeftSideBar from "@/components/LeftSideBar";
import MobileNav from "@/components/MobileNav";
import PodcastPlayer from "@/components/PodcastPlayer";
import RightSideBar from "@/components/RightSideBar";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSideBar />

        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex flex-col w-full max-w-5xl max-sm:px-4">
            <div className="flex h-16 justify-between items-center md:hidden">
              <Image src="/icons/logo.svg" alt="menu icon" width={30} height={30} />
              <MobileNav />
            </div>
            <div className="flex flex-col md:pb-14">
              {children}
              <Toaster />
            </div>
          </div>
        </section>

        <RightSideBar />
        <PodcastPlayer />
      </main>
    </div>
  );
}
