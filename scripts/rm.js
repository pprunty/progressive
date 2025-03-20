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
const componentIndex = registry.items.findIndex(
  (item) => item.name === componentName,
);

if (componentIndex === -1) {
  console.error(`Component "${componentName}" not found in registry.json`);
  process.exit(1);
}

// Get component details before removing
const component = registry.items[componentIndex];
const componentType = component.type.replace('registry:', '');
const componentFiles = component.files || [];

// Determine the category/directory from the file path
let category = 'components'; // Default
if (componentFiles.length > 0) {
  const filePath = componentFiles[0].path;
  const pathParts = filePath.split(path.sep);
  // New path pattern is typically: delta/{category}/{component-name}.tsx
  if (pathParts.length >= 3 && pathParts[0] === 'delta') {
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
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  // Remove import statement based on component type and new path structure
  let importPattern;
  if (componentType === 'component') {
    // Now imports demo component
    importPattern = new RegExp(
      `import\\s+\\{\\s*${pascalCaseName}Demo\\s*\\}\\s+from\\s+["']@/registry/${category}/${componentName}-demo["'].*?\n`,
      'g',
    );
  } else if (componentType === 'page') {
    importPattern = new RegExp(
      `import\\s+${pascalCaseName}Page\\s+from\\s+["']@/registry/${category}/${componentName}-page["'].*?\n`,
      'g',
    );
  }

  if (importPattern) {
    content = content.replace(importPattern, '');
  }

  // Remove component from registry object
  const componentEntryPattern = new RegExp(
    `\\s*"${componentName}":\\s*\\{[^}]*\\},?`,
    'g',
  );
  content = content.replace(componentEntryPattern, '');

  // Fix trailing commas
  content = content.replace(/,(\s*})/g, '$1');

  fs.writeFileSync(registryComponentsPath, content);
  console.log(`Removed "${componentName}" from registry-components.tsx`);
}

// Remove component files based on the new file structure
if (componentFiles.length > 0) {
  // Delete each file in the component files array
  componentFiles.forEach((fileObj) => {
    const filePath = fileObj.path;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    } else {
      console.warn(`File not found: ${filePath}`);
    }
  });

  // Also try to remove potential demo file if not in the componentFiles list
  if (componentType === 'component') {
    const demoFilePath = path.join(
      'delta',
      category,
      `${componentName}-demo.tsx`,
    );
    if (fs.existsSync(demoFilePath)) {
      fs.unlinkSync(demoFilePath);
      console.log(`Deleted file: ${demoFilePath}`);
    }

    const componentFilePath = path.join(
      'delta',
      category,
      `${componentName}.tsx`,
    );
    if (fs.existsSync(componentFilePath)) {
      fs.unlinkSync(componentFilePath);
      console.log(`Deleted file: ${componentFilePath}`);
    }
  } else if (componentType === 'page') {
    const pageFilePath = path.join(
      'delta',
      category,
      `${componentName}-page.tsx`,
    );
    if (fs.existsSync(pageFilePath)) {
      fs.unlinkSync(pageFilePath);
      console.log(`Deleted file: ${pageFilePath}`);
    }
  } else if (componentType === 'lib') {
    const libFilePath = path.join('delta', category, `${componentName}.ts`);
    if (fs.existsSync(libFilePath)) {
      fs.unlinkSync(libFilePath);
      console.log(`Deleted file: ${libFilePath}`);
    }
  } else if (componentType === 'hook') {
    const hookFilePath = path.join(
      'delta',
      category,
      `use-${componentName}.ts`,
    );
    if (fs.existsSync(hookFilePath)) {
      fs.unlinkSync(hookFilePath);
      console.log(`Deleted file: ${hookFilePath}`);
    }
  }
}

console.log(`
✅ Component "${componentName}" has been successfully removed from the registry!

Don't forget to run: npm run registry:build
`);
