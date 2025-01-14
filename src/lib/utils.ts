import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function smoothScrollTo(targetId: string) {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const headerOffset = 80;
  const targetPosition = targetElement.offsetTop - headerOffset;
  const isInHeroSection = window.scrollY < 100;

  // First update URL
  window.history.pushState(null, '', `#${targetId}`);

  if (isInHeroSection) {
    // If in hero section, do the two-step scroll
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    window.scrollTo(0, 100); // Small scroll to break lock

    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Reset scroll behavior after animation
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = '';
        document.body.style.scrollBehavior = '';
      }, 1000);
    }, 50);
  } else {
    // If not in hero section, just do a normal smooth scroll
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}
