import { redirect } from "next/navigation"
import { getAuthenticatedAdmin } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) redirect("/connexion")

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-muted/30 p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
