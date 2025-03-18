// scripts/add-component.js
const fs = require('fs');
const path = require('path');

const componentType = process.argv[2]; // component, page, lib, hook
const componentName = process.argv[3];
const category = process.argv[4] || 'new-york'; // Default to "new-york" if no category provided

if (!componentType || !componentName) {
  console.error('Usage: node add-component.js [component|page|lib|hook] [name] [category]');
  console.error('Example: node add-component.js component button custom-theme');
  console.error('If category is omitted, "new-york" will be used as default');
  process.exit(1);
}

// Validate component type
const validTypes = ['component', 'page', 'lib', 'hook'];
if (!validTypes.includes(componentType)) {
  console.error(`Invalid type. Choose from: ${validTypes.join(', ')}`);
  process.exit(1);
}

// Make sure lib directory exists
const libDir = path.join('lib');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Create directory path with specified category
const basePath = path.join('registry', category, componentName);
fs.mkdirSync(basePath, { recursive: true });
console.log(`Using category: ${category}`);

// Create component file based on type
let filePath = '';
let fileContent = '';
let registryType = '';

switch (componentType) {
  case 'component':
    filePath = path.join(basePath, `${componentName}.tsx`);
    registryType = 'registry:component';
    fileContent = `export function ${componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-medium">${componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
      <p>Your component content here</p>
    </div>
  );
}
`;
    break;
  case 'page':
    filePath = path.join(basePath, 'page.tsx');
    registryType = 'registry:page';
    fileContent = `export default function ${componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Page() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">${componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Page</h1>
      <div className="p-4 border rounded">
        <p>Your page content here</p>
      </div>
    </div>
  );
}
`;
    break;
  case 'lib':
    filePath = path.join(basePath, `${componentName}.ts`);
    registryType = 'registry:lib';
    fileContent = `// Utility functions for ${componentName}

export function sampleFunction() {
  return 'Sample return value';
}

export function anotherFunction(param: string) {
  return \`Processed: \${param}\`;
}
`;
    break;
  case 'hook':
    filePath = path.join(basePath, `use-${componentName}.ts`);
    registryType = 'registry:hook';
    fileContent = `"use client"

import { useState, useEffect } from 'react';

export function use${componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Add your hook logic here
    console.log('Hook initialized');
  }, []);

  return state;
}
`;
    break;
}

// Write component file
fs.writeFileSync(filePath, fileContent);
console.log(`Created: ${filePath}`);

// Update registry.json
const registryPath = path.join('registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

// Create new item
const newItem = {
  name: componentName,
  type: registryType,
  title: componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  description: `A ${componentType} for ${componentName}`,
  dependencies: [],
  registryDependencies: [],
  files: [
    {
      path: filePath,
      type: registryType
    }
  ]
};

// Add to registry
registry.items.push(newItem);

// Write updated registry
fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
console.log(`Updated: ${registryPath}`);

// Update or create the registry-components.tsx file
const registryComponentsPath = path.join('lib', 'registry-components.tsx');
let registryComponentsContent = '';
let importStatement = '';
let componentEntry = '';

// Generate proper component name for import
const pascalCaseName = componentName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');

// Different handling based on component type
if (componentType === 'component') {
  importStatement = `import { ${pascalCaseName} } from "@/registry/${category}/${componentName}/${componentName}"`;
  componentEntry = `  "${componentName}": {\n    component: ${pascalCaseName},\n  },`;
} else if (componentType === 'page') {
  importStatement = `import ${pascalCaseName}Page from "@/registry/${category}/${componentName}/page"`;
  componentEntry = `  "${componentName}": {\n    component: ${pascalCaseName}Page,\n  },`;
} else if (componentType === 'lib') {
  // For libs, we don't add to registry components typically
  console.log('Note: Libs are not added to registry-components.tsx');
} else if (componentType === 'hook') {
  // For hooks, we don't add to registry components typically
  console.log('Note: Hooks are not added to registry-components.tsx');
}

if (componentType === 'component' || componentType === 'page') {
  // Check if the file exists and update it
  if (fs.existsSync(registryComponentsPath)) {
    const content = fs.readFileSync(registryComponentsPath, 'utf8');

    // Add import at the appropriate location (after the last import)
    let updatedContent = content;
    const lastImportIndex = content.lastIndexOf('import');
    const lastImportEndIndex = content.indexOf('\n', lastImportIndex);

    if (lastImportIndex !== -1) {
      updatedContent =
        content.slice(0, lastImportEndIndex + 1) +
        importStatement + '\n' +
        content.slice(lastImportEndIndex + 1);
    }

    // Add component to registry object
    const registryStartIndex = updatedContent.indexOf('export const registry');
    const registryOpenBraceIndex = updatedContent.indexOf('{', registryStartIndex);
    const registryCloseBraceIndex = updatedContent.lastIndexOf('}');

    if (registryStartIndex !== -1 && registryOpenBraceIndex !== -1 && registryCloseBraceIndex !== -1) {
      // Check if registry is empty
      const isEmptyRegistry = updatedContent.substring(registryOpenBraceIndex + 1, registryCloseBraceIndex).trim() === '';

      if (isEmptyRegistry) {
        updatedContent =
          updatedContent.slice(0, registryOpenBraceIndex + 1) +
          '\n' + componentEntry + '\n' +
          updatedContent.slice(registryCloseBraceIndex);
      } else {
        updatedContent =
          updatedContent.slice(0, registryCloseBraceIndex) +
          (updatedContent[registryCloseBraceIndex - 1] === ',' ? '' : ',') +
          '\n' + componentEntry +
          updatedContent.slice(registryCloseBraceIndex);
      }
    }

    fs.writeFileSync(registryComponentsPath, updatedContent);
    console.log(`Updated: ${registryComponentsPath}`);
  } else {
    // If file doesn't exist, create it
    registryComponentsContent = `import type React from "react"
// This file will serve as our component registry

// Import components directly
${importStatement}

// Create a registry object that maps component names to their implementations
export const registry: Record<string, { component: React.ComponentType }> = {
${componentEntry}
}
`;
    fs.writeFileSync(registryComponentsPath, registryComponentsContent);
    console.log(`Created: ${registryComponentsPath}`);
  }
}

console.log(`
✅ ${componentType} "${componentName}" has been added to the registry in category "${category}"!

Next steps:
1. Edit the component file: ${filePath}
2. Update dependencies in registry.json if needed
3. Run: npm run registry:build
`);