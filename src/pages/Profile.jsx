import './Profile.css';
import MovieCard from '../components/MovieCard';

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="https://ui-avatars.com/api/?name=Alex+Johnson&background=1a1a1a&color=fff&size=200" alt="Alex Johnson" />
        </div>
        <div className="profile-info">
          <span className="premium-badge">PREMIUM MEMBER</span>
          <h1 className="profile-name">Alex Johnson</h1>
          <div className="profile-meta">
            <span>Joined Jan 2024</span>
            <span className="dot-separator">•</span>
            <span>Los Angeles, CA</span>
          </div>
        </div>
      </div>

      <div className="profile-dashboard">
        <section className="analytics-panel glass-panel">
          <h3 className="panel-title">Viewing Analytics</h3>
          <div className="stat-highlight">
            <h2>120<span className="stat-unit">Hours</span></h2>
            <p className="stat-trend">+12% from last month</p>
          </div>
          
          <div className="favorite-genres">
            <h4 className="sub-title">Top Genres</h4>
            <div className="genre-bar">
              <span>Sci-Fi / Thriller</span>
              <div className="bar"><div className="fill" style={{width: '65%'}}></div></div>
            </div>
            <div className="genre-bar">
              <span>Action / Crime</span>
              <div className="bar"><div className="fill" style={{width: '45%'}}></div></div>
            </div>
            <div className="genre-bar">
              <span>Documentary</span>
              <div className="bar"><div className="fill" style={{width: '20%'}}></div></div>
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-label">Total Views</span>
              <span className="stat-value">342</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Days Active</span>
              <span className="stat-value">14 Days</span>
            </div>
          </div>
        </section>

        <section className="my-list-section">
          <div className="my-list-header">
            <h3 className="panel-title">My List</h3>
            <div className="list-filters">
              <span className="filter active">ALL</span>
              <span className="filter">MOVIES</span>
              <span className="filter">TV SHOWS</span>
            </div>
          </div>
          <div className="my-list-grid">
            <MovieCard title="Neon Horizon" subtitle="Sci-Fi / Action" imgUrl="/neon.png" />
            <MovieCard title="The Blood Pact" subtitle="Crime / Thriller" imgUrl="/character.png" />
            <MovieCard title="Active Theory" subtitle="Documentary" imgUrl="/action.png" />
            <div className="movie-card add-new-card">
              <div className="add-icon">+</div>
              <p>Explore More</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
