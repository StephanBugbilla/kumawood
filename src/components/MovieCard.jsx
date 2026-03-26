import './MovieCard.css';

const MovieCard = ({ title, imgUrl, subtitle, isNeon = false }) => {
  return (
    <div className={`movie-card ${isNeon ? 'neon-glow' : ''}`}>
      <div className="movie-image-container">
        {imgUrl ? (
          <img src={imgUrl} alt={title} className="movie-image" />
        ) : (
          <div className="movie-placeholder"></div>
        )}
        <div className="movie-overlay">
          <div className="play-icon">▶</div>
        </div>
      </div>
      <div className="movie-info">
        <h4 className="movie-title">{title}</h4>
        {subtitle && <p className="movie-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default MovieCard;
