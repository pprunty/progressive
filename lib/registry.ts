import registryData from "@/registry.json"

export interface RegistryFile {
  path: string
  type: string
  target?: string
}

export interface ComponentType {
  name: string
  type: string
  title: string
  description: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
  badge?: "new" | "beta"
  category?: string
}

export interface CategoryType {
  title: string
  items: ComponentType[]
}

// Helper function to categorize components
function categorizeComponents(items: ComponentType[]): CategoryType[] {
  // Group components by their type or first directory in path
  const categories: Record<string, ComponentType[]> = {}

  for (const item of items) {
    // Try to determine category from the first file path
    let category = "Components"

    if (item.files && item.files.length > 0) {
      const path = item.files[0].path
      const parts = path.split("/")

      // Use the directory after "registry" as the category
      if (parts.length >= 3 && parts[0] === "registry") {
        category = parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
      }
    }

    if (!categories[category]) {
      categories[category] = []
    }

    categories[category].push(item)
  }

  // Convert to array format
  return Object.entries(categories)
    .map(([title, items]) => ({
      title,
      items: items.sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export async function getCategories(): Promise<CategoryType[]> {
  try {
    return categorizeComponents(registryData.items)
  } catch (error) {
    console.error("Error getting categories:", error)
    return []
  }
}

export async function getAllComponents(): Promise<ComponentType[]> {
  return registryData.items
}

export async function getComponentByName(name: string): Promise<ComponentType | null> {
  return registryData.items.find((component) => component.name === name) || null
}

export function getRegistryInfo() {
  return {
    name: registryData.name,
    homepage: registryData.homepage,
  }
}

