@echo off
echo Building and deploying TradeNet to Railway...

REM Check if Railway CLI is installed
where railway >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Railway CLI not found. Installing...
    npm i -g @railway/cli
)

REM Check if logged in to Railway
railway whoami >nul 2>nul
if %ERRORLEVEL% neq 0 (
    railway login
)

REM Build and deploy
echo Deploying to Railway...
railway up

echo Deployment complete! Opening application...
railway open 