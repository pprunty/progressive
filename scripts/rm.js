// scripts/remove-component.js
const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Usage: node remove-component.js [component-name]');
  process.exit(1);
}

// Check if component exists in registry.json
const registryPath = path.join('registry.json');
if (!fs.existsSync(registryPath)) {
  console.error(`Registry file not found: ${registryPath}`);
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const componentIndex = registry.items.findIndex(item => item.name === componentName);

if (componentIndex === -1) {
  console.error(`Component "${componentName}" not found in registry.json`);
  process.exit(1);
}

// Get component details before removing
const component = registry.items[componentIndex];
const componentType = component.type.replace('registry:', '');
const componentFiles = component.files || [];

// Determine the category/directory from the file path
let category = 'new-york'; // Default
if (componentFiles.length > 0) {
  const filePath = componentFiles[0].path;
  const pathParts = filePath.split(path.sep);
  // Registry path pattern is typically: registry/{category}/{component-name}/...
  if (pathParts.length >= 3 && pathParts[0] === 'registry') {
    category = pathParts[1];
  }
}

console.log(`Found component "${componentName}" in category "${category}"`);

// Remove component from registry.json
registry.items.splice(componentIndex, 1);
fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
console.log(`Removed "${componentName}" from registry.json`);

// Remove component from lib/registry-components.tsx if it exists
const registryComponentsPath = path.join('lib', 'registry-components.tsx');
if (fs.existsSync(registryComponentsPath)) {
  let content = fs.readFileSync(registryComponentsPath, 'utf8');

  // Generate proper component name for import
  const pascalCaseName = componentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // Remove import statement
  let importPattern;
  if (componentType === 'component') {
    importPattern = new RegExp(`import\\s+\\{\\s*${pascalCaseName}\\s*\\}\\s+from\\s+["']@/registry/${category}/${componentName}/${componentName}["'].*?\n`, 'g');
  } else if (componentType === 'page') {
    importPattern = new RegExp(`import\\s+${pascalCaseName}Page\\s+from\\s+["']@/registry/${category}/${componentName}/page["'].*?\n`, 'g');
  }

  if (importPattern) {
    content = content.replace(importPattern, '');
  }

  // Remove component from registry object
  const componentEntryPattern = new RegExp(`\\s*"${componentName}":\\s*\\{[^}]*\\},?`, 'g');
  content = content.replace(componentEntryPattern, '');

  // Fix trailing commas
  content = content.replace(/,(\s*})/g, '$1');

  fs.writeFileSync(registryComponentsPath, content);
  console.log(`Removed "${componentName}" from registry-components.tsx`);
}

// Remove component files
if (componentFiles.length > 0) {
  const componentDir = path.join('registry', category, componentName);

  if (fs.existsSync(componentDir)) {
    // Read directory to get all files
    const files = fs.readdirSync(componentDir, { withFileTypes: true });

    // Delete each file in the directory
    files.forEach(file => {
      if (file.isFile()) {
        fs.unlinkSync(path.join(componentDir, file.name));
        console.log(`Deleted file: ${path.join(componentDir, file.name)}`);
      } else if (file.isDirectory()) {
        // Handle subdirectories (like components, hooks, lib)
        const subDir = path.join(componentDir, file.name);
        const subFiles = fs.readdirSync(subDir, { withFileTypes: true });

        subFiles.forEach(subFile => {
          if (subFile.isFile()) {
            fs.unlinkSync(path.join(subDir, subFile.name));
            console.log(`Deleted file: ${path.join(subDir, subFile.name)}`);
          }
        });

        // Remove subdirectory after files are deleted
        fs.rmdirSync(subDir);
        console.log(`Removed subdirectory: ${subDir}`);
      }
    });

    // Remove component directory after all files are deleted
    fs.rmdirSync(componentDir);
    console.log(`Removed component directory: ${componentDir}`);
  } else {
    console.warn(`Component directory not found: ${componentDir}`);
  }
}

console.log(`
✅ Component "${componentName}" has been successfully removed from the registry!

Don't forget to run: npm run registry:build
`);