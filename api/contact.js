import nodemailer from "nodemailer";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || "").trim());

function escapeHeader(v) {
  return String(v || "").replace(/[\r\n]+/g, " ").trim();
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `TejodiDesign Website <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      subject: `Форма: ${formType}`,
      text: body,
      ...(replyTo ? { replyTo } : {}),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false });
  }
}