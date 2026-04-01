import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function JobNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <FileQuestion className="mx-auto size-16 text-muted-foreground" />
      <h1 className="mt-6 text-2xl font-bold">Offre introuvable</h1>
      <p className="mt-2 text-muted-foreground">
        Cette offre d&apos;emploi n&apos;existe pas ou n&apos;est plus disponible.
      </p>
      <Button asChild className="mt-8">
        <Link href="/emplois">Voir toutes les offres</Link>
      </Button>
    </div>
  )
}
