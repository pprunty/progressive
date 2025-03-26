import { Metadata } from 'next'

// Base URL for the site
const BASE_URL = 'https://deltacomponents.dev'

// Base metadata that all component pages will inherit
const baseMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  authors: [{ name: 'Patrick Prunty', url: 'https://patrickprunty.com' }],
  creator: 'Patrick Prunty',
  publisher: 'Patrick Prunty',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Delta Components',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delta Components',
    description: 'A modern component library and registry built with shadcn/ui',
    creator: '@patrickprunty',
  },
}

// Create metadata map for each component
export const componentMetadata: Record<string, Metadata> = {
  'complex-component': {
    title: 'Complex Component | Delta Components',
    description: 'A complex component showing hooks, libs and components. Demonstrates how to build a Pokemon card component with data fetching and state management.',
    openGraph: {
      title: 'Complex Component | Delta Components',
      description: 'A complex component showing hooks, libs and components. Demonstrates how to build a Pokemon card component with data fetching and state management.',
      url: `${BASE_URL}/docs/complex-component`,
      images: [
        {
          url: `${BASE_URL}/og/complex-component.png`,
          width: 1200,
          height: 630,
          alt: 'Complex Component Preview',
        },
      ],
    },
  },
  'admonition': {
    title: 'Admonition | Delta Components',
    description: 'A versatile component for displaying important information, warnings, or tips in a visually distinct way.',
    openGraph: {
      title: 'Admonition | Delta Components',
      description: 'A versatile component for displaying important information, warnings, or tips in a visually distinct way.',
      url: `${BASE_URL}/docs/admonition`,
      images: [
        {
          url: `${BASE_URL}/og/admonition.png`,
          width: 1200,
          height: 630,
          alt: 'Admonition Component Preview',
        },
      ],
    },
  },
  'modal': {
    title: 'Modal | Delta Components',
    description: 'A customizable modal component with animations and various style options. Built with Framer Motion for smooth transitions.',
    openGraph: {
      title: 'Modal | Delta Components',
      description: 'A customizable modal component with animations and various style options. Built with Framer Motion for smooth transitions.',
      url: `${BASE_URL}/docs/modal`,
      images: [
        {
          url: `${BASE_URL}/og/modal.png`,
          width: 1200,
          height: 630,
          alt: 'Modal Component Preview',
        },
      ],
    },
  },
  'scramble-in': {
    title: 'Scramble In | Delta Components',
    description: 'A text animation component that scrambles and reveals text with a modern, engaging effect.',
    openGraph: {
      title: 'Scramble In | Delta Components',
      description: 'A text animation component that scrambles and reveals text with a modern, engaging effect.',
      url: `${BASE_URL}/docs/scramble-in`,
      images: [
        {
          url: `${BASE_URL}/og/scramble-in.png`,
          width: 1200,
          height: 630,
          alt: 'Scramble In Component Preview',
        },
      ],
    },
  },
  'neobrutalism-card': {
    title: 'Neobrutalism Card | Delta Components',
    description: 'A bold, modern card component inspired by the neobrutalism design movement.',
    openGraph: {
      title: 'Neobrutalism Card | Delta Components',
      description: 'A bold, modern card component inspired by the neobrutalism design movement.',
      url: `${BASE_URL}/docs/neobrutalism-card`,
      images: [
        {
          url: `${BASE_URL}/og/neobrutalism-card.png`,
          width: 1200,
          height: 630,
          alt: 'Neobrutalism Card Component Preview',
        },
      ],
    },
  },
  'use-hq-image': {
    title: 'useHqImage Hook | Delta Components',
    description: 'A React hook for loading high-quality images with automatic fallback and loading states.',
    openGraph: {
      title: 'useHqImage Hook | Delta Components',
      description: 'A React hook for loading high-quality images with automatic fallback and loading states.',
      url: `${BASE_URL}/docs/use-hq-image`,
      images: [
        {
          url: `${BASE_URL}/og/use-hq-image.png`,
          width: 1200,
          height: 630,
          alt: 'useHqImage Hook Preview',
        },
      ],
    },
  },
  'bottom-bar': {
    title: 'Bottom Bar | Delta Components',
    description: 'A mobile-friendly bottom navigation bar component with customizable icons and labels.',
    openGraph: {
      title: 'Bottom Bar | Delta Components',
      description: 'A mobile-friendly bottom navigation bar component with customizable icons and labels.',
      url: `${BASE_URL}/docs/bottom-bar`,
      images: [
        {
          url: `${BASE_URL}/og/bottom-bar.png`,
          width: 1200,
          height: 630,
          alt: 'Bottom Bar Component Preview',
        },
      ],
    },
  },
  'full-bleed-section': {
    title: 'Full Bleed Section | Delta Components',
    description: 'A section component that extends to the full width of the viewport with customizable content alignment.',
    openGraph: {
      title: 'Full Bleed Section | Delta Components',
      description: 'A section component that extends to the full width of the viewport with customizable content alignment.',
      url: `${BASE_URL}/docs/full-bleed-section`,
      images: [
        {
          url: `${BASE_URL}/og/full-bleed-section.png`,
          width: 1200,
          height: 630,
          alt: 'Full Bleed Section Component Preview',
        },
      ],
    },
  },
  'tweet': {
    title: 'Tweet | Delta Components',
    description: 'A component for embedding and displaying tweets with server-side rendering and custom styling.',
    openGraph: {
      title: 'Tweet | Delta Components',
      description: 'A component for embedding and displaying tweets with server-side rendering and custom styling.',
      url: `${BASE_URL}/docs/tweet`,
      images: [
        {
          url: `${BASE_URL}/og/tweet.png`,
          width: 1200,
          height: 630,
          alt: 'Tweet Component Preview',
        },
      ],
    },
  },
  'video-player': {
    title: 'Video Player | Delta Components',
    description: 'A customizable video player component with controls, thumbnail support, and responsive design.',
    openGraph: {
      title: 'Video Player | Delta Components',
      description: 'A customizable video player component with controls, thumbnail support, and responsive design.',
      url: `${BASE_URL}/docs/video-player`,
      images: [
        {
          url: `${BASE_URL}/og/video-player.png`,
          width: 1200,
          height: 630,
          alt: 'Video Player Component Preview',
        },
      ],
    },
  },
  'tabs': {
    title: 'Tabs | Delta Components',
    description: 'A flexible tabs component with support for different styles, animations, and content organization.',
    openGraph: {
      title: 'Tabs | Delta Components',
      description: 'A flexible tabs component with support for different styles, animations, and content organization.',
      url: `${BASE_URL}/docs/tabs`,
      images: [
        {
          url: `${BASE_URL}/og/tabs.png`,
          width: 1200,
          height: 630,
          alt: 'Tabs Component Preview',
        },
      ],
    },
  },
  'button': {
    title: 'Button | Delta Components',
    description: 'A versatile button component with multiple variants, sizes, and states.',
    openGraph: {
      title: 'Button | Delta Components',
      description: 'A versatile button component with multiple variants, sizes, and states.',
      url: `${BASE_URL}/docs/button`,
      images: [
        {
          url: `${BASE_URL}/og/button.png`,
          width: 1200,
          height: 630,
          alt: 'Button Component Preview',
        },
      ],
    },
  },
  'text-input': {
    title: 'Text Input | Delta Components',
    description: 'A text input component with validation, error handling, and various styling options.',
    openGraph: {
      title: 'Text Input | Delta Components',
      description: 'A text input component with validation, error handling, and various styling options.',
      url: `${BASE_URL}/docs/text-input`,
      images: [
        {
          url: `${BASE_URL}/og/text-input.png`,
          width: 1200,
          height: 630,
          alt: 'Text Input Component Preview',
        },
      ],
    },
  },
  'checkbox-input': {
    title: 'Checkbox Input | Delta Components',
    description: 'A checkbox input component with validation, error handling, and label support.',
    openGraph: {
      title: 'Checkbox Input | Delta Components',
      description: 'A checkbox input component with validation, error handling, and label support.',
      url: `${BASE_URL}/docs/checkbox-input`,
      images: [
        {
          url: `${BASE_URL}/og/checkbox-input.png`,
          width: 1200,
          height: 630,
          alt: 'Checkbox Input Component Preview',
        },
      ],
    },
  },
  'select-input': {
    title: 'Select Input | Delta Components',
    description: 'A select input component with both native and shadcn/ui select variants.',
    openGraph: {
      title: 'Select Input | Delta Components',
      description: 'A select input component with both native and shadcn/ui select variants.',
      url: `${BASE_URL}/docs/select-input`,
      images: [
        {
          url: `${BASE_URL}/og/select-input.png`,
          width: 1200,
          height: 630,
          alt: 'Select Input Component Preview',
        },
      ],
    },
  },
  'radio-input': {
    title: 'Radio Input | Delta Components',
    description: 'A radio input group component with validation and description support.',
    openGraph: {
      title: 'Radio Input | Delta Components',
      description: 'A radio input group component with validation and description support.',
      url: `${BASE_URL}/docs/radio-input`,
      images: [
        {
          url: `${BASE_URL}/og/radio-input.png`,
          width: 1200,
          height: 630,
          alt: 'Radio Input Component Preview',
        },
      ],
    },
  },
  'switch-input': {
    title: 'Switch Input | Delta Components',
    description: 'A switch toggle component with validation and label support.',
    openGraph: {
      title: 'Switch Input | Delta Components',
      description: 'A switch toggle component with validation and label support.',
      url: `${BASE_URL}/docs/switch-input`,
      images: [
        {
          url: `${BASE_URL}/og/switch-input.png`,
          width: 1200,
          height: 630,
          alt: 'Switch Input Component Preview',
        },
      ],
    },
  },
  'textarea-input': {
    title: 'Textarea Input | Delta Components',
    description: 'A textarea component with validation, error handling, and various styling options.',
    openGraph: {
      title: 'Textarea Input | Delta Components',
      description: 'A textarea component with validation, error handling, and various styling options.',
      url: `${BASE_URL}/docs/textarea-input`,
      images: [
        {
          url: `${BASE_URL}/og/textarea-input.png`,
          width: 1200,
          height: 630,
          alt: 'Textarea Input Component Preview',
        },
      ],
    },
  },
  'date-input': {
    title: 'Date Input | Delta Components',
    description: 'A date picker component with validation, min/max date support, and formatting options.',
    openGraph: {
      title: 'Date Input | Delta Components',
      description: 'A date picker component with validation, min/max date support, and formatting options.',
      url: `${BASE_URL}/docs/date-input`,
      images: [
        {
          url: `${BASE_URL}/og/date-input.png`,
          width: 1200,
          height: 630,
          alt: 'Date Input Component Preview',
        },
      ],
    },
  },
  'file-input': {
    title: 'File Input | Delta Components',
    description: 'A file input component with drag and drop support, file previews, and validation.',
    openGraph: {
      title: 'File Input | Delta Components',
      description: 'A file input component with drag and drop support, file previews, and validation.',
      url: `${BASE_URL}/docs/file-input`,
      images: [
        {
          url: `${BASE_URL}/og/file-input.png`,
          width: 1200,
          height: 630,
          alt: 'File Input Component Preview',
        },
      ],
    },
  },
  'smart-form': {
    title: 'Smart Form | Delta Components',
    description: 'A powerful abstraction for creating forms with minimal code. Supports various input types, layouts, validation, and conditional fields.',
    openGraph: {
      title: 'Smart Form | Delta Components',
      description: 'A powerful abstraction for creating forms with minimal code. Supports various input types, layouts, validation, and conditional fields.',
      url: `${BASE_URL}/docs/smart-form`,
      images: [
        {
          url: `${BASE_URL}/og/smart-form.png`,
          width: 1200,
          height: 630,
          alt: 'Smart Form Component Preview',
        },
      ],
    },
  },
  'otp-input': {
    title: 'OTP Input | Delta Components',
    description: 'A one-time password input component with automatic focus management and validation.',
    openGraph: {
      title: 'OTP Input | Delta Components',
      description: 'A one-time password input component with automatic focus management and validation.',
      url: `${BASE_URL}/docs/otp-input`,
      images: [
        {
          url: `${BASE_URL}/og/otp-input.png`,
          width: 1200,
          height: 630,
          alt: 'OTP Input Component Preview',
        },
      ],
    },
  },
  'floating-button': {
    title: 'Floating Button | Delta Components',
    description: 'A customizable floating button component with positioning, tooltip, and responsive behavior.',
    openGraph: {
      title: 'Floating Button | Delta Components',
      description: 'A customizable floating button component with positioning, tooltip, and responsive behavior.',
      url: `${BASE_URL}/docs/floating-button`,
      images: [
        {
          url: `${BASE_URL}/og/floating-button.png`,
          width: 1200,
          height: 630,
          alt: 'Floating Button Component Preview',
        },
      ],
    },
  },
}

// Helper function to get metadata for a component
export function getComponentMetadata(componentName: string): Metadata {
  const componentMeta = componentMetadata[componentName]
  if (!componentMeta) {
    return baseMetadata
  }

  return {
    ...baseMetadata,
    ...componentMeta,
  }
}
