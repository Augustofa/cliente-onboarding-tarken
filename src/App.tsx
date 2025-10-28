import { Route, Routes } from 'react-router-dom'
import './App.css'
import MovieSearchPage from './pages/MovieSearchPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieSearchPage/>} />
    </Routes>
  )
}

export default App
