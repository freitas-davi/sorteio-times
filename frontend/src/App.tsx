import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Home from './pages/Home'
import Loading from './pages/Loading'
import Resultado from './pages/Resultado'
import type {SorteioResponse} from './types'

export default function App() {
  const resultadoRef = useRef<SorteioResponse | null>(null)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<Loading resultadoRef={resultadoRef} />} />
        <Route path="/resultado" element={<Resultado resultadoRef={resultadoRef} />} />
      </Routes>
  )
}