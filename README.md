# Akshay — Developer Portfolio

A responsive, wide-layout portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and Lucide React.

## Features

- Responsive dark portfolio layout with a wide desktop content area
- Interactive water-ripple effect in the hero section on desktop pointer devices
- Slowly drifting gradient orbs
- Scroll reveal and card hover interactions
- Larger typography and readable project descriptions
- Project category filters
- Direct GitHub buttons for linked project repositories
- A print-ready, one-page resume matching the latest resume details supplied for the portfolio (choose “Save as PDF” in the browser print dialog)
- Reduced-motion support and mobile-friendly layouts

## Run locally

1. Install Node.js (LTS).
2. Clone this repository and open the folder in VS Code.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Personalize before publishing

- Confirm project statuses and descriptions in `src/App.tsx`.
- Add repository URLs for projects that are not linked yet.
- Add a resume PDF to a `public/` folder and wire the hero button if you want a resume download.
- Add project screenshots and include them in project cards.

## Deploy

Import this repository into Vercel or Netlify. Use `npm run build` as the build command and `dist` as the output directory. GitHub Pages can also be configured for Vite.

## Project links currently shown

- AI PDF Summarizer: https://github.com/Akshay1917/AI-PDF-Summarizer-Project
- Smart IoT Health Monitoring System: https://github.com/Akshay1917/Smart-IoT-Health-Monitoring-System
- Student Management System: https://github.com/Akshay1917/student-management-system
- Vehicle Rental System: https://github.com/Akshay1917/vehicle-rental-system
- LeafGen AI: https://github.com/Akshay1917/LeafGen-AI

Projects without verified repository URLs are labelled as not linked yet.

## Resume download

The “Download Resume” buttons open a print-ready, one-page version of the latest resume content supplied for this portfolio. In the browser print dialog, choose **Save as PDF** to save a PDF copy.
