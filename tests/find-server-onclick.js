const fs = require('fs');
const path = require('path');

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.next') checkDir(full);
    } else if (full.endsWith('.tsx') || full.endsWith('.jsx')) {
      const content = fs.readFileSync(full, 'utf8');
      const hasUseClient = content.includes('"use client"') || content.includes("'use client'");
      if (!hasUseClient && content.includes('onClick')) {
        console.log('FOUND SERVER COMPONENT WITH onClick:', full);
      }
    }
  }
}

checkDir('app');
checkDir('components');
console.log('Done scanning!');
