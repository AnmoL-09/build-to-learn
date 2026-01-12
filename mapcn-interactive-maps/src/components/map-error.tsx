import { AlertCircle, RefreshCw } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

interface MapErrorProps {
  message?: string
  onRetry?: () => void
  title?: string
}

export function MapError({ message, onRetry, title = "Failed to load map" }: MapErrorProps) {
  return (
    <Card className="h-full flex items-center justify-center border-destructive/50">
      <CardContent className="text-center space-y-4 py-8 px-6">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            {message || "Unable to initialize the map. Please check your connection and try again."}
          </p>
        </div>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

