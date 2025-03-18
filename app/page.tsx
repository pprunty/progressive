import Link from "next/link"
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr"
import { Badge } from "@/components/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { getCategories, getRegistryInfo } from "@/lib/registry"

export default async function Home() {
  const categories = await getCategories()
  const registryInfo = getRegistryInfo()
  const GITHUB_REPO_URL = "https://github.com/pprunty/astrik.dev"

  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex items-center justify-between gap-1">
        <div className="flex flex-col gap-1">
          <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="group w-fit">
            <div className="flex items-center gap-1 hover:text-primary transition-colors">
              <h1 className="text-md font-bold tracking-tight">{registryInfo.name} Registry</h1>
              <ArrowSquareOut className="h-3 w-3" weight="bold" />
            </div>
          </Link>
          <p className="text-md text-muted-foreground">
            A collection of open source and progressively-styled reusable components for distribution by shadcn.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <main className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.title} className="flex flex-col gap-4">
            <h2 className="textx-md font-serif font-medium italic text-foreground/80">{category.title}</h2>

            <div className="flex flex-col space-y-2">
              {category.items.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <Link
                    href={`/docs/${item.name}`}
                    className="text-md decoration-1 font-medium underline underline-offset-2 decoration-wavy decoration-muted-foreground/30 transition-all duration-300 ease-in-out hover:decoration-primary hover:text-primary"
                  >
                    {item.title}
                  </Link>
                  {item.badge && <Badge variant={item.badge as "new" | "beta"}>{item.badge}</Badge>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

