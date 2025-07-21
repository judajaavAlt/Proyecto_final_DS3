"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeaderMain() {
  return (
    <header className="bg-[#0F172A]/80 border-b border-gray-800 shadow-lg backdrop-blur-md backdrop-saturate-150">
      <div className="container mx-auto flex items-center justify-center py-2 px-4">
        <Link href="/" className="flex items-center gap-5">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={36}
            height={36}
            className="object-contain rounded-full"
          />

          <span className="text-2xl font-bold text-white tracking-tight">
            ONE<span className="text-[var(--red-light)]">Review</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
