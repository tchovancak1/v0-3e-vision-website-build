import { Resend } from "resend"
import { NextResponse } from "next/server"

interface CartItem {
  id: string
  name: string
  type: "service" | "product"
  quantity?: number
  description?: string
}

interface InquiryRequest {
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  items: CartItem[]
  website?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function cleanEnvValue(value: string | undefined) {
  return value?.trim().replace(/^["']|["']$/g, "")
}

function normalizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return ""
  }

  return value.trim().slice(0, maxLength)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function normalizeItems(items: unknown): CartItem[] {
  if (!Array.isArray(items)) {
    return []
  }

  return items
    .slice(0, 20)
    .map((item): CartItem | null => {
      if (!item || typeof item !== "object") {
        return null
      }

      const record = item as Partial<CartItem>
      const name = normalizeText(record.name, 120)
      const id = normalizeText(record.id, 80)
      const type: CartItem["type"] =
        record.type === "service" ? "service" : "product"
      const quantity =
        typeof record.quantity === "number"
          ? Math.min(Math.max(Math.floor(record.quantity), 1), 999)
          : 1
      const description = normalizeText(record.description, 240)

      if (!name || !id) {
        return null
      }

      return {
        id,
        name,
        type,
        quantity,
        description: description || undefined,
      }
    })
    .filter((item): item is CartItem => item !== null)
}

export async function POST(request: Request) {
  try {
    const resendApiKey = cleanEnvValue(process.env.RESEND_API_KEY)

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY environment variable")
      return NextResponse.json(
        { error: "Emailová služba nie je nakonfigurovaná" },
        { status: 500 }
      )
    }

    const body: InquiryRequest = await request.json()

    if (body.website) {
      return NextResponse.json({ success: true })
    }

    const name = normalizeText(body.name, 120)
    const email = normalizeText(body.email, 254).toLowerCase()
    const phone = normalizeText(body.phone, 40)
    const company = normalizeText(body.company, 160)
    const message = normalizeText(body.message, 3000)
    const items = normalizeItems(body.items)

    if (!name || !EMAIL_PATTERN.test(email) || items.length === 0) {
      return NextResponse.json(
        { error: "Chýbajú povinné údaje alebo e-mail nemá správny formát" },
        { status: 400 }
      )
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safePhone = escapeHtml(phone)
    const safeCompany = escapeHtml(company)
    const safeMessage = escapeHtml(message)

    const itemsList = items
      .map((item) => {
        const quantity =
          item.type === "product" && item.quantity ? ` - ${item.quantity} ks` : ""
        return `• ${item.name}${quantity}`
      })
      .join("\n")

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: white;
      padding: 30px;
      border-radius: 12px 12px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border: 1px solid #e2e8f0;
      border-top: none;
    }
    .section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      border: 1px solid #e2e8f0;
    }
    .section h2 {
      margin-top: 0;
      color: #0f172a;
      font-size: 16px;
      border-bottom: 2px solid #f59e0b;
      padding-bottom: 8px;
    }
    .field {
      margin-bottom: 12px;
    }
    .field-label {
      font-weight: 600;
      color: #64748b;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .field-value {
      color: #1e293b;
      font-size: 15px;
      margin-top: 4px;
    }
    .items-list {
      background: #fef3c7;
      padding: 15px 20px;
      border-radius: 8px;
      border-left: 4px solid #f59e0b;
    }
    .items-list ul {
      margin: 0;
      padding-left: 0;
      list-style: none;
    }
    .items-list li {
      padding: 8px 0;
      border-bottom: 1px solid #fde68a;
    }
    .items-list li:last-child {
      border-bottom: none;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #64748b;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Nový nezáväzný dopyt</h1>
    <p style="margin: 10px 0 0;">3E-Vision s.r.o.</p>
  </div>

  <div class="content">
    <div class="section">
      <h2>Kontaktné údaje</h2>
      <div class="field">
        <div class="field-label">Meno a priezvisko</div>
        <div class="field-value">${safeName}</div>
      </div>
      <div class="field">
        <div class="field-label">E-mail</div>
        <div class="field-value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
      </div>
      ${
        phone
          ? `
      <div class="field">
        <div class="field-label">Telefón</div>
        <div class="field-value"><a href="tel:${safePhone}">${safePhone}</a></div>
      </div>
      `
          : ""
      }
      ${
        company
          ? `
      <div class="field">
        <div class="field-label">Spoločnosť</div>
        <div class="field-value">${safeCompany}</div>
      </div>
      `
          : ""
      }
    </div>

    <div class="section">
      <h2>Položky v dopyte</h2>
      <div class="items-list">
        <ul>
          ${items
            .map((item) => {
              const safeItemName = escapeHtml(item.name)
              const safeDescription = item.description
                ? escapeHtml(item.description)
                : ""
              const quantity =
                item.type === "product" && item.quantity
                  ? ` - ${item.quantity} ks`
                  : ""

              return `
            <li>
              <strong>${safeItemName}</strong>${quantity}
              ${
                safeDescription
                  ? `<br><span style="color: #64748b; font-size: 13px;">${safeDescription}</span>`
                  : ""
              }
            </li>
          `
            })
            .join("")}
        </ul>
      </div>
    </div>

    ${
      message
        ? `
    <div class="section">
      <h2>Správa od zákazníka</h2>
      <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
    </div>
    `
        : ""
    }
  </div>

  <div class="footer">
    <p>Tento email bol odoslaný z webového portálu 3E-Vision</p>
  </div>
</body>
</html>
    `

    const textContent = `
NOVÝ NEZÁVÄZNÝ DOPYT - 3E-Vision s.r.o.
========================================

KONTAKTNÉ ÚDAJE:
- Meno: ${name}
- E-mail: ${email}
${phone ? `- Telefón: ${phone}` : ""}
${company ? `- Spoločnosť: ${company}` : ""}

POLOŽKY V DOPYTE:
${itemsList}

${message ? `SPRÁVA:\n${message}` : ""}

---
Tento email bol odoslaný z webového portálu 3E-Vision
    `

    const resend = new Resend(resendApiKey)
    const fromEmail =
      cleanEnvValue(process.env.CONTACT_FROM_EMAIL) ||
      "3E Vision <noreply@3e-vision.sk>"
    const toEmail =
      cleanEnvValue(process.env.CONTACT_TO_EMAIL) || "barna@3e-vision.sk"
    const toEmails = Array.from(new Set([toEmail].filter(Boolean)))

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      replyTo: email,
      subject: `Nový dopyt od ${name}${company ? ` (${company})` : ""}`,
      html: htmlContent,
      text: textContent,
    })

    if (error) {
      console.error("Resend error:", {
        error,
        fromEmail,
        toEmails,
      })
      return NextResponse.json(
        { error: "Nepodarilo sa odoslať email" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json(
      { error: "Interná chyba servera" },
      { status: 500 }
    )
  }
}
