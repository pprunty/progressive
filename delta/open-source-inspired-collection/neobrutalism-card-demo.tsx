'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/delta/open-source-inspired-collection/neobrutalism-card';

export default function NeobrutalismCardDemo() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-medium mb-4">Color Variants</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          <BlueCardDemo />
          <PinkCardDemo />
          <GreenCardDemo />
          <YellowCardDemo />
          <PurpleCardDemo />
          <GrayCardDemo />
          <OrangeCardDemo />
          <RedCardDemo />
          <MintCardDemo />
          <CreamCardDemo />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Border Width Variants</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          <ThinBorderDemo />
          <MediumBorderDemo />
          <ThickBorderDemo />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Complete Example</h3>
        <div className="flex justify-center">
          <CompleteExampleDemo />
        </div>
      </div>
    </div>
  );
}

export function BlueCardDemo() {
  return (
    <Card color="blue" className="w-64" hover={true}>
      <CardHeader>
        <CardTitle>Blue Card</CardTitle>
        <CardDescription>Default blue variant</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has hover and active states.</p>
      </CardContent>
    </Card>
  );
}

export function PinkCardDemo() {
  return (
    <Card color="pink" className="w-64" hover={true}>
      <CardHeader>
        <CardTitle>Pink Card</CardTitle>
        <CardDescription>Pink variant</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A pink version with hover states.</p>
      </CardContent>
    </Card>
  );
}

export function GreenCardDemo() {
  return (
    <Card color="green" className="w-64" hover={true}>
      <CardHeader>
        <CardTitle>Green Card</CardTitle>
        <CardDescription>Green variant</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A green version with hover states.</p>
      </CardContent>
    </Card>
  );
}

export function YellowCardDemo() {
  return (
    <Card color="yellow" className="w-64" hover={true}>
      <CardHeader>
        <CardTitle>Yellow Card</CardTitle>
        <CardDescription>Yellow variant</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A yellow version with hover states.</p>
      </CardContent>
    </Card>
  );
}

export function PurpleCardDemo() {
  return (
    <Card color="purple" className="w-64" hover={true}>
      <CardHeader>
        <CardTitle>Purple Card</CardTitle>
        <CardDescription>Purple variant</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A purple version with hover states.</p>
      </CardContent>
    </Card>
  );
}

export function GrayCardDemo() {
  return (
    <Card color="gray" className="w-64" hover={true}>
      <CardHeader>
        <CardTitle>Gray Card</CardTitle>
        <CardDescription>Gray variant</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A gray version with hover states.</p>
      </CardContent>
    </Card>
  );
}

export function OrangeCardDemo() {
  return (
    <Card color="orange" className="w-64" hover={true}>
      <CardHeader>
        <CardTitle>Orange Card</CardTitle>
        <CardDescription>Orange variant</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A vibrant orange version with hover states.</p>
      </CardContent>
    </Card>
  );
}

export function RedCardDemo() {
  return (
    <Card color="red" className="w-64" hover={true}>
      <CardHeader>
        <CardTitle>Red Card</CardTitle>
        <CardDescription>Red variant</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A soft red version with hover states.</p>
      </CardContent>
    </Card>
  );
}

export function MintCardDemo() {
  return (
    <Card color="mint" className="w-64" hover={true}>
      <CardHeader>
        <CardTitle>Mint Card</CardTitle>
        <CardDescription>Mint variant</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A fresh mint version with hover states.</p>
      </CardContent>
    </Card>
  );
}

export function CreamCardDemo() {
  return (
    <Card color="cream" className="w-64" hover={true}>
      <CardHeader>
        <CardTitle>Cream Card</CardTitle>
        <CardDescription>Cream variant</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A subtle cream version with hover states.</p>
      </CardContent>
    </Card>
  );
}

export function ThinBorderDemo() {
  return (
    <Card color="blue" className="w-64" hover={true} borderWidth="thin">
      <CardHeader>
        <CardTitle>Thin Border</CardTitle>
        <CardDescription>1px border width</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A card with thin border styling.</p>
      </CardContent>
    </Card>
  );
}

export function MediumBorderDemo() {
  return (
    <Card color="pink" className="w-64" hover={true} borderWidth="medium">
      <CardHeader>
        <CardTitle>Medium Border</CardTitle>
        <CardDescription>2px border width (default)</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A card with medium border styling.</p>
      </CardContent>
    </Card>
  );
}

export function ThickBorderDemo() {
  return (
    <Card color="mint" className="w-64" hover={true} borderWidth="thick">
      <CardHeader>
        <CardTitle>Thick Border</CardTitle>
        <CardDescription>4px border width</CardDescription>
      </CardHeader>
      <CardContent>
        <p>A card with thick border styling.</p>
      </CardContent>
    </Card>
  );
}

export function CompleteExampleDemo() {
  return (
    <div className="w-full flex justify-center p-6">
      <Card
        color="blue"
        className="w-full max-w-sm"
        hover={false}
        borderWidth="medium"
      >
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                placeholder="Name of your project"
                className="flex h-10 w-full rounded-md border-2 border-black bg-white px-3 py-2 text-md shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="framework" className="text-sm font-medium">
                Framework
              </label>
              <div className="relative">
                <select
                  id="framework"
                  className="flex h-10 w-full appearance-none rounded-md border-2 border-black bg-white px-3 py-2 text-md shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
                >
                  <option>Select</option>
                  <option>Next.js</option>
                  <option>SvelteKit</option>
                  <option>Astro</option>
                  <option>Nuxt</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <button className="inline-flex items-center justify-center rounded-md border-2 border-black bg-white px-4 py-2 text-sm font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
            Cancel
          </button>
          <button className="inline-flex items-center justify-center rounded-md border-2 border-black bg-black text-white px-4 py-2 text-sm font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
            Deploy
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
