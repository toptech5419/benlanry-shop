import { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Link from 'next/link'
import { Shield, Star, Zap, Users, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Benlanry',
  description: 'Learn about Benlanry — who we are, how we work, and our commitment to honest, expert product recommendations.',
}

const values = [
  {
    icon: Shield,
    title: 'Honest & Independent',
    body: 'We only recommend products we genuinely believe in. Our editorial decisions are never influenced by commissions — we test first, link second.',
  },
  {
    icon: Star,
    title: 'Expert Curation',
    body: 'Every product on Benlanry is hand-picked and reviewed. We research specs, read thousands of customer reviews, and compare alternatives before making any recommendation.',
  },
  {
    icon: Zap,
    title: 'Updated Daily',
    body: 'Prices change, new products launch, and better deals emerge. Our team checks and updates listings every day so you always see accurate information.',
  },
  {
    icon: Users,
    title: 'Reader First',
    body: 'Our goal is simple: help you buy the right thing at the right price. We earn a small commission when you buy through our links, but that never changes what we recommend.',
  },
]

export default function AboutPage() {
  return (
    <div className="container-main py-10 max-w-3xl">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      <div className="mt-8 mb-10">
        <h1 className="text-4xl font-extrabold text-body mb-4">About Benlanry</h1>
        <p className="text-lg text-muted leading-relaxed">
          Benlanry is an expert-curated product recommendation site. We research, compare, and hand-pick the best Amazon products across every category — so you can shop with confidence and never waste money on the wrong thing.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-brand-blue-light border border-brand-blue/20 rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-bold text-body mb-2">Our Mission</h2>
        <p className="text-body leading-relaxed">
          We believe everyone deserves access to honest product advice. The internet is full of fake reviews and paid placements. Benlanry exists to cut through the noise — giving you clear, trustworthy recommendations backed by real research.
        </p>
      </div>

      {/* Values */}
      <h2 className="text-2xl font-bold text-body mb-6">What We Stand For</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        {values.map(v => (
          <div key={v.title} className="card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-brand-blue-light rounded-xl flex items-center justify-center flex-shrink-0">
                <v.icon className="w-4.5 h-4.5 text-brand-blue" />
              </div>
              <h3 className="font-bold text-body">{v.title}</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed">{v.body}</p>
          </div>
        ))}
      </div>

      {/* How we make money */}
      <div className="border border-border rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-bold text-body mb-3">How Benlanry Makes Money</h2>
        <p className="text-body text-sm leading-relaxed mb-3">
          Benlanry participates in the Amazon Associates Program. When you click a link on our site and make a purchase on Amazon, we earn a small commission — at no extra cost to you whatsoever.
        </p>
        <p className="text-sm text-muted leading-relaxed">
          This commission is what funds our research, keeps the site running, and allows us to keep all content free. It never influences which products we recommend — we&apos;d rather recommend nothing than recommend something we don&apos;t believe in.
        </p>
        <Link href="/affiliate-disclosure" className="inline-flex items-center gap-1 text-sm text-brand-blue mt-3 no-underline hover:underline">
          Read our full affiliate disclosure <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Contact */}
      <div className="bg-surface rounded-2xl p-6">
        <h2 className="text-xl font-bold text-body mb-2">Get in Touch</h2>
        <p className="text-sm text-muted mb-1">Have a question, found an error, or want to suggest a product?</p>
        <a href="mailto:hello@benlanry.shop" className="text-brand-blue font-medium hover:underline text-sm">
          hello@benlanry.shop
        </a>
      </div>
    </div>
  )
}
