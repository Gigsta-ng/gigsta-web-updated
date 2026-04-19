/**
 * Google Apps Script to handle Service Request, Provider Application, and Waitlist Form submissions
 *
 * Service Requests payload (from gigsta-web) includes cleaning-only, laundry-only, or combined
 * interactive booking details under "Configuration Details" (multi-line text).
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
 * Existing "Service Requests" sheets created with older headers: on next submit, the script
 * inserts a "Configuration Details" column after "Package" if it is missing.
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetName = data.sheetName || "Service Requests";
    delete data.sheetName;

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(sheetName);

    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);

      var headers = [];
      if (sheetName === "Service Requests") {
        headers = [
          "Full Name",
          "WhatsApp Number",
          "Email Address",
          "Service",
          "Pricing Group",
          "Package",
          "Configuration Details",
          "Service Address",
          "Preferred Date & Time",
          "Additional Details",
          "Timestamp",
        ];
      } else if (sheetName === "Provider Applications") {
        headers = [
          "Full Name",
          "WhatsApp Number",
          "Email Address",
          "Gender",
          "Date of Birth",
          "Location",
          "Primary Service",
          "Years of Experience",
          "Operate Location",
          "Availability",
          "Availability Time",
          "How Do You Charge",
          "Average Charge",
          "Additional Details",
          "Timestamp",
        ];
      } else if (sheetName === "Waitlist") {
        headers = ["Full Name", "Email Address", "Timestamp"];
      } else {
        headers = Object.keys(data).concat("Timestamp");
      }

      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet
        .getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#F0A500");
    } else if (sheetName === "Service Requests") {
      ensureServiceRequestConfigurationColumn(sheet);
    }

    var headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
    var headers = headerRange.getValues()[0];

    var row = headers.map(function (header) {
      if (header === "Timestamp") {
        return new Date().toISOString();
      }
      var v = data[header];
      if (v === undefined || v === null) {
        return "";
      }
      if (typeof v === "object") {
        return JSON.stringify(v);
      }
      return String(v);
    });

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: sheetName + " submitted successfully",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Older sheets may lack "Configuration Details". Insert that column after "Package" so
 * cleaning / laundry / combined payloads map correctly.
 */
function ensureServiceRequestConfigurationColumn(sheet) {
  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var i;
  for (i = 0; i < headers.length; i++) {
    if (headers[i] === "Configuration Details") {
      return;
    }
  }
  var packageIdx = -1;
  for (i = 0; i < headers.length; i++) {
    if (headers[i] === "Package") {
      packageIdx = i;
      break;
    }
  }
  if (packageIdx >= 0) {
    sheet.insertColumnAfter(packageIdx + 1);
    sheet.getRange(1, packageIdx + 2).setValue("Configuration Details");
  } else {
    var tsIdx = -1;
    for (i = 0; i < headers.length; i++) {
      if (headers[i] === "Timestamp") {
        tsIdx = i;
        break;
      }
    }
    if (tsIdx >= 0) {
      sheet.insertColumnBefore(tsIdx + 1);
      sheet.getRange(1, tsIdx + 1).setValue("Configuration Details");
    }
  }
  sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .setFontWeight("bold")
    .setBackground("#F0A500");
}
