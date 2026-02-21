const nodemailer = require("nodemailer");

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || "").trim());

function escapeHeader(v) {
  return String(v || "").replace(/[\r\n]+/g, " ").trim();
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Method Not Allowed");
  }

  try {
    // Vercel обикновено парсва JSON автоматично, но все пак:
    const data = req.body || {};
    const formType = escapeHeader(data.form_type || "Website form");

    const fields = { ...data };
    delete fields.form_type;

    let body = `Ново съобщение от формата: ${formType}\n\n`;

    let clientEmail = "";
    for (const [key, rawVal] of Object.entries(fields)) {
      const value = Array.isArray(rawVal) ? rawVal.join(", ") : String(rawVal ?? "").trim();
      body += `${key}: ${value}\n`;
      if (/email/i.test(key) || /имейл/i.test(key)) clientEmail = value;
    }

    const replyTo = isEmail(clientEmail) ? clientEmail : undefined;

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const mailFrom = process.env.MAIL_FROM || user;
    const mailTo = process.env.MAIL_TO;

    if (!host || !user || !pass || !mailTo) {
      console.error("Missing env vars:", {
        SMTP_HOST: !!host,
        SMTP_USER: !!user,
        SMTP_PASS: !!pass,
        MAIL_TO: !!mailTo,
      });
      return res.status(500).json({ ok: false, error: "Missing server configuration" });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,          // 465 SSL, 587 STARTTLS
      auth: { user, pass },
      requireTLS: port === 587,      // Zoho често го иска
    });

    // по желание: да хване проблем с логин веднага
    // await transporter.verify();

    await transporter.sendMail({
      from: `TejodiDesign Website <${mailFrom}>`,
      to: mailTo,
      subject: `Форма: ${formType}`,
      text: body,
      ...(replyTo ? { replyTo } : {}),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("CONTACT_SEND_ERROR:", err);
    return res.status(500).json({ ok: false, error: "Send failed" });
  }
};