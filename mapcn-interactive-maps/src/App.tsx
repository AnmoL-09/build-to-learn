import { BangloreMap } from './components/banglore-map'
import './App.css'
import Markers from './components/markers'
import { ThemeToggle } from './components/theme-toggle'
import { ErrorBoundary } from './components/error-boundary'
import { useToast } from './hooks/use-toast'
import { ToastContainer } from './components/toast'
import { MapPin, Layers, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'

function App() {
  const { toasts, removeToast, showError, showSuccess } = useToast()

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full flex flex-col bg-background">
        <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Interactive Maps
                </h1>
                <p className="text-xs text-muted-foreground">
                  Explore Bangalore with interactive features
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>
        
        <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Interactive Map Experience</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Discover Bangalore
            </h2>
            <p className="text-muted-foreground text-lg">
              Navigate through the city with interactive maps, markers, and real-time location features
            </p>
          </div>

          <ErrorBoundary>
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Interactive Map</CardTitle>
                    <CardDescription>
                      Full-featured map with zoom, compass, fullscreen, and location controls
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <BangloreMap onError={showError} onSuccess={showSuccess} />
              </CardContent>
            </Card>
          </ErrorBoundary>

          <ErrorBoundary>
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Location Markers</CardTitle>
                    <CardDescription>
                      Explore popular landmarks and locations with interactive popups and tooltips
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Markers />
              </CardContent>
            </Card>
          </ErrorBoundary>
        </main>

        <footer className="border-t bg-card mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground text-center md:text-left">
                <p className="font-medium text-foreground mb-1">Interactive Maps Application</p>
                <p>Built with React, TypeScript, and MapLibre GL</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>© 2024</span>
                <span>•</span>
                <span>MapCN</span>
              </div>
            </div>
          </div>
        </footer>

        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </ErrorBoundary>
  )
}

export default App
