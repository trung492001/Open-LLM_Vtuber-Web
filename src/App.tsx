import {useState} from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen w-screen bg-gray-400">
      <div className="p-2 flex gap-10 items-start">
        <div className="w-24 text-center bg-white rounded-lg hover:bg-gray-100 cursor-pointer">
          <h1>Connected</h1>
        </div>

      </div>
    </div>
  )
}

export default App
