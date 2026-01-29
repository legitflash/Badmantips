git add .
# Badman Tips

Welcome to Badman Tips, your daily source for football predictions. This is a Next.js application bootstrapped with Firebase Studio.

## Overview

This application provides daily football tips, including match details, predictions, and odds. It also features a history of past tips and a special section for high-odds weekly accumulators.

## Getting Started

To get started with development:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Managing Tips

All tips are currently managed in the `src/lib/data.ts` file. To add, remove, or update a tip, you will need to edit this file directly. Changes will be reflected after you commit them to your repository and a new deployment is triggered.

## PWA (Progressive Web App)

This application is configured as a PWA. To complete the setup, you need to add your own icons in the `public/icons/` directory. The manifest file (`public/manifest.json`) is already configured to look for `icon-192x192.png` and `icon-512x512.png`.

## Deployment

You can deploy this application to any hosting provider that supports Next.js, such as Vercel or Netlify. Connect your GitHub repository to your hosting provider to set up automatic deployments on every push.
