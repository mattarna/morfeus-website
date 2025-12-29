"use client";

import { useScrollStore } from "@/app/store/useScrollStore";
import { ContactForm } from "@/components/ContactForm";
import { useLocale } from "next-intl";

export function Overlays() {
  const isOpen = useScrollStore((state) => state.isContactFormOpen);
  const setIsOpen = useScrollStore((state) => state.setIsContactFormOpen);
  const locale = useLocale();

  return (
    <ContactForm 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
      locale={locale} 
    />
  );
}

