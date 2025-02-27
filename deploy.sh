#!/bin/bash

# Exit on error
set -e

echo "Deploying TradeNet to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "Railway CLI not found. Installing..."
    npm i -g @railway/cli
fi

# Login to Railway if not already logged in
railway whoami &> /dev/null || railway login

# Deploy the application
railway up

echo "Deployment complete!"
echo "Visit the Railway dashboard to check your deployment status and logs." 