@echo off
echo Deploying TradeNet to Railway...

REM Check if Railway CLI is installed
where railway >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Railway CLI not found. Installing...
    npm i -g @railway/cli
)

REM Login to Railway if not already logged in
railway whoami >nul 2>nul || railway login

REM Deploy the application
railway up

echo Deployment complete!
echo Visit the Railway dashboard to check your deployment status and logs. 