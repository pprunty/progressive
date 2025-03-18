import registryData from "@/registry.json";

export interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}

export interface ComponentType {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  badge?: string;
  category?: string;
}

export interface CategoryType {
  title: string;
  items: ComponentType[];
}

// Format category name for display using regex patterns
function formatCategoryName(category: string): string {
  // Handle special formatting patterns
  // 1. Handle parentheses - preserve case inside them: re(creations) -> Re(Creations)
  const parenthesesPattern = /$$([^)]+)$$/g;
  let formattedCategory = category.replace(parenthesesPattern, (match) => {
    // Preserve the original case of text inside parentheses
    return match.toUpperCase();
  });

  // 2. Split by hyphens and capitalize each word
  formattedCategory = formattedCategory
    .split("-")
    .map((word) => {
      // Check if word contains parentheses
      if (word.includes("(")) {
        // Split at the opening parenthesis
        const parts = word.split(/($$[^)]*$$)/);
        return parts
          .map(
            (part) =>
              part.startsWith("(")
                ? part // Keep parentheses sections as is (already processed)
                : part.charAt(0).toUpperCase() + part.slice(1) // Capitalize other parts
          )
          .join("");
      }
      // Normal word capitalization
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  // 3. Additional specific rules can be added using regex patterns
  formattedCategory = formattedCategory
    // Handle specific acronyms: UI, API, etc.
    .replace(/\bUi\b/g, "UI")
    .replace(/\bApi\b/g, "API")
    .replace(/\bCss\b/g, "CSS")
    .replace(/\bHtml\b/g, "HTML")
    .replace(/\bJs\b/g, "JS")
    .replace(/\bTs\b/g, "TS");
  // Handle specific lowercase words like "and", "or", "the" if needed
  // .replace(/\bAnd\b/g, 'and')
  // .replace(/\bOr\b/g, 'or')
  // .replace(/\bThe\b/g, 'the')

  return formattedCategory;
}

// Helper function to categorize components
function categorizeComponents(items: ComponentType[]): CategoryType[] {
  // Group components by their type or first directory in path
  const categories: Record<string, ComponentType[]> = {};

  for (const item of items) {
    // Try to determine category from the first file path
    let category = "Components";
    if (item.files && item.files.length > 0) {
      const path = item.files[0].path;
      const parts = path.split("/");
      // Use the directory after "registry" as the category
      if (parts.length >= 3 && parts[0] === "delta") {
        // Apply formatting to the category name
        category = formatCategoryName(parts[1]);
      }
    }

    if (!categories[category]) {
      categories[category] = [];
    }

    // Ensure the badge is of the correct type
    const typedItem: ComponentType = {
      ...item,
      badge: (item.badge === "new" || item.badge === "beta") ? item.badge : undefined
    };

    categories[category].push(typedItem);
  }

  // Convert to array format
  return Object.entries(categories)
    .map(([title, items]) => ({
      title,
      items: items.sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getCategories(): Promise<CategoryType[]> {
  try {
    return categorizeComponents(registryData.items);
  } catch (error) {
    console.error("Error getting categories:", error);
    return [];
  }
}

export async function getAllComponents(): Promise<ComponentType[]> {
  // Cast the items to ComponentType[] after validating/transforming the badge property
  return registryData.items.map(item => ({
    ...item,
    badge: (item.badge === "new" || item.badge === "beta") ? item.badge : undefined
  })) as ComponentType[];
}

export async function getComponentByName(name: string): Promise<ComponentType | null> {
  const component = registryData.items.find((component) => component.name === name);
  if (!component) return null;

  // Ensure the badge is of the correct type
  return {
    ...component,
    badge: (component.badge === "new" || component.badge === "beta") ? component.badge : undefined
  } as ComponentType;
}

export function getRegistryInfo() {
  return {
    name: registryData.name,
    homepage: registryData.homepage,
  };
}
