import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// 페이지 컴포넌트
import HomePage from "./pages/HomePage"
import MovieDetailPage from "./pages/MovieDetailPage"
import ActorMoviesPage from "./pages/ActorMoviesPage"
import SearchPage from "./pages/SearchPage"

// 공통 컴포넌트
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
            <Route path="/actors/:id/movies" element={<ActorMoviesPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>
        <Footer />
      </div>    
    </BrowserRouter>
  )
}

export default App