import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export type ToastType = "error" | "success" | "info" | "warning"

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose: () => void
}

export function Toast({ message, type = "info", duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for fade out animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const typeStyles = {
    error: "bg-destructive text-destructive-foreground border-destructive",
    success: "bg-green-600 text-white border-green-600",
    info: "bg-blue-600 text-white border-blue-600",
    warning: "bg-yellow-600 text-white border-yellow-600",
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 min-w-[300px] max-w-md rounded-lg border p-4 shadow-lg transition-all duration-300",
        typeStyles[type],
        isVisible ? "animate-in slide-in-from-bottom-5" : "animate-out slide-out-to-bottom-5"
      )}
      role="alert"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type?: ToastType }>
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </>
  )
}

