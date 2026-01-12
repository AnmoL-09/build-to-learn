import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface MapErrorProps {
  message?: string
  onRetry?: () => void
}

export function MapError({ message, onRetry }: MapErrorProps) {
  return (
    <Card className="h-full flex items-center justify-center">
      <CardContent className="text-center space-y-4 py-8">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Failed to load map
          </h3>
          <p className="text-sm text-muted-foreground">
            {message || "Unable to initialize the map. Please check your connection and try again."}
          </p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm text-primary hover:underline"
          >
            Retry
          </button>
        )}
      </CardContent>
    </Card>
  )
}

