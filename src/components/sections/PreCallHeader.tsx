"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { trackPrecallEvent } from "@/lib/tracking/precall";

interface PreCallHeaderProps {
  locale: string;
}

export function PreCallHeader({ locale }: PreCallHeaderProps) {
  const ctaLabel = locale === "it" ? "Guarda il video" : "Watch the video";

  const onWatchVideoClick = () => {
    trackPrecallEvent("precall_watch_video_click", {
      section_target: "precall-video",
      locale
    });
    document.getElementById("precall-video")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 z-[220] w-full border-b border-white/5 bg-black/20 py-2.5 backdrop-blur-xl px-6 md:px-10">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center">
          <div className="relative h-8 w-28 md:h-12 md:w-40">
            <Image
              src="/images/m-w2.png"
              alt="Morfeus Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        <button
          onClick={onWatchVideoClick}
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-700 px-5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.45)] md:gap-3 md:px-8 md:py-2.5 md:text-[11px]"
        >
          <span>{ctaLabel}</span>
          <Icon icon="solar:play-bold" className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </button>
      </div>
    </header>
  );
}
