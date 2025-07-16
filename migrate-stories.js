#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Helper function to convert MDX story to VitePress markdown
function convertStoryToVitePress(content, componentName) {
  // Extract meta information
  const metaMatch = content.match(/<Meta\s+title="([^"]+)"[^>]*>/s);
  const title = metaMatch ? metaMatch[1].split('/').pop() : componentName;
  
  // Extract component description from first markdown heading
  const descMatch = content.match(/# ([^\n]+)\n\n### ([^\n]+)/s);
  const description = descMatch ? descMatch[2] : '';
  
  // Extract component import
  const importMatch = content.match(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"];/);
  const componentImport = importMatch ? `import ${importMatch[1]} from '${importMatch[2].replace('../../', '../src/')}';
` : '';
  
  // Extract when to use section
  const whenToUseMatch = content.match(/## Quando usar:?\n([\s\S]*?)(?=\n## |\n<br|$)/);
  const whenToUse = whenToUseMatch ? whenToUseMatch[1].trim() : '';
  
  // Extract when not to use section
  const whenNotToUseMatch = content.match(/## Quando não usar:?\n([\s\S]*?)(?=\n## |\n<br|$)/);
  const whenNotToUse = whenNotToUseMatch ? whenNotToUseMatch[1].trim() : '';
  
  // Convert to VitePress format
  let vitePressMd = `# ${title}\n\n`;
  
  if (description) {
    vitePressMd += `${description}\n\n`;
  }
  
  if (whenToUse) {
    vitePressMd += `## Quando usar\n\n${whenToUse}\n\n`;
  }
  
  if (whenNotToUse) {
    vitePressMd += `## Quando não usar\n\n${whenNotToUse}\n\n`;
  }
  
  if (componentImport) {
    vitePressMd += `## Preview\n\n<script setup>\n${componentImport}\nconst handleClick = () => {\n  console.log('Component interaction');\n};\n</script>\n\n<div class="demo-container">\n  <${importMatch[1]} />\n</div>\n\n`;
  }
  
  // Add placeholder sections
  vitePressMd += `## Props\n\n| Prop | Type | Default | Description |\n|------|------|---------|-------------|\n| \`prop\` | \`string\` | \`''\` | Description |\n\n`;
  
  vitePressMd += `## Eventos\n\n| Event | Description |\n|-------|-------------|\n| \`event\` | Event description |\n\n`;
  
  vitePressMd += `## Uso\n\n\`\`\`vue\n<template>\n  <cds-${componentName.toLowerCase()}\n    prop="value"\n    @event="handleEvent"\n  />\n</template>\n\n<script setup>\nconst handleEvent = () => {\n  console.log('Event handled');\n};\n</script>\n\`\`\`\n\n`;
  
  // Add demo styles
  vitePressMd += `<style scoped>\n.demo-container {\n  padding: 20px;\n  border: 1px solid var(--vp-c-border);\n  border-radius: 8px;\n  margin: 16px 0;\n}\n</style>`;
  
  return vitePressMd;
}

// Helper function to get component name from file path
function getComponentName(filePath) {
  return path.basename(filePath, '.stories.mdx');
}

// Helper function to get output directory based on story type
function getOutputDir(storyPath) {
  if (storyPath.includes('/tokens/')) {
    return 'docs/foundation';
  } else if (storyPath.includes('/components/')) {
    return 'docs/components';
  } else if (storyPath.includes('/utils/') || storyPath.includes('/composables/')) {
    return 'docs/utils';
  }
  return 'docs/misc';
}

// Helper function to convert filename to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

// Main migration function
function migrateStories() {
  const storiesDir = 'src/stories';
  
  function processDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        processDirectory(itemPath);
      } else if (item.endsWith('.stories.mdx')) {
        console.log(`Processing: ${itemPath}`);
        
        try {
          const content = fs.readFileSync(itemPath, 'utf8');
          const componentName = getComponentName(item);
          const vitePressMd = convertStoryToVitePress(content, componentName);
          
          const outputDir = getOutputDir(itemPath);
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          const outputFileName = toKebabCase(componentName) + '.md';
          const outputPath = path.join(outputDir, outputFileName);
          
          fs.writeFileSync(outputPath, vitePressMd);
          console.log(`✅ Converted: ${itemPath} → ${outputPath}`);
        } catch (error) {
          console.error(`❌ Error processing ${itemPath}:`, error.message);
        }
      }
    });
  }
  
  if (fs.existsSync(storiesDir)) {
    processDirectory(storiesDir);
    console.log('\n🎉 Migration completed!');
    console.log('\nNext steps:');
    console.log('1. Review the generated markdown files');
    console.log('2. Update component imports and props as needed');
    console.log('3. Run `npm run docs:dev` to start the dev server');
  } else {
    console.error('❌ Stories directory not found:', storiesDir);
  }
}

// Run migration
if (require.main === module) {
  migrateStories();
}

module.exports = { migrateStories, convertStoryToVitePress };

