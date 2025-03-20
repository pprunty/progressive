import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';

export function Header() {
  return (
    <header className="flex items-center justify-between gap-1">
      <Link href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 400 400"
          className="fill-foreground dark:fill-foreground rounded-2xl transition-colors"
        >
          <path d="m87.347 290.6 112.65-256.99h6.2996l106.35 256.99zm181.02-15.749-75.04-184.54-81.155 184.54z" />
        </svg>
      </Link>
      <ThemeSwitcher />
    </header>
  );
}
