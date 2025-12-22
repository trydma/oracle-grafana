#!/bin/bash
set -e

# Load project version
PKG_VERSION=$(grep '"version"' ./package.json | head -n 1 | sed 's/.*"version": "\(.*\)".*/\1/')
PLUGIN_NAME="trydma-oraclegrafana-datasource"

echo "Building ${PLUGIN_NAME} version ${PKG_VERSION}..."

echo "Removing old files..."
rm -rf ./dist/ ./node_modules/ ./*.tar.gz

echo "Installing dependencies..."
npm ci

echo "Building frontend..."
npm run build

echo "Building backend..."
mage -v

cd ./dist/

# Bundle with all platforms
echo "Creating bundle archive..."
tar --exclude="gpx*arm*" -czf ../${PLUGIN_NAME}-bundle-${PKG_VERSION}.tar.gz ./

# Platform-specific archives
echo "Creating darwin-amd64 archive..."
tar --exclude="gpx*arm*" --exclude="gpx*linux*" --exclude="gpx*windows*" -czf ../${PLUGIN_NAME}-darwin-amd64-${PKG_VERSION}.tar.gz ./

echo "Creating linux-amd64 archive..."
tar --exclude="gpx*arm*" --exclude="gpx*darwin*" --exclude="gpx*windows*" -czf ../${PLUGIN_NAME}-linux-amd64-${PKG_VERSION}.tar.gz ./

echo "Creating windows-amd64 archive..."
tar --exclude="gpx*arm*" --exclude="gpx*darwin*" --exclude="gpx*linux*" -czf ../${PLUGIN_NAME}-windows-amd64-${PKG_VERSION}.tar.gz ./

cd ../

echo "Release archives created successfully!"
echo "Version: ${PKG_VERSION}"
ls -lh ${PLUGIN_NAME}-*.tar.gz