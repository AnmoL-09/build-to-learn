import { BangloreMap } from './components/banglore-map'
import './App.css'
import Markers from './components/markers'
import { ThemeToggle } from './components/theme-toggle'
import { ErrorBoundary } from './components/error-boundary'
import { useToast } from './hooks/use-toast'
import { ToastContainer } from './components/toast'

function App() {
  const { toasts, removeToast, showError, showSuccess } = useToast()

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full flex flex-col bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">
              Interactive Maps Application
            </h1>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
          <ErrorBoundary>
            <section>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Bangalore Map with Controls
              </h2>
              <BangloreMap onError={showError} onSuccess={showSuccess} />
            </section>
          </ErrorBoundary>
          <ErrorBoundary>
            <section>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Interactive Markers
              </h2>
              <Markers />
            </section>
          </ErrorBoundary>
        </main>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </ErrorBoundary>
  )
}

export default App
