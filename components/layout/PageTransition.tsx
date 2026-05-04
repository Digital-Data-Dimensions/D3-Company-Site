'use client';

import { usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      const el = ref.current;
      if (!el) return;
      // Remove then re-add to re-trigger the animation
      el.classList.remove('pt-enter');
      void el.offsetWidth; // force reflow
      el.classList.add('pt-enter');
    }
  }, [pathname]);

  return (
    <div ref={ref} className="pt-enter">
      {children}
      <style>{`
        @keyframes pt-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pt-enter {
          animation: pt-fade-up 0.38s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .pt-enter { animation: none; }
        }
      `}</style>
    </div>
  );
}
