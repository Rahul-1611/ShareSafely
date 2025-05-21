import Upload from './components/Upload'

function App() {

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Title at the top */}
      <header className="w-full text-center py-6">
        <h1 className="text-4xl font-bold text-olive">ShareSafely+</h1>
      </header>

      {/* Centered Upload form below */}
      <main className="flex-grow flex items-center justify-center">
        <Upload />
      </main>
    </div>
  )
}

export default App
