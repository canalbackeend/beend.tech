import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message, to } = req.body;

  console.log("Contact form request received:", { name, email, phone, message, to });

  try {
    const user = process.env.VITE_MAIL_USER || process.env.MAIL_USER;
    const pass = process.env.VITE_MAIL_PASS || process.env.MAIL_PASS;

    if (!user || !pass) {
      console.warn("Mail credentials missing. Set VITE_MAIL_USER and VITE_MAIL_PASS in Settings.");
      console.log("--------- EMAIL CONTENT ---------");
      console.log(`To: ${to || "beendtech@gmail.com"}`);
      console.log(`From: ${name} <${email}>`);
      console.log(`Phone: ${phone}`);
      console.log(`Message: ${message}`);
      console.log("---------------------------------");
      
      return res.json({ success: true, message: "Message logged to console (credentials missing)" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const mailOptions = {
      from: user,
      to: to || "beendtech@gmail.com",
      subject: `Novo contato de ${name} (Portfólio)`,
      text: `
        Novo contato recebido pelo site:
        
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone}
        
        Mensagem:
        ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error: any) {
    console.error("Error sending mail:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
