import '../components/Navbar.css'; // Just ensuring styles are bundled if needed
import './Home.css';
import Button from '../components/Button';
import MovieCard from '../components/MovieCard';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Original Series</span>
          <h1 className="hero-title">Neon<br/>Horizon</h1>
          <p className="hero-description">
            A squad of renegades must navigate the dark corners of a cyberpunk universe, 
            hunting for an artifact that could change the fate of humans and AI.
          </p>
          <div className="hero-actions">
            <Button variant="primary">▶ Watch Now</Button>
            <Button variant="ghost">+ My List</Button>
          </div>
        </div>
      </section>

      <section className="carousel-section">
        <h3 className="section-title">Trending Now</h3>
        <div className="movie-carousel">
          <MovieCard title="The Last Outpost" subtitle="Action / Sci-Fi" imgUrl="/action.png" />
          <MovieCard title="Neon City" subtitle="Thriller / Mystery" imgUrl="/neon.png" />
          <MovieCard title="Dark Protocol" subtitle="Cyberpunk / Drama" imgUrl="/character.png" />
          <MovieCard title="Director's Cut" subtitle="Suspense" imgUrl="/neon.png" />
          <MovieCard title="Chrono Protocol" subtitle="Sci-Fi" imgUrl="/action.png" />
        </div>
      </section>
    </div>
  );
};

export default Home;
