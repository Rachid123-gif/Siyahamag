import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { JsonLd } from "./JsonLd"

export interface BreadcrumbSegment {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  segments: BreadcrumbSegment[]
}

export function Breadcrumbs({ segments }: BreadcrumbsProps) {
  const baseUrl = "https://siyahamag.ma"

  // Build JSON-LD BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: baseUrl,
      },
      ...segments.map((segment, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: segment.label,
        ...(segment.href ? { item: `${baseUrl}${segment.href}` } : {}),
      })),
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          {/* Home */}
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {/* Intermediate segments */}
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1
            return isLast ? (
              <BreadcrumbItem key={segment.label}>
                <BreadcrumbPage>{segment.label}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem key={segment.label}>
                <BreadcrumbLink
                  render={<Link href={segment.href ?? "#"} />}
                >
                  {segment.label}
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}
