import Image from "next/image"

// ── Tiptap JSON types ──────────────────────────────────────────────

interface TiptapMark {
  type: "bold" | "italic" | "underline" | "strike" | "link" | "code"
  attrs?: Record<string, unknown>
}

interface TiptapNode {
  type: string
  attrs?: Record<string, unknown>
  content?: TiptapNode[]
  marks?: TiptapMark[]
  text?: string
}

interface RichTextRendererProps {
  content: {
    type: "doc"
    content: TiptapNode[]
  }
}

// ── Mark renderer ──────────────────────────────────────────────────

function renderMarks(text: string, marks?: TiptapMark[]): React.ReactNode {
  if (!marks || marks.length === 0) return text

  return marks.reduce<React.ReactNode>((acc, mark) => {
    switch (mark.type) {
      case "bold":
        return <strong>{acc}</strong>
      case "italic":
        return <em>{acc}</em>
      case "underline":
        return <u>{acc}</u>
      case "strike":
        return <s>{acc}</s>
      case "code":
        return (
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {acc}
          </code>
        )
      case "link": {
        const href = (mark.attrs?.href as string) ?? "#"
        const isExternal =
          href.startsWith("http://") || href.startsWith("https://")
        return (
          <a
            href={href}
            className="text-primary underline underline-offset-2 hover:text-primary/80"
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {acc}
          </a>
        )
      }
      default:
        return acc
    }
  }, text)
}

// ── Node renderer ──────────────────────────────────────────────────

function renderNode(node: TiptapNode, index: number): React.ReactNode {
  const key = `${node.type}-${index}`

  // Text leaf
  if (node.type === "text") {
    return (
      <span key={key}>{renderMarks(node.text ?? "", node.marks)}</span>
    )
  }

  // Inline children helper
  const children = node.content?.map((child, i) => renderNode(child, i))

  switch (node.type) {
    case "paragraph":
      return (
        <p key={key} className="mb-4 leading-relaxed">
          {children}
        </p>
      )

    case "heading": {
      const level = (node.attrs?.level as number) ?? 2
      const Tag = `h${Math.min(Math.max(level, 2), 4)}` as
        | "h2"
        | "h3"
        | "h4"
      const sizeClass =
        level === 2
          ? "text-2xl font-bold"
          : level === 3
            ? "text-xl font-semibold"
            : "text-lg font-semibold"
      return (
        <Tag key={key} className={`mb-3 mt-8 ${sizeClass}`}>
          {children}
        </Tag>
      )
    }

    case "bulletList":
      return (
        <ul key={key} className="mb-4 list-disc space-y-1 pl-6">
          {children}
        </ul>
      )

    case "orderedList":
      return (
        <ol key={key} className="mb-4 list-decimal space-y-1 pl-6">
          {children}
        </ol>
      )

    case "listItem":
      return (
        <li key={key} className="leading-relaxed">
          {children}
        </li>
      )

    case "blockquote":
      return (
        <blockquote
          key={key}
          className="mb-4 border-l-4 border-primary/30 pl-4 italic text-muted-foreground"
        >
          {children}
        </blockquote>
      )

    case "horizontalRule":
      return <hr key={key} className="my-8 border-border" />

    case "image": {
      const src = (node.attrs?.src as string) ?? ""
      const alt = (node.attrs?.alt as string) ?? ""
      return (
        <figure key={key} className="my-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          {alt && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {alt}
            </figcaption>
          )}
        </figure>
      )
    }

    case "codeBlock": {
      const language = (node.attrs?.language as string) ?? ""
      const codeText = node.content
        ?.map((child) => child.text ?? "")
        .join("")
      return (
        <pre
          key={key}
          className="mb-4 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm"
          data-language={language || undefined}
        >
          <code>{codeText}</code>
        </pre>
      )
    }

    default:
      // Fallback: render children if present
      return children ? <div key={key}>{children}</div> : null
  }
}

// ── Main component ─────────────────────────────────────────────────

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content?.content) return null

  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      {content.content.map((node, index) => renderNode(node, index))}
    </div>
  )
}
