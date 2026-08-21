# Lead Sheet setup (10 minutes, one time)

Every submission from the capture modal is emailed to `contact@azaudios.com`, but
email alone gives you no sortable list — after a conference you have forty
messages in an inbox and no way to filter by city, timeline, or which piece of
print they scanned. This connects the same submissions to a Google Sheet you can
sort, filter, and export.

It is optional. Until `LEAD_SHEET_WEBHOOK_URL` is set in Vercel the code skips
the Sheet entirely and just sends the emails — nothing breaks.

> **One thing to know before you start:** with no Sheet configured, a Gmail
> outage means a submission has nowhere to land. The handler returns an error in
> that case, the visitor's browser keeps the lead queued and retries it, and they
> see "your details are saved" rather than a failure. So nothing is lost either
> way — the Sheet just removes the single point of failure.

## 1. Create the Sheet

1. Go to [sheets.new](https://sheets.new) and name it **AZ Audio — Leads**.
2. Paste this into row 1 as the header (select cell A1 first, then paste):

```
Received	Client ID	Event	Source	Name	Masjid / Organization	City / State	Email	Phone	OK to text	Timeline	Wants to solve	Notes
```

## 2. Add the script

1. In the Sheet: **Extensions → Apps Script**.
2. Delete whatever is in the editor and paste the whole block below.
3. Click the **Save** icon.

```javascript
// Receives lead submissions from api/lead.js and appends one row per lead.
//
// Deduplicates on Client ID: the website queues leads when a phone loses
// signal and retries them later, so the same lead can legitimately arrive
// twice. Without this check a bad connection at the booth turns into duplicate
// rows in the follow-up list.
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var lead = JSON.parse(e.postData.contents);

    if (lead.clientId) {
      var ids = sheet.getRange('B2:B').getValues();
      for (var i = 0; i < ids.length; i++) {
        if (ids[i][0] === lead.clientId) {
          return ContentService
            .createTextOutput(JSON.stringify({ ok: true, duplicate: true }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    sheet.appendRow([
      new Date(),
      lead.clientId || '',
      lead.event || '',
      lead.source || '',
      lead.name || '',
      lead.masjid || '',
      lead.city || '',
      lead.email || '',
      lead.phone || '',
      lead.smsConsent ? 'Yes' : 'No',
      lead.timeline || '',
      (lead.needs || []).join(', '),
      lead.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    // A non-2xx tells api/lead.js the Sheet did not take the row, so it can
    // report the failure instead of assuming the lead is safe.
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
      .setResponseCode(500);
  } finally {
    lock.releaseLock();
  }
}
```

## 3. Publish it

1. **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** **Anyone**
4. **Deploy**. Google will ask you to authorise it — approve the prompts. On the
   "Google hasn't verified this app" screen, choose **Advanced → Go to (your
   project)**; it is your own script.
5. Copy the **Web app URL**. It looks like
   `https://script.google.com/macros/s/AKfy.../exec`.

> **Who has access must be "Anyone."** The Vercel function calls this without a
> Google login. "Anyone" means anyone holding the URL can append a row — it
> cannot read your Sheet or anything else in your Drive. Treat the URL as a
> secret and it is fine. If it ever leaks, use **Deploy → Manage deployments**
> to create a new one, then update the Vercel variable.

## 4. Tell Vercel about it

1. Vercel dashboard → the **masjid-sound-solutions** project → **Settings →
   Environment Variables**.
2. Add:

   | Name | Value |
   | --- | --- |
   | `LEAD_SHEET_WEBHOOK_URL` | the Web app URL from step 3 |

3. Redeploy (Vercel only picks up new variables on a fresh deployment).

## 5. Check it

Scan one of the QR codes, or open
`https://azaudios.com/masjid-sound-solutions?src=test`, and submit the form with
your own email. Within a few seconds you should have:

- a new row in the Sheet, with `test` in the **Source** column
- the internal notification email at `contact@azaudios.com`
- the confirmation email, with the guide attached, in your own inbox

Then delete the test row.

## Related environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `EMAIL_USER`, `EMAIL_PASSWORD` | yes | Gmail account and App Password used to send both emails (shared with the quote form) |
| `EMAIL_TO` | no | Where internal notifications go. Defaults to `contact@azaudios.com` |
| `LEAD_SHEET_WEBHOOK_URL` | no | The Apps Script URL above. Omit and the Sheet step is skipped |
| `SITE_ORIGIN` | no | Used as a fallback source for the guide attachment. Defaults to `https://azaudios.com` |
