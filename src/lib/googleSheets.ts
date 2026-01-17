interface SheetSubmission {
  sheetName: string;
  data: Record;
}

export async function submitToGoogleSheet({ sheetName, data }: SheetSubmission) {
  const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;
  
  const response = await fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sheetName, ...data }),
  });
  
  return response;
}