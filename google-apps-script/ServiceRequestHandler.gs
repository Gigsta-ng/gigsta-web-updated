/**
 * Google Apps Script to handle Service Request Form submissions
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Create a sheet named "Service Requests"
 * 3. Add headers in Row 1: Full Name, WhatsApp Number, Email Address, Service, Pricing Group, Package, Service Address, Preferred Date & Time, Additional Details, Timestamp
 * 4. Go to Extensions > Apps Script
 * 5. Paste this code
 * 6. Deploy as Web App:
 *    - Click Deploy > New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Copy the Web App URL
 * 7. Add URL to .env file: VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
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
      // Add headers
      sheet.getRange(1, 1, 1, 10).setValues([[
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
      ]]);
      // Format header row
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold').setBackground('#F0A500');
    }
    
    // Prepare row data in the correct order
    const row = [
      data['Full Name'] || '',
      data['WhatsApp Number'] || '',
      data['Email Address'] || '',
      data['Service'] || '',
      data['Pricing Group'] || '',
      data['Package'] || '',
      data['Service Address'] || '',
      data['Preferred Date & Time'] || '',
      data['Additional Details'] || '',
      new Date().toISOString()
    ];
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true,
      message: 'Service request submitted successfully'
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

// Test function (optional - for testing in Apps Script editor)
function testDoPost() {
  const testData = {
    sheetName: 'Service Requests',
    'Full Name': 'John Doe',
    'WhatsApp Number': '+2341234567890',
    'Email Address': 'john@example.com',
    'Service': 'cleaning',
    'Pricing Group': 'One-Time Cleaning',
    'Package': 'One-Time Cleaning - 1 Bedroom Apartment',
    'Service Address': '123 Main St, Uyo',
    'Preferred Date & Time': '2024-01-15T10:00',
    'Additional Details': 'Test submission'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
