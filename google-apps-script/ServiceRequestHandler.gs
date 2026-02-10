/**
 * Google Apps Script to handle Service Request, Provider Application, and Waitlist Form submissions
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Deploy as Web App:
 *    - Click Deploy > New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Copy the Web App URL
 * 5. Add URL to .env file: VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
 * 
 * Note: The script will automatically create sheets and headers as needed for:
 * - Service Requests
 * - Provider Applications
 * - Waitlist
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetName = data.sheetName || 'Service Requests';
    delete data.sheetName;
    
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      
      // Define headers based on sheet name
      let headers = [];
      if (sheetName === 'Service Requests') {
        headers = [
          'Full Name',
          'WhatsApp Number',
          'Email Address',
          'Service',
          'Pricing Group',
          'Package',
          'Service Address',
          'Preferred Date & Time',
          'Additional Details',
          'Timestamp'
        ];
      } else if (sheetName === 'Provider Applications') {
        headers = [
          'Full Name',
          'WhatsApp Number',
          'Email Address',
          'Gender',
          'Date of Birth',
          'Location',
          'Primary Service',
          'Years of Experience',
          'Operate Location',
          'Availability',
          'Availability Time',
          'How Do You Charge',
          'Average Charge',
          'Additional Details',
          'Timestamp'
        ];
      } else if (sheetName === 'Waitlist') {
        headers = [
          'Full Name',
          'Email Address',
          'Timestamp'
        ];
      } else {
        // Generic headers if sheet name doesn't match
        headers = Object.keys(data).concat('Timestamp');
      }
      
      // Add headers
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      // Format header row
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#F0A500');
    }
    
    // Get existing headers to maintain order
    const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
    const headers = headerRange.getValues()[0];
    
    // Prepare row data in the correct order based on headers
    const row = headers.map(header => {
      if (header === 'Timestamp') {
        return new Date().toISOString();
      }
      return data[header] || '';
    });
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true,
      message: `${sheetName} submitted successfully`
    }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
