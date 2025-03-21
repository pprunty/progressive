'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from './button';
// Lucide React icons
import { ArrowRight, Save, Trash, Download, Mail } from 'lucide-react';
// Phosphor icons
import {
  ArrowRight as PhArrowRight,
  FloppyDisk,
  TrashSimple,
  DownloadSimple,
} from '@phosphor-icons/react';

// OAuth Icons
export const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="19.2"
    viewBox="0 0 24 24"
    width="19.2"
    {...props}
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

export const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="19.2"
    height="19.2"
    fill="currentColor"
    {...props}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export default function ButtonDemo() {
  return (
    <div className="space-y-12">
      <ButtonVariantsDemo />
      <ButtonWithLucideIconsDemo />
      <ButtonWithPhosphorIconsDemo />
      <ButtonLoadingStatesDemo />
      <ButtonSizesDemo />
      <ButtonExtendedClickAreaDemo />
      <OAuthButtonsDemo />
    </div>
  );
}

export function ButtonVariantsDemo() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">Primary</h3>
          <Button title="Primary Button" variant="primary" />
          <Button title="Disabled" variant="primary" disabled />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Secondary
          </h3>
          <Button title="Secondary Button" variant="secondary" />
          <Button title="Disabled" variant="secondary" disabled />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Destructive
          </h3>
          <Button title="Destructive Button" variant="destructive" />
          <Button title="Disabled" variant="destructive" disabled />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">Action</h3>
          <Button title="Action Button" variant="action" />
          <Button title="Disabled" variant="action" disabled />
        </div>
      </div>
    </section>
  );
}

export function ButtonWithLucideIconsDemo() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        Buttons with Lucide React Icons
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          title="Continue"
          variant="primary"
          icon={<ArrowRight className="w-4 h-4" />}
        />

        <Button
          title="Save Changes"
          variant="secondary"
          icon={<Save className="w-4 h-4" />}
        />

        <Button
          title="Delete Item"
          variant="destructive"
          icon={<Trash className="w-4 h-4" />}
        />

        <Button
          title="Download"
          variant="action"
          icon={<Download className="w-4 h-4" />}
        />
      </div>
    </section>
  );
}

export function ButtonWithPhosphorIconsDemo() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        Buttons with Phosphor Icons
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          title="Continue"
          variant="primary"
          icon={<PhArrowRight weight="bold" className="w-4 h-4" />}
        />

        <Button
          title="Save Changes"
          variant="secondary"
          icon={<FloppyDisk weight="bold" className="w-4 h-4" />}
        />

        <Button
          title="Delete Item"
          variant="destructive"
          icon={<TrashSimple weight="bold" className="w-4 h-4" />}
        />

        <Button
          title="Download"
          variant="action"
          icon={<DownloadSimple weight="bold" className="w-4 h-4" />}
        />
      </div>
    </section>
  );
}

export function ButtonLoadingStatesDemo() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Loading States</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Button title="Loading..." variant="primary" isLoading={true} />

        <Button title="Loading..." variant="secondary" isLoading={true} />

        <Button title="Loading..." variant="destructive" isLoading={true} />

        <Button title="Loading..." variant="action" isLoading={true} />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Button
          title="Custom Size Spinner"
          variant="primary"
          isLoading={true}
          spinnerSize={12}
        />

        <Button
          title="Custom Color Spinner"
          variant="secondary"
          isLoading={true}
          spinnerColor="#ff5500"
        />

        <Button
          title="Large Spinner"
          variant="action"
          isLoading={true}
          spinnerSize={24}
        />
      </div>
    </section>
  );
}

export function ButtonSizesDemo() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Custom Sizes via className</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button
          title="Small Button"
          variant="primary"
          className="py-1 text-xs"
          icon={<PhArrowRight weight="bold" className="w-3 h-3" />}
        />

        <Button
          title="Default Size"
          variant="primary"
          icon={<PhArrowRight weight="bold" className="w-4 h-4" />}
        />

        <Button
          title="Large Button"
          variant="primary"
          className="py-3 text-base"
          icon={<PhArrowRight weight="bold" className="w-5 h-5" />}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          title="Full Width (Default)"
          variant="secondary"
          icon={<FloppyDisk weight="bold" className="w-4 h-4" />}
        />

        <Button
          title="Custom Width"
          variant="secondary"
          className="max-w-[200px] mx-auto"
          icon={<FloppyDisk weight="bold" className="w-4 h-4" />}
        />
      </div>
    </section>
  );
}

export function ButtonExtendedClickAreaDemo() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Extended Click Area</h2>
      <p className="text-muted-foreground mb-4">
        The buttons below have an extended click area (invisible) that extends
        beyond their visible boundaries. This makes them easier to click,
        especially on touch devices.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        <div className="flex justify-center">
          <Button
            title="Standard Click Area"
            variant="primary"
            className="max-w-[200px]"
            icon={<ArrowRight className="w-4 h-4" />}
          />
        </div>

        <div className="flex justify-center">
          <Button
            title="Extended Click Area"
            variant="primary"
            className="max-w-[200px]"
            extendedClickArea={true}
            icon={<ArrowRight className="w-4 h-4" />}
          />
        </div>
      </div>
    </section>
  );
}

export function OAuthButtonsDemo() {
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailClick = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">OAuth Login Buttons</h2>
      <div className="max-w-md mx-auto flex flex-col gap-3">
        <Button
          title="Continue with Google"
          variant="secondary"
          icon={<GoogleIcon />}
        />

        <Button
          title="Continue with GitHub"
          variant="secondary"
          icon={<GitHubIcon />}
        />

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Or</span>
          </div>
        </div>

        <Button
          title={isLoading ? 'Signing in...' : 'Continue with Email'}
          variant="secondary"
          icon={!isLoading && <Mail className="w-4 h-4" />}
          isLoading={isLoading}
          onClick={handleEmailClick}
        />
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <a href="#" className="underline hover:text-foreground">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="underline hover:text-foreground">
          Privacy Policy
        </a>
        .
      </div>
    </section>
  );
}
