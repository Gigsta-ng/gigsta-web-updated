# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the Service Request Form.

## Prerequisites

- A Google account
- Access to Google Sheets

## Step-by-Step Setup

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Gigsta Service Requests"
4. The first sheet will automatically be named "Service Requests" (or you can rename it)

### 2. Set Up Headers

In the first row of your sheet, add these column headers (in this exact order):

| Full Name | WhatsApp Number | Email Address | Service | Pricing Group | Package | Service Address | Preferred Date & Time | Additional Details | Timestamp |
|-----------|----------------|---------------|---------|---------------|---------|-----------------|----------------------|-------------------|-----------|

**Note:** The Google Apps Script will automatically create these headers if they don't exist, but it's good to set them up manually.

### 3. Create Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any default code
3. Copy and paste the code from `google-apps-script/ServiceRequestHandler.gs`
4. Click **Save** (or press `Ctrl+S` / `Cmd+S`)
5. Give your project a name (e.g., "Service Request Handler")

### 4. Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "Service Request Form Handler" (optional)
   - **Execute as**: **Me** (your account)
   - **Who has access**: **Anyone** (this allows your form to submit data)
4. Click **Deploy**
5. Click **Authorize access** and grant the necessary permissions
6. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

### 5. Add URL to Environment Variables

1. In your project root, create or edit the `.env` file
2. Add the following line:
   ```env
   VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
   Replace `YOUR_DEPLOYMENT_ID` with the actual ID from your Web App URL

3. **Important:** Restart your development server after adding the environment variable:
   ```bash
   # Stop the server (Ctrl+C) and restart
   pnpm dev
   ```

### 6. Test the Integration

1. Fill out the Service Request Form on your website
2. Submit the form
3. Check your Google Sheet - you should see a new row with the submitted data
4. The timestamp will be automatically added

## Troubleshooting

### Form submissions not appearing in the sheet

1. **Check the Web App URL**: Make sure `VITE_GOOGLE_SHEET_URL` is correctly set in your `.env` file
2. **Check permissions**: Ensure the Web App is deployed with "Anyone" access
3. **Check the sheet name**: The script looks for a sheet named "Service Requests" (case-sensitive)
4. **Check browser console**: Open browser DevTools and check for any error messages
5. **Test the script**: In Apps Script editor, run the `testDoPost()` function to verify it works

### Common Errors

- **"Google Sheets URL is not configured"**: Add `VITE_GOOGLE_SHEET_URL` to your `.env` file
- **"Failed to submit"**: Check that the Web App is deployed and accessible
- **"Sheet not found"**: The script will create the sheet automatically, but ensure you have permission to create sheets

## Security Notes

- The Web App URL is public, but only your specific deployment can write to your sheet
- Consider adding rate limiting or authentication if needed for production
- The script only appends data - it cannot read or modify existing rows

## Updating the Script

If you need to update the script:

1. Make changes in the Apps Script editor
2. Go to **Deploy > Manage deployments**
3. Click the edit icon (pencil) next to your deployment
4. Change the version to **New version**
5. Click **Deploy**

The new version will use the same URL, so no changes are needed in your `.env` file.
