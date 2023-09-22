const fs = require('fs')
const path = require('path')

// Get the names of the folders in the 'app' directory
const appPath = path.resolve(__dirname, '../v2/src/app')
const folders = fs.readdirSync(appPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)

// Generate the TypeScript type declaration
const typeDeclaration = `export type AppFolder = ${folders.map(folder => `'${folder}'`).join(' | ')}\n`

// Write the type declaration to a .d.ts file
const typesPath = path.resolve(__dirname, './types/folders.d.ts')
fs.writeFileSync(typesPath, typeDeclaration)
