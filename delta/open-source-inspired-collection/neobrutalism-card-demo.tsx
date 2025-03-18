import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/delta/open-source-inspired-collection/neobrutalism-card"

// Demo component with multiple color variants
const ColorVariantsDemo = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Neobrutalism Card Variants</h1>

      {/* Card grid - centered with justify-center */}
      <div className="flex flex-wrap gap-6 justify-center">
        <Card color="blue" className="w-64">
          <CardHeader>
            <CardTitle>Blue Card</CardTitle>
            <CardDescription>Default blue variant</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the blue variant that matches your example.</p>
          </CardContent>
        </Card>

        <Card color="pink" className="w-64">
          <CardHeader>
            <CardTitle>Pink Card</CardTitle>
            <CardDescription>Pink variant</CardDescription>
          </CardHeader>
          <CardContent>
            <p>A pink version of the card.</p>
          </CardContent>
        </Card>

        <Card color="green" className="w-64">
          <CardHeader>
            <CardTitle>Green Card</CardTitle>
            <CardDescription>Green variant</CardDescription>
          </CardHeader>
          <CardContent>
            <p>A green version of the card.</p>
          </CardContent>
        </Card>

        <Card color="yellow" className="w-64">
          <CardHeader>
            <CardTitle>Yellow Card</CardTitle>
            <CardDescription>Yellow variant</CardDescription>
          </CardHeader>
          <CardContent>
            <p>A yellow version of the card.</p>
          </CardContent>
        </Card>

        <Card color="purple" className="w-64">
          <CardHeader>
            <CardTitle>Purple Card</CardTitle>
            <CardDescription>Purple variant</CardDescription>
          </CardHeader>
          <CardContent>
            <p>A purple version of the card.</p>
          </CardContent>
        </Card>

        <Card color="gray" className="w-64">
          <CardHeader>
            <CardTitle>Gray Card</CardTitle>
            <CardDescription>Gray variant</CardDescription>
          </CardHeader>
          <CardContent>
            <p>A gray version of the card.</p>
          </CardContent>
        </Card>
      </div>

      {/* Full example card - centered with flex */}
      <div className="mt-16 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Complete Example</h2>
        <Card color="blue" className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
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
    </div>
  )
}

export default ColorVariantsDemo

