import { Route, Routes } from 'react-router-dom'
import './App.css'
import MovieSearchPage from './pages/MovieSearchPage'
import MovieLibraryPage from './pages/MovieLibraryPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieSearchPage/>} />
      <Route path="/my-library" element={<MovieLibraryPage/>} />
    </Routes>
  )
}

export default App
