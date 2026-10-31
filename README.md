# CloudPulse — React + AWS Amplify Hosting

A responsive cloud operations dashboard demo built with React, Vite and Lucide icons. It uses local sample data, so it can be deployed as a static frontend without configuring a backend or AWS credentials.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Create a production build

```bash
npm run build
npm run preview
```

Vite creates the deployable website in the `dist/` folder.

## Deploy to AWS Amplify Hosting

1. Extract this ZIP.
2. Create a GitHub repository and push the project files to it.
3. Open the AWS Amplify console: https://console.aws.amazon.com/amplify/
4. Choose **Create new app** → **Host web app**.
5. Select GitHub, authorize AWS, and choose your repository and branch.
6. Amplify detects `amplify.yml`. Confirm the build settings:
   - Build command: `npm run build`
   - Artifact directory: `dist`
7. Choose **Save and deploy**. Amplify will build and publish the app.
8. Open the generated `https://...amplifyapp.com` URL.

## Notes

- `amplify.yml` is included and configures `npm ci`, `npm run build`, and the `dist` output folder.
- The included Amplify build configuration uses `npm install`, so you can deploy without a committed package-lock file. For reproducible builds, run `npm install` locally and commit the generated `package-lock.json`.
- All metrics, services and activity events are sample data. The dashboard does not connect to AWS APIs yet.
- To connect real AWS services later, add a backend/API and keep credentials out of frontend code.
