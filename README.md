# Left (Fork)

<img src="https://raw.githubusercontent.com/hundredrabbits/100r.co/master/media/content/characters/left.hello.png" width="300"/>

This repository is a specific fork of [Hundred Rabbits' Left](https://github.com/hundredrabbits/Left), focused on modernization and build automation.

## Changes Since Fork (`d99f69b`)

The following updates have been implemented in this version:

### 1. Build & Release Automation
- Added **GitHub Actions** integration (`.github/workflows/release.yml`) to automatically generate cross-platform releases.
- Updated `.gitignore` to properly manage build artifacts and modern web dependencies.

### 2. Dependency Modernization
- Significant update to **Electron** and related build tools.
- Modernized `package.json` scripts and dependency tree for better stability on newer OS versions.

### 3. macOS Compatibility Fixes
- Addressed specific build issues for macOS bundling and application packaging.

### 4. Core Engine Refactoring
- **Removed the Watchdog Feature**: Removed the redundant file system polling/watchdog in `page.js` to improve performance and prevent file-lock issues.
- General refactoring of desktop application scripts for cleaner execution flow.

<img src='https://raw.githubusercontent.com/hundredrabbits/Left/master/PREVIEW.jpg' width="600"/>
