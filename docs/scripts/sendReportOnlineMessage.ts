// Script Name: Send Report Online Message Service

function main() {
  try {
    const phoneNumber = "18037951555";
    const receiver = "12096777520";
    const code = "C2Q7xP4DMd";

    const body = {
      to: `${phoneNumber}.${receiver}.${code}@txt.voice.google.com`,
      subject: `Report ${phoneNumber} online`,
      htmlBody: JSON.stringify({
        action: "report-phone-number-online",
        reportedAt: new Date().toISOString(),
        phoneNumber,
      }),
    };

    MailApp.sendEmail(body);
  } catch (e) {
    Logger.log(`\nError: \n    Mssage: ${e.message}\n`);
  }
}
