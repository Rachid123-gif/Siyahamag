import type { Metadata } from "next"
import { ArticleForm } from "@/components/admin/ArticleForm"

export const metadata: Metadata = {
  title: "Nouvel article | SiyahaMag Admin",
}

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Nouvel article</h1>
        <p className="text-sm text-muted-foreground">
          Redigez et publiez un nouvel article.
        </p>
      </div>
      <ArticleForm mode="create" />
    </div>
  )
}
