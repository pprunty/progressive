import Link from 'next/link';
import { Badge } from '@/components/badge';
import { getCategories, getRegistryInfo } from '@/lib/registry';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export default async function Home() {
  const categories = await getCategories();
  const registryInfo = getRegistryInfo();
  const GITHUB_REPO_URL = 'https://github.com/pprunty/deltacomponents.dev';

  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-svh py-8 gap-8">
      <div className="flex flex-col gap-1">
        <Link
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-fit flex"
        >
          <h1 className="text-xl font-bold tracking-tight font-serif underline underline-offset-6 decoration-wavy decoration-muted-foreground/30 transition-all duration-300 ease-in-out hover:decoration-primary flex items-center gap-1">
            {registryInfo.name} Registry
            <ArrowUpRight
              size={14}
              weight="bold"
              className="text-muted-foreground"
            />
          </h1>
        </Link>
        <p className="text-md text-muted-foreground">
          Components that make the difference.
        </p>
      </div>

      <main className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.title} className="flex flex-col gap-4">
            <h2 className="text-md font-serif font-normal italic text-muted-foreground">
              {category.title}
            </h2>

            <div className="flex flex-col space-y-2">
              {category.items.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <Link
                    href={`/docs/${item.name}`}
                    className="text-[15px] decoration-1 font-medium underline underline-offset-4 decoration-wavy decoration-muted-foreground/30 transition-all duration-300 ease-in-out hover:decoration-primary hover:text-primary"
                  >
                    {item.title}
                  </Link>
                  {item.badge && (
                    <>
                      {Array.isArray(item.badge) ? (
                        item.badge.map((badgeItem) => (
                          <Badge
                            key={badgeItem}
                            variant={badgeItem as 'new' | 'beta'}
                          >
                            {badgeItem}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant={item.badge as 'new' | 'beta'}>
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}