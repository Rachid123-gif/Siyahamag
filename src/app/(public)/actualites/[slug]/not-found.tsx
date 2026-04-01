import Link from "next/link"
import { FileX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ArticleNotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <FileX className="mx-auto h-16 w-16 text-muted-foreground/50" />
      <h1 className="mt-6 text-2xl font-bold text-foreground">
        Article introuvable
      </h1>
      <p className="mt-3 text-muted-foreground max-w-md mx-auto">
        L&apos;article que vous recherchez n&apos;existe pas ou n&apos;est plus
        disponible.
      </p>
      <Button asChild className="mt-8 bg-ocean hover:bg-ocean/90">
        <Link href="/actualites">Voir toutes les actualités</Link>
      </Button>
    </div>
  )
}
