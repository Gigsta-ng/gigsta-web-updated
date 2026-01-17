# Gigsta Website

Gigsta is building Nigeria's first on-demand home services platform, launching in Uyo, Akwa Ibom State. This repository contains the marketing website and Concierge MVP for client bookings and provider registrations.

## Project Overview

**Vision**: Connect busy professionals with vetted, reliable service providers for home cleaning, laundry, and errands.

**Current Phase**: Concierge MVP - Manual operations using WhatsApp and Google Sheets while we validate the market and build our mobile apps (launching Q2 2026).

**This Website Serves**:
- Client booking flow (collects service requests via forms)
- Provider registration (onboards service providers with vetting information)
- Waitlist collection for mobile app launch

## Tech Stack

- **Framework**: Vite + React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Management**: React Hook Form + Zod
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Project Structure

```
gigsta-website/
├── public/
│   ├── images/              # Logos, service icons, hero images
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Header, Footer, Navigation
│   │   ├── home/            # Landing page sections
│   │   ├── forms/           # Booking & Registration forms
│   │   └── shared/          # Reusable components
│   ├── lib/
│   │   ├── utils.ts         # shadcn utilities
│   │   ├── googleSheets.ts  # Google Sheets API integration
│   │   └── validation.ts    # Zod schemas
│   ├── types/               # TypeScript definitions
│   ├── constants/           # Services, pricing, locations
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── components.json          # shadcn/ui config
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Gigsta-ng/gigsta-web-updated
   cd gigsta-web-updated
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Approve build scripts (pnpm security feature)
   ```bash
   pnpm approve-builds
   ```
   Select "yes" for `@swc/core` and `esbuild` when prompted.

4. Setup environment variables
   ```bash
   cp .env.example .env
   ```
   
   Add your credentials:
   ```env
   VITE_GOOGLE_SHEET_URL=your_google_apps_script_url
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

5. Run development server
   ```bash
   pnpm dev
   ```
   
   Open http://localhost:5173 in your browser.

## Setup Google Sheets Integration

The website sends form submissions to Google Sheets for manual processing.

### Create Google Apps Script Web App

1. Create a new Google Sheet with these tabs:
   - `Client Bookings`
   - `Provider Registrations`
   - `Waitlist`

2. Go to **Extensions > Apps Script**

3. Paste this code:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetName = data.sheetName;
    delete data.sheetName;
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const row = headers.map(header => data[header] || '');
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Deploy:
   - Click **Deploy > New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Copy the Web App URL

5. Add URL to `.env`:
   ```env
   VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

## Adding shadcn/ui Components

To add new shadcn components:

```bash
pnpm dlx shadcn@latest add [component-name]
```

Example:
```bash
pnpm dlx shadcn@latest add dropdown-menu
```

## License

Proprietary - © 2026 Gigsta. All rights reserved.