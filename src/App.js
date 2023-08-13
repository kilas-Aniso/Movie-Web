import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import GetSearch from './components/GetSearch';
import MovieDetails from './components/MovieDetails';
import MovieGenre from './components/MovieGenres';
import MovieCarousel from './components/Slider';

function App() {
  return (
    <div>
      <BrowserRouter className="main">
        <div>
          <Navbar />
          <MovieCarousel />
          <MovieGenre /> 
          <Routes>
            <Route path="/search" element={<GetSearch />} />
            <Route path="/movie/:movie_id" element={<MovieDetails />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
