import { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure — Benlanry',
  description: 'Benlanry participates in the Amazon Associates Program. Read our full affiliate disclosure to understand how we earn commissions.',
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="container-main py-10 max-w-3xl">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Affiliate Disclosure' }]} />

      <div className="mt-8 mb-10">
        <h1 className="text-4xl font-extrabold text-body mb-4">Affiliate Disclosure</h1>
        <p className="text-sm text-muted">Last updated: May 2025</p>
      </div>

      <div className="prose-review space-y-6">
        <div className="bg-brand-blue-light border border-brand-blue/20 rounded-2xl p-6">
          <p className="text-body font-medium leading-relaxed">
            <strong>Short version:</strong> Benlanry is a participant in the Amazon Services LLC Associates Program. When you click a product link and buy something on Amazon, we earn a small commission — at no extra cost to you. This is how we fund the site and keep all content free.
          </p>
        </div>

        <h2 className="text-xl font-bold text-body">Amazon Associates Program</h2>
        <p className="text-muted leading-relaxed">
          Benlanry.shop is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com, Amazon.co.uk, Amazon.ca, and other Amazon marketplace websites.
        </p>
        <p className="text-muted leading-relaxed">
          Amazon, the Amazon logo, and other Amazon marks are trademarks of Amazon.com, Inc., or its affiliates. Benlanry is not affiliated with, endorsed by, or sponsored by Amazon in any way beyond the Associates Program.
        </p>

        <h2 className="text-xl font-bold text-body">How It Works</h2>
        <p className="text-muted leading-relaxed">
          When you click a product link on Benlanry and subsequently make a qualifying purchase on Amazon, we receive a referral fee. This fee is a percentage of the sale price and is paid by Amazon — not by you. The price you pay on Amazon is identical whether you click our link or navigate to Amazon directly.
        </p>
        <p className="text-muted leading-relaxed">
          Our affiliate tag (<code className="bg-surface px-1.5 py-0.5 rounded text-body text-xs font-mono">benlanry-20</code>) is automatically appended to all Amazon product links on this site.
        </p>

        <h2 className="text-xl font-bold text-body">Does This Influence Our Recommendations?</h2>
        <p className="text-muted leading-relaxed">
          No. Amazon pays the same commission rate for all products within a given category, regardless of which specific product we recommend. There is no financial incentive for us to recommend one product over another.
        </p>
        <p className="text-muted leading-relaxed">
          Our editorial process is governed by a clear methodology: we research, compare, and test products independently before making any recommendation. A product&apos;s affiliate commission rate is never a factor in whether it receives a &ldquo;Best Pick&rdquo; badge or any other editorial distinction.
        </p>
        <p className="text-muted leading-relaxed">
          We would rather recommend nothing — or explicitly recommend against a purchase — than mislead a reader for the sake of a commission. Our long-term reputation depends entirely on the quality and honesty of our recommendations.
        </p>

        <h2 className="text-xl font-bold text-body">FTC Compliance</h2>
        <p className="text-muted leading-relaxed">
          This disclosure is made in compliance with the U.S. Federal Trade Commission&apos;s guidelines on endorsements and testimonials (16 CFR §255). We are committed to transparency and believe our readers have a right to know how this site is funded.
        </p>

        <h2 className="text-xl font-bold text-body">Other Potential Revenue Sources</h2>
        <p className="text-muted leading-relaxed">
          Currently, Amazon affiliate commissions are our only source of revenue. If we ever introduce other forms of monetisation (such as display advertising, sponsored content, or partnerships with other affiliate networks), we will update this page and disclose them clearly.
        </p>
        <p className="text-muted leading-relaxed">
          We do not accept free products from manufacturers in exchange for reviews. All products tested were purchased at retail or are publicly available for review.
        </p>

        <h2 className="text-xl font-bold text-body">Questions?</h2>
        <p className="text-muted leading-relaxed">
          If you have any questions about our affiliate relationships or how this site is funded, please contact us at{' '}
          <a href="mailto:hello@benlanry.shop" className="text-brand-blue hover:underline">
            hello@benlanry.shop
          </a>.
        </p>

        <div className="border-t border-border pt-6 flex gap-4 text-sm">
          <Link href="/about" className="text-brand-blue hover:underline">About Benlanry</Link>
          <Link href="/methodology" className="text-brand-blue hover:underline">Our Methodology</Link>
          <Link href="/privacy-policy" className="text-brand-blue hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}
