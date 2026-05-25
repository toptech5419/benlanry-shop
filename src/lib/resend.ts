import { Resend } from 'resend'

export const FROM_EMAIL = 'Benlanry <deals@benlanry.shop>'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
}

export async function sendWelcomeEmail(email: string) {
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Welcome to Benlanry — Your deal alerts are active!',
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
      <body style="margin:0;padding:0;background:#f5f7fa;font-family:system-ui,sans-serif;">
        <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <div style="background:#005BAC;padding:32px 40px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:28px;font-weight:800;">Benlanry</h1>
            <p style="color:#E8F1FB;margin:8px 0 0;font-size:14px;">Discover. Compare. Buy Smart.</p>
          </div>
          <div style="padding:40px;">
            <h2 style="color:#1A1A1A;margin:0 0 12px;font-size:22px;">You're in! 🎉</h2>
            <p style="color:#666;line-height:1.6;margin:0 0 24px;">
              Welcome to Benlanry. You'll now get weekly deal alerts and price drop notifications straight to your inbox — no spam, ever.
            </p>
            <a href="https://benlanry.shop/deals" style="display:inline-block;background:#FF6B00;color:#fff;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:10px;font-size:15px;">
              See Today's Deals →
            </a>
            <hr style="border:none;border-top:1px solid #E0E0E0;margin:32px 0;">
            <p style="color:#999;font-size:12px;margin:0;">
              You're receiving this because you signed up at benlanry.shop.<br>
              <a href="https://benlanry.shop/unsubscribe?email=${encodeURIComponent(email)}" style="color:#005BAC;">Unsubscribe</a> ·
              <a href="https://benlanry.shop/affiliate-disclosure" style="color:#005BAC;">Affiliate Disclosure</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}

export async function sendPriceDropEmail(
  email: string,
  productName: string,
  productSlug: string,
  newPrice: number,
  originalPrice: number,
  amazonUrl: string,
  affiliateTag: string
) {
  const savings = (originalPrice - newPrice).toFixed(2)
  const percent = Math.round(((originalPrice - newPrice) / originalPrice) * 100)
  const buyUrl = `${amazonUrl}${amazonUrl.includes('?') ? '&' : '?'}tag=${affiliateTag}`

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `🔥 Price drop! ${productName} is now $${newPrice.toFixed(2)}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
      <body style="margin:0;padding:0;background:#f5f7fa;font-family:system-ui,sans-serif;">
        <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(135deg,#ef4444,#FF6B00);padding:32px 40px;text-align:center;">
            <p style="color:#fff;font-weight:800;font-size:13px;letter-spacing:0.1em;margin:0 0 8px;text-transform:uppercase;">Price Drop Alert</p>
            <h1 style="color:#fff;margin:0;font-size:32px;font-weight:900;">-${percent}% OFF</h1>
          </div>
          <div style="padding:40px;">
            <h2 style="color:#1A1A1A;margin:0 0 8px;font-size:18px;line-height:1.4;">${productName}</h2>
            <div style="display:flex;align-items:baseline;gap:12px;margin:16px 0 24px;">
              <span style="font-size:32px;font-weight:900;color:#1A1A1A;">$${newPrice.toFixed(2)}</span>
              <span style="font-size:18px;color:#999;text-decoration:line-through;">$${originalPrice.toFixed(2)}</span>
              <span style="background:#E8F7EE;color:#00A651;font-weight:700;padding:4px 10px;border-radius:6px;font-size:13px;">Save $${savings}</span>
            </div>
            <p style="color:#666;font-size:14px;margin:0 0 24px;">This price may not last long. Click below to grab it on Amazon now.</p>
            <a href="${buyUrl}" style="display:inline-block;background:#005BAC;color:#fff;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:10px;font-size:15px;">
              Check Price on Amazon →
            </a>
            <p style="margin:12px 0 0;font-size:12px;color:#999;">
              <a href="https://benlanry.shop/product/${productSlug}" style="color:#005BAC;">View on Benlanry</a>
            </p>
            <hr style="border:none;border-top:1px solid #E0E0E0;margin:32px 0;">
            <p style="color:#999;font-size:12px;margin:0;">
              You set a price alert for this product on benlanry.shop.<br>
              <a href="https://benlanry.shop/unsubscribe?email=${encodeURIComponent(email)}" style="color:#005BAC;">Unsubscribe from all alerts</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}

export async function sendWeeklyDealsEmail(email: string, deals: Array<{ name: string; slug: string; price: string; discount: number }>) {
  const dealRows = deals.map(d => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
        <a href="https://benlanry.shop/product/${d.slug}" style="color:#005BAC;font-weight:600;text-decoration:none;">${d.name}</a>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:700;">$${d.price}</td>
      <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;text-align:right;">
        <span style="background:#E8F7EE;color:#00A651;font-weight:700;padding:2px 8px;border-radius:4px;font-size:12px;">-${d.discount}%</span>
      </td>
    </tr>
  `).join('')

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `🛍️ This week's best deals on Benlanry`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
      <body style="margin:0;padding:0;background:#f5f7fa;font-family:system-ui,sans-serif;">
        <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <div style="background:#005BAC;padding:32px 40px;">
            <h1 style="color:#fff;margin:0;font-size:24px;font-weight:800;">Benlanry Weekly Deals</h1>
            <p style="color:#E8F1FB;margin:8px 0 0;font-size:14px;">Your hand-picked deals this week</p>
          </div>
          <div style="padding:40px;">
            <table style="width:100%;border-collapse:collapse;">
              <thead>
                <tr>
                  <th style="text-align:left;padding-bottom:8px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Product</th>
                  <th style="text-align:right;padding-bottom:8px;color:#666;font-size:12px;text-transform:uppercase;">Price</th>
                  <th style="text-align:right;padding-bottom:8px;color:#666;font-size:12px;text-transform:uppercase;">Saving</th>
                </tr>
              </thead>
              <tbody>${dealRows}</tbody>
            </table>
            <div style="margin-top:32px;text-align:center;">
              <a href="https://benlanry.shop/deals" style="display:inline-block;background:#FF6B00;color:#fff;text-decoration:none;font-weight:700;padding:14px 32px;border-radius:10px;font-size:15px;">
                See All Deals →
              </a>
            </div>
            <hr style="border:none;border-top:1px solid #E0E0E0;margin:32px 0;">
            <p style="color:#999;font-size:12px;margin:0;text-align:center;">
              <a href="https://benlanry.shop/unsubscribe?email=${encodeURIComponent(email)}" style="color:#005BAC;">Unsubscribe</a> · As an Amazon Associate, Benlanry earns from qualifying purchases.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}
