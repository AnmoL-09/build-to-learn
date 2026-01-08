import { BangloreMap } from './components/banglore-map'
import './App.css'
import Markers from './components/markers'

function App() {
  return (
    <div className="h-screen w-screen flex flex-col gap-4 p-4 bg-gray-100">
      <h1>This is the interactive map application</h1>
      <BangloreMap />
      <h1>Markers</h1>
      <Markers/>
    </div>
  )
}

export default App
