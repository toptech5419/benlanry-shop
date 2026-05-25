import { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { CheckCircle, Search, BarChart2, RefreshCw, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Methodology — How We Pick Products',
  description: 'Learn exactly how Benlanry researches, tests, and selects product recommendations. Our transparent process ensures every pick is genuinely the best.',
}

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Category Research',
    body: 'We start by mapping the full landscape of a product category — identifying every major option, price tier, and use case. We read expert reviews, manufacturer specs, and forum discussions before shortlisting candidates.',
  },
  {
    icon: BarChart2,
    step: '02',
    title: 'Data & Review Analysis',
    body: 'We analyse thousands of verified Amazon customer reviews, looking for consistent patterns in praise and complaints. We cross-reference with lab test data from specialist publications where available.',
  },
  {
    icon: CheckCircle,
    step: '03',
    title: 'Hands-On Evaluation',
    body: 'Where possible, top candidates are physically tested in real-world conditions. We evaluate build quality, ease of use, performance against advertised specs, and value for money.',
  },
  {
    icon: Star,
    step: '04',
    title: 'Best Pick Selection',
    body: 'We select a "Best Pick" only when a product clearly outperforms alternatives at its price point. We never pick a product simply because it pays a higher commission — the commission is the same regardless of which product we recommend.',
  },
  {
    icon: RefreshCw,
    step: '05',
    title: 'Ongoing Updates',
    body: 'Products are reviewed regularly. If a better option launches, prices change significantly, or quality degrades based on updated customer feedback, we update our recommendations — sometimes removing a pick entirely.',
  },
]

const criteria = [
  'Performance against key use cases',
  'Value for money vs alternatives',
  'Build quality and durability',
  'Ease of setup and daily use',
  'Customer satisfaction across verified reviews',
  'Brand reputation and after-sales support',
  'Price-to-feature ratio',
  'Availability and delivery reliability',
]

export default function MethodologyPage() {
  return (
    <div className="container-main py-10 max-w-3xl">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Our Methodology' }]} />

      <div className="mt-8 mb-10">
        <h1 className="text-4xl font-extrabold text-body mb-4">How We Pick Products</h1>
        <p className="text-lg text-muted leading-relaxed">
          Every recommendation on Benlanry follows a consistent, transparent research process. Here&apos;s exactly how we decide what earns a &ldquo;Best Pick&rdquo; badge — and what doesn&apos;t make the cut.
        </p>
      </div>

      {/* Process steps */}
      <div className="space-y-6 mb-12">
        {steps.map(s => (
          <div key={s.step} className="flex gap-5">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div className="w-px flex-1 bg-border mt-2" />
            </div>
            <div className="pb-6 min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-1">Step {s.step}</p>
              <h2 className="text-lg font-bold text-body mb-2">{s.title}</h2>
              <p className="text-sm text-muted leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Scoring criteria */}
      <div className="bg-surface rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-bold text-body mb-4">What We Score Products On</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {criteria.map(c => (
            <div key={c} className="flex items-start gap-2 text-sm text-body">
              <CheckCircle className="w-4 h-4 text-deal flex-shrink-0 mt-0.5" />
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Independence statement */}
      <div className="border-l-4 border-brand-blue pl-5 mb-10">
        <h2 className="font-bold text-body mb-2">Our Independence Policy</h2>
        <p className="text-sm text-muted leading-relaxed">
          Benlanry never accepts free products from manufacturers in exchange for reviews. We never allow affiliate commission rates to influence our rankings — Amazon pays the same commission rate regardless of which product we recommend within a category. Our editorial team operates independently from any commercial considerations.
        </p>
      </div>

      {/* Update policy */}
      <div className="card p-6">
        <h2 className="font-bold text-body mb-2 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-brand-blue" /> Update Policy
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          All product pages display a &ldquo;Last Updated&rdquo; date. We review our picks at least every 6 months, and immediately when a significantly better product launches or a previously recommended product receives a pattern of negative reviews. Outdated recommendations are either updated or removed — never left to mislead readers.
        </p>
      </div>
    </div>
  )
}
