import { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Benlanry',
  description: 'Read the Benlanry privacy policy. Learn what data we collect, how we use it, and your rights under GDPR and CCPA.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container-main py-10 max-w-3xl">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

      <div className="mt-8 mb-10">
        <h1 className="text-4xl font-extrabold text-body mb-4">Privacy Policy</h1>
        <p className="text-sm text-muted">Last updated: May 2025</p>
      </div>

      <div className="prose-review space-y-6">
        <p className="text-muted leading-relaxed">
          This Privacy Policy describes how Benlanry (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares information about you when you use benlanry.shop. By using our site, you agree to the practices described in this policy.
        </p>

        <h2 className="text-xl font-bold text-body">1. Information We Collect</h2>

        <h3 className="text-base font-bold text-body">Information you provide directly</h3>
        <ul className="list-disc list-inside space-y-1 text-muted text-sm leading-relaxed">
          <li><strong>Email address</strong> — when you subscribe to deal alerts or price drop notifications.</li>
          <li><strong>Price alert preferences</strong> — the target price and product you set for a price alert.</li>
        </ul>

        <h3 className="text-base font-bold text-body">Information collected automatically</h3>
        <ul className="list-disc list-inside space-y-1 text-muted text-sm leading-relaxed">
          <li><strong>Log data</strong> — IP address, browser type, pages visited, referring URL, and timestamps. This is standard web server logging.</li>
          <li><strong>Cookies</strong> — small text files stored in your browser. We use session cookies for site functionality. We do not use advertising cookies.</li>
          <li><strong>Push notification token</strong> — if you opt in to browser push notifications via OneSignal, a unique device token is stored to deliver notifications.</li>
        </ul>

        <h2 className="text-xl font-bold text-body">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-1 text-muted text-sm leading-relaxed">
          <li>To send you deal alerts and weekly digest emails (only if you subscribed).</li>
          <li>To send you price drop notifications when a product you set an alert for drops to your target price.</li>
          <li>To send you browser push notifications about new deals (only if you opted in).</li>
          <li>To analyse aggregate traffic patterns and improve the site.</li>
          <li>To protect the site against abuse and fraud.</li>
        </ul>
        <p className="text-muted leading-relaxed text-sm">
          We do not sell your personal data. We do not share your email address with third parties for marketing purposes.
        </p>

        <h2 className="text-xl font-bold text-body">3. Third-Party Services</h2>
        <p className="text-muted leading-relaxed text-sm">We use a small number of trusted third-party services to operate the site:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-bold text-body">Service</th>
                <th className="text-left py-2 pr-4 font-bold text-body">Purpose</th>
                <th className="text-left py-2 font-bold text-body">Privacy Policy</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-medium">Vercel</td>
                <td className="py-2 pr-4">Hosting &amp; CDN</td>
                <td className="py-2"><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">vercel.com</a></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-medium">Neon</td>
                <td className="py-2 pr-4">Database (subscriber data)</td>
                <td className="py-2"><a href="https://neon.tech/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">neon.tech</a></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-medium">Resend</td>
                <td className="py-2 pr-4">Transactional email delivery</td>
                <td className="py-2"><a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">resend.com</a></td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">OneSignal</td>
                <td className="py-2 pr-4">Browser push notifications</td>
                <td className="py-2"><a href="https://onesignal.com/privacy_policy" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">onesignal.com</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted leading-relaxed text-sm">
          When you click a product link on Benlanry, you are redirected to Amazon. Amazon has its own privacy policy and data practices, which apply to any interaction you have on their platform.
        </p>

        <h2 className="text-xl font-bold text-body">4. Data Retention</h2>
        <ul className="list-disc list-inside space-y-1 text-muted text-sm leading-relaxed">
          <li>Subscriber email addresses are retained until you unsubscribe.</li>
          <li>Price alerts are retained until triggered or manually deleted.</li>
          <li>Server log data is retained for up to 90 days.</li>
        </ul>

        <h2 className="text-xl font-bold text-body">5. Your Rights</h2>
        <p className="text-muted leading-relaxed text-sm">Depending on your location, you may have the following rights:</p>
        <ul className="list-disc list-inside space-y-1 text-muted text-sm leading-relaxed">
          <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
          <li><strong>Deletion</strong> — request that we delete your personal data.</li>
          <li><strong>Correction</strong> — request that we correct inaccurate data.</li>
          <li><strong>Opt-out</strong> — unsubscribe from emails at any time via the unsubscribe link in any email, or manage push notifications via your browser settings.</li>
          <li><strong>Portability</strong> — request your data in a portable format.</li>
        </ul>
        <p className="text-muted leading-relaxed text-sm">
          To exercise any of these rights, email us at{' '}
          <a href="mailto:hello@benlanry.shop" className="text-brand-blue hover:underline">hello@benlanry.shop</a>.
          We will respond within 30 days.
        </p>

        <h2 className="text-xl font-bold text-body">6. Children&apos;s Privacy</h2>
        <p className="text-muted leading-relaxed text-sm">
          Benlanry is not directed at children under the age of 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.
        </p>

        <h2 className="text-xl font-bold text-body">7. Changes to This Policy</h2>
        <p className="text-muted leading-relaxed text-sm">
          We may update this Privacy Policy from time to time. When we make material changes, we will update the &quot;Last updated&quot; date at the top of this page. Continued use of the site after changes constitutes acceptance of the updated policy.
        </p>

        <h2 className="text-xl font-bold text-body">8. Contact Us</h2>
        <p className="text-muted leading-relaxed text-sm">
          For any privacy-related questions or requests, contact us at{' '}
          <a href="mailto:hello@benlanry.shop" className="text-brand-blue hover:underline">hello@benlanry.shop</a>.
        </p>

        <div className="border-t border-border pt-6 flex gap-4 text-sm">
          <Link href="/affiliate-disclosure" className="text-brand-blue hover:underline">Affiliate Disclosure</Link>
          <Link href="/about" className="text-brand-blue hover:underline">About Us</Link>
        </div>
      </div>
    </div>
  )
}
