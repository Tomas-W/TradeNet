#!/bin/bash

# Exit on error
set -e

echo "Building and deploying TradeNet to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "Railway CLI not found. Installing..."
    npm i -g @railway/cli
fi

# Check if logged in to Railway
railway whoami || railway login

# Build and deploy
echo "Deploying to Railway..."
railway up

echo "Deployment complete! Opening application..."
railway open 