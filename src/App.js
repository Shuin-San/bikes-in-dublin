// Libs
import { Route, Routes } from 'react-router-dom'

// Components
import Layout from './components/layout/Layout'
import Stations from './components/stations/Stations'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Stations />} />
        <Route path="*" element={<>Woops, nothing found here !</>} />
      </Route>
    </Routes>
  )
}

export default App
