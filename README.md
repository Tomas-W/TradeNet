# TradeNet Flask Application

A Flask web application with user tracking functionality.

## Local Development

1. Create a virtual environment:
   ```
   python -m venv .tradevenv
   source .tradevenv/bin/activate  # On Windows: .tradevenv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Run the application:
   ```
   python run.py
   ```

## Docker Development

1. Build the Docker image:
   ```
   docker build -t tradenet-app .
   ```

2. Run the Docker container:
   ```
   docker run -p 8080:8080 -e PORT=8080 tradenet-app
   ```

## Deploying to Railway

### Method 1: Direct Deployment (Recommended)

1. Push your code to a GitHub repository.

2. Go to [Railway Dashboard](https://railway.app/dashboard).

3. Click "New Project" and select "Deploy from GitHub repo".

4. Select your repository and click "Deploy Now".

5. Railway will automatically detect the Dockerfile and deploy your application.

### Method 2: Using Railway CLI

1. Install the Railway CLI:
   ```
   npm i -g @railway/cli
   ```

2. Login to Railway:
   ```
   railway login
   ```

3. Link to an existing project or create a new one:
   ```
   railway link
   ```
   or
   ```
   railway init
   ```

4. Deploy the application:
   ```
   railway up
   ```

### Environment Variables

Configure the following environment variables in the Railway dashboard:

- `SECRET_KEY`: Secret key for Flask sessions
- `DEBUG`: Set to "False" in production

## Troubleshooting Deployment

If you encounter issues with the health check:

1. Make sure your application is listening on the port provided by Railway's `PORT` environment variable.
2. Verify that the `/health` endpoint returns a 200 status code.
3. Check the application logs in the Railway dashboard for any errors.
4. Try redeploying the application after making changes. 