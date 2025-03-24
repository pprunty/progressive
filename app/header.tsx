import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';

export function Header() {
  return (
    <header className="flex items-center justify-between gap-1">
      <Link href="/">
       <svg xmlns="http://www.w3.org/2000/svg"           className="fill-foreground dark:fill-foreground transition-colors" width="28" height="28" viewBox="0 0 56 56"><path fill="currentColor" d="M9.965 50.207h36.07c3.985 0 6.469-2.86 6.469-6.469c0-1.078-.281-2.18-.867-3.187L33.567 9.074c-1.22-2.133-3.352-3.281-5.555-3.281c-2.18 0-4.336 1.148-5.579 3.281l-18.07 31.5a6.25 6.25 0 0 0-.867 3.164c0 3.61 2.508 6.469 6.469 6.469m.047-3.68c-1.641 0-2.72-1.336-2.72-2.789c0-.422.071-.914.306-1.406l18.046-31.477c.516-.89 1.454-1.312 2.368-1.312v36.984Z"></path></svg>
      </Link>
      <ThemeSwitcher />
    </header>
  );
}
