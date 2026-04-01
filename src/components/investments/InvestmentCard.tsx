import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { INVESTMENT_TYPES } from "@/lib/constants"
import { MapPin, Ruler, Banknote } from "lucide-react"
import type { InvestmentType } from "@/types"

interface InvestmentCardProps {
  investment: {
    id: string
    title: string
    slug: string
    investmentType: InvestmentType
    city: string
    price: number | null
    surface: number | null
    images: string[]
  }
}

function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)} M MAD`
  }
  if (price >= 1_000) {
    return `${(price / 1_000).toFixed(0)} K MAD`
  }
  return `${price.toLocaleString("fr-FR")} MAD`
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
  const typeLabel =
    INVESTMENT_TYPES[investment.investmentType as keyof typeof INVESTMENT_TYPES] ??
    investment.investmentType
  const coverImage = investment.images[0] ?? null

  return (
    <Link href={`/investissement/${investment.slug}`} className="group block">
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={investment.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <Banknote className="size-10" />
            </div>
          )}
          <Badge className="absolute left-3 top-3">{typeLabel}</Badge>
        </div>

        <CardContent className="space-y-2">
          {/* Title */}
          <h3 className="font-heading text-base font-semibold leading-snug text-foreground line-clamp-2">
            {investment.title}
          </h3>

          {/* City */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span>{investment.city}</span>
          </div>

          {/* Price + Surface */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {investment.price != null && (
              <span className="text-base font-bold text-ocean">
                {formatPrice(investment.price)}
              </span>
            )}
            {investment.surface != null && (
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Ruler className="size-3.5" />
                {investment.surface.toLocaleString("fr-FR")} m&sup2;
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
