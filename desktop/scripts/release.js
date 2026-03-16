const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const version = require('../package.json').version
const releaseDir = path.join(__dirname, '../releases')

// Create releases directory
if (!fs.existsSync(releaseDir)) {
  fs.mkdirSync(releaseDir, { recursive: true })
}

console.log(`Building Left v${version} for release...`)

try {
  // Clean previous builds
  console.log('Cleaning previous builds...')
  try {
    if (process.platform === 'win32') {
      execSync('rmdir /s /q "%USERPROFILE%\\Documents\\Left-win32-x64"', { stdio: 'inherit' })
    } else {
      execSync('rm -rf ~/Documents/Left-*', { stdio: 'inherit' })
    }
  } catch (e) {
    console.log('No previous builds to clean')
  }

  // Build for current platform
  console.log(`Building for ${process.platform}...`)
  if (process.platform === 'win32') {
    execSync('npm run build_win', { stdio: 'inherit', cwd: path.dirname(__dirname) })
  } else if (process.platform === 'darwin') {
    execSync('npm run build_osx', { stdio: 'inherit', cwd: path.dirname(__dirname) })
  } else {
    execSync('npm run build_linux', { stdio: 'inherit', cwd: path.dirname(__dirname) })
  }

  // Copy to releases folder
  const sourceDir = process.platform === 'win32' 
    ? `${process.env.USERPROFILE}\\Documents\\Left-win32-x64`
    : `${process.env.HOME}/Documents/Left-${process.platform}-x64`
    
  const targetDir = path.join(releaseDir, `Left-${version}-${process.platform}-x64`)
  
  if (fs.existsSync(sourceDir)) {
    console.log(`Copying build to ${targetDir}...`)
    copyRecursiveSync(sourceDir, targetDir)
    console.log(`✅ Build complete! Release ready at: ${targetDir}`)
    console.log(`📁 You can now upload this folder to GitHub releases`)
  } else {
    console.log('❌ Build directory not found')
  }

} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      )
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}
