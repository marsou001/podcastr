"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter } from "next/navigation";

function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (search.length > 0) {
      router.push("/discover?search=" + search);
    } else if (search.length === 0 && pathname === "/discover") {
      router.push("/discover");
    }
  }, [router, pathname, search]);

  return (
    <div className="relative block mt-8">
      <Input
        placeholder="Search for podcasts"
        className="input-class py-6 pl-12 focus-visible:ring-orange-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch("")}
      />
      <Image src="/icons/search.svg" alt="search" width={20} height={20} className="absolute top-3.5 left-4" />
    </div>
  )
}

export default SearchBar;