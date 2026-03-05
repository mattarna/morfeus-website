"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

type LenisInstance = InstanceType<typeof Lenis> | null;

const SmoothScrollContext = createContext<{
  lenis: LenisInstance;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number }) => void;
}>({
  lenis: null,
  scrollTo: () => {},
});

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    return {
      lenis: null,
      scrollTo: (target: string | HTMLElement) => {
        const el = typeof target === "string" ? document.querySelector(target) : target;
        if (el instanceof HTMLElement) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      },
    };
  }
  return ctx;
}

type SmoothScrollProviderProps = {
  children: ReactNode;
  options?: ConstructorParameters<typeof Lenis>[0];
};

export function SmoothScrollProvider({ children, options }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<LenisInstance>(null);

  const scrollTo = useCallback(
    (target: string | HTMLElement, scrollOptions?: { offset?: number }) => {
      const el =
        typeof target === "string"
          ? (target.startsWith("#") ? document.getElementById(target.slice(1)) : document.querySelector(target))
          : target;
      if (lenis && el) {
        lenis.scrollTo(el as HTMLElement, {
          offset: scrollOptions?.offset ?? 0,
          duration: 1.2,
          programmatic: true,
        });
      } else if (el instanceof HTMLElement) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis]
  );

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      autoRaf: true,
      ...options,
    });
    setLenis(instance);

    return () => {
      instance.destroy();
      setLenis(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options intentionally not in deps to avoid re-init
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
