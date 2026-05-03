const createShareEmailTemplate = ({
  receiverName,
  ownerName,
  docTitle,
  role,
  link
}) => {
  return `
  <div style="margin:0;padding:0;background:#f6f8fb;font-family:Inter,Arial,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">

          <!-- MAIN CARD -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08);">

            <!-- HEADER -->
            <tr>
              <td style="padding:20px 30px;border-bottom:1px solid #eee;">
                <div style="display:flex;align-items:center;">
                  
                  <!-- LOGO -->
                  <img 
                    src="http://localhost:5000/public/IntelliDocs.logo.png" 
                    width="40" 
                    height="40"
                    style="border-radius:8px;display:block;"
                    alt="IntelliDocs Logo"
                    />

                  <div style="margin-left:12px;">
                    <div style="font-size:16px;font-weight:600;color:#111;">IntelliDocs</div>
                    <div style="font-size:12px;color:#888;">Smart Document Collaboration</div>
                  </div>
                </div>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:30px;">
                
                <h2 style="margin:0 0 10px;font-size:20px;color:#111;">
                  📄 You've been invited to a document
                </h2>

                <p style="margin:0 0 20px;color:#444;font-size:14px;">
                  Hi <b>${receiverName}</b>,
                </p>

                <p style="margin:0 0 20px;color:#444;font-size:14px;">
                  <b>${ownerName}</b> has shared a document with you and gave you 
                  <b>${role}</b> access.
                </p>

                <!-- DOCUMENT CARD -->
                <div style="border:1px solid #eee;border-radius:10px;padding:15px;margin-bottom:25px;">
                  <div style="font-size:14px;color:#888;">Document</div>
                  <div style="font-size:16px;font-weight:600;color:#111;">
                    ${docTitle}
                  </div>
                </div>

                <!-- BUTTON -->
                <div style="text-align:center;margin:30px 0;">
                  <a href="${link}" 
                     style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;">
                     Open Document
                  </a>
                </div>

                <p style="font-size:12px;color:#888;">
                  If you don’t recognize this, you can safely ignore this email.
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:20px;text-align:center;background:#fafafa;border-top:1px solid #eee;">
                <p style="margin:0;font-size:12px;color:#888;">
                  © 2026 IntelliDocs • All rights reserved
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </div>
  `;
};

module.exports = { createShareEmailTemplate };