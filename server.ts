import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const rateLimit = new Map();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  
  if (!record || now - record.timestamp > RATE_WINDOW) {
    rateLimit.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

const PORT = process.env.PORT || 3000;

app.post("/api/contact", async (req, res) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ success: false, error: "Too many requests. Try again later." });
  }

  const { name, email, phone, message, to } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: "Invalid email format" });
  }

  console.log("Contact form request received:", { name, email, phone, message, to });

  try {
    const user = process.env.VITE_MAIL_USER || process.env.MAIL_USER;
    const pass = process.env.VITE_MAIL_PASS || process.env.MAIL_PASS;

    if (!user || !pass) {
      console.warn("Mail credentials missing.");
      console.log("--------- EMAIL CONTENT ---------");
      console.log(`To: ${to || "beendtech@gmail.com"}`);
      console.log(`From: ${name} <${email}>`);
      console.log(`Phone: ${phone}`);
      console.log(`Message: ${message}`);
      console.log("---------------------------------");
      
      return res.json({ success: true, message: "Message logged" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const mailOptions = {
      from: user,
      to: to || "beendtech@gmail.com",
      subject: `Novo contato de ${name} (Portfólio)`,
      text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error: any) {
    console.error("Error sending mail:", error);
    res.status(500).json({ success: false, error: error.message });
  }
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
