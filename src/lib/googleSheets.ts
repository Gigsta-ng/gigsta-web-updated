interface SheetSubmission {
  sheetName: string;
  data: Record<string, string | undefined>;
}

export async function submitToGoogleSheet({ sheetName, data }: SheetSubmission) {
  const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;
  
  if (!SHEET_URL) {
    throw new Error('Google Sheets URL is not configured. Please set VITE_GOOGLE_SHEET_URL in your .env file.');
  }
  
  try {
    const response = await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sheetName, ...data }),
    });
    
    return response;
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw error;
  }
}