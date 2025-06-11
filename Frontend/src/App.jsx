import CopyLink from "./components/CopyLink";

import Upload from './components/Upload'
import { useState } from 'react';

function App() {
  const [generatedLink, setGeneratedLink] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Title at the top */}
      <header className="w-full text-center py-6">
        <h1 className="text-4xl font-bold text-olive">ShareSafely+</h1>
      </header>

      {/* Centered Upload form below */}
      <main className="flex-grow flex items-center justify-center">
        {loading ? (
          <p className="text-orange animate-pulse text-lg">Uploading...</p>
        ) : generatedLink ? (
          <CopyLink link={generatedLink} onReset={() => setGeneratedLink(null)} />
        ) : (
          <Upload onSuccess={setGeneratedLink} setLoading={setLoading} />
        )
        }
      </main>
    </div>
  )
}

export default App
