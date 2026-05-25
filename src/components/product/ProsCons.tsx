import { Check, X } from 'lucide-react'

interface ProsConsProps {
  pros: string[]
  cons: string[]
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <div className="bg-deal-light border border-deal/20 rounded-xl p-4">
        <h3 className="font-bold text-deal mb-3 flex items-center gap-2">
          <Check className="w-4 h-4" /> Pros
        </h3>
        <ul className="space-y-2">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-body">
              <Check className="w-4 h-4 text-deal flex-shrink-0 mt-0.5" />
              {pro}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-xl p-4">
        <h3 className="font-bold text-red-600 mb-3 flex items-center gap-2">
          <X className="w-4 h-4" /> Cons
        </h3>
        <ul className="space-y-2">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-body">
              <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
