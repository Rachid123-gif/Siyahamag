"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Ban, RotateCcw, Loader2 } from "lucide-react"

interface UserActionButtonProps {
  userId: string
  isSuspended: boolean
}

export function UserActionButton({ userId, isSuspended }: UserActionButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleAction() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isSuspended ? "REACTIVATE" : "SUSPEND",
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Une erreur est survenue.")
        return
      }

      toast.success(data.message)
      router.refresh()
    } catch {
      toast.error("Une erreur est survenue. Veuillez reessayer.")
    } finally {
      setLoading(false)
    }
  }

  if (isSuspended) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleAction}
        disabled={loading}
        className="gap-1.5 text-[#059669] hover:text-[#059669]"
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <RotateCcw className="h-3.5 w-3.5" />
        )}
        Reactiver
      </Button>
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            disabled={loading}
            className="gap-1.5 text-destructive hover:text-destructive"
          />
        }
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Ban className="h-3.5 w-3.5" />
        )}
        Suspendre
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer la suspension</AlertDialogTitle>
          <AlertDialogDescription>
            Etes-vous sur de vouloir suspendre cet utilisateur ? Il ne pourra
            plus acceder a son compte.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAction}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Suspendre
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
