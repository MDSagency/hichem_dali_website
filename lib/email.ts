import { Resend } from "resend";
import type { ContactFormData } from "@/lib/contact-schema";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(data: ContactFormData) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !to || !from) {
    throw new Error("Configuration e-mail manquante");
  }

  const resend = new Resend(apiKey);
  const { name, email, subject, message } = data;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `[Site Web] ${subject} — ${name}`,
    html: `
      <!DOCTYPE html>
      <html lang="fr">
        <body style="margin:0;padding:0;background:#f5efe0;font-family:Georgia,serif;color:#1c1c1e;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5efe0;padding:32px 16px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-top:3px solid #c4973a;">
                  <tr>
                    <td style="padding:32px;">
                      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#c4973a;">
                        Cabinet Maître DALI Hichem
                      </p>
                      <h1 style="margin:0 0 24px;font-size:24px;font-weight:500;">
                        Nouveau message de contact
                      </h1>
                      <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;">
                        <tr>
                          <td style="padding:8px 0;color:#8a8070;width:120px;vertical-align:top;">Nom</td>
                          <td style="padding:8px 0;">${safeName}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#8a8070;vertical-align:top;">E-mail</td>
                          <td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#c4973a;">${safeEmail}</a></td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;color:#8a8070;vertical-align:top;">Sujet</td>
                          <td style="padding:8px 0;">${safeSubject}</td>
                        </tr>
                      </table>
                      <hr style="margin:24px 0;border:none;border-top:1px solid rgba(196,151,58,0.25);" />
                      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#8a8070;">Message</p>
                      <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;line-height:1.8;">${safeMessage}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    text: [
      "Nouveau message de contact — Cabinet Maître DALI Hichem",
      "",
      `Nom : ${name}`,
      `E-mail : ${email}`,
      `Sujet : ${subject}`,
      "",
      "Message :",
      message,
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }
}
