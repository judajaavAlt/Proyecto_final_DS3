import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReviewSection.css'; // Importamos los estilos

// Componente modal de login
const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;
  
  return (
    <div className="login-modal-overlay">
      <div className="login-modal">
        <div className="login-modal-content">
          <h3>Inicia sesión</h3>
          <p>Por favor inicia sesión para agregar una reseña</p>
          <div className="login-modal-buttons">
            <button 
              className="login-btn"
              onClick={() => window.location.href = '/login'}
            >
              Ir al login
            </button>
            <button 
              className="cancel-btn"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utilidad para generar avatar Dicebear
function getAvatarUrl(author) {
  if (!author) return 'https://api.dicebear.com/6.x/bottts/svg?seed=anonimo';
  const seed = author.replace(/\s+/g, '');
  return `https://api.dicebear.com/6.x/bottts/svg?seed=${encodeURIComponent(seed)}`;
}

// Información del usuario actual (en una app real, vendría de la autenticación)
const currentUser = {
    name: 'Son Goku',
    avatar: getAvatarUrl('Son Goku')
};

// Componente para una estrella individual, usando entidades HTML
const Star = ({ filled, interactive, onClick }) => (
  <span
    className={`star ${filled ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
    onClick={onClick}
    dangerouslySetInnerHTML={{ __html: '★' }}
  />
);

// Componente para la calificación con 5 estrellas
const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
  const normalizedRating = rating/2;
  return (
    <div className={`star-rating ${!readOnly ? 'interactive' : ''}`}>
      {[...Array(5)].map((_, i) => {
        // Para estrellas interactivas, invertir el índice debido a flex-direction: row-reverse
        const starIndex = !readOnly ? 5 - i : i;
        const isFilled = !readOnly ? starIndex <= rating : i < rating;
        
        return (
          <Star
            key={i}
            filled={isFilled}
            interactive={!readOnly}
            onClick={() => !readOnly && onRatingChange(starIndex)}
          />
        );
      })}
    </div>
  );
};

// Componente para mostrar el puntaje promedio resumido
const AverageRating = ({ reviews }) => {
  if (!reviews.length) return null;
  const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  return (
    <div className="average-rating-summary">
      <div className="average-rating-stars">
        <StarRating rating={Math.round(avg)} readOnly={true} />
      </div>
      <div className="average-rating-info">
        <span className="average-rating-score">{avg.toFixed(1)} / 5.0</span>
        <span className="average-rating-count">({reviews.length} reseñas)</span>
      </div>
    </div>
  );
};

// Formulario para añadir una nueva reseña
const AddReviewForm = ({ onAddReview }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || rating === 0) {
      alert('Por favor, escribe una reseña y selecciona una calificación.');
      return;
    }
    onAddReview({ text, rating });
    setText('');
    setRating(0);
  };

  return (
    <div className="add-review-container">
      <img src={currentUser.avatar} alt="Tu avatar" className="avatar" />
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-content">
           <p className="add-review-title">Add Your Review</p>
           <StarRating rating={rating} onRatingChange={setRating} />
           <textarea
             value={text}
             onChange={(e) => setText(e.target.value)}
             placeholder="Share your thoughts..."
             className="review-textarea"
           />
        </div>
        {/* Este botón podría estar fuera del form-content si se quiere un layout distinto */}
        <button type="submit" className="submit-review-btn">Post Review</button>
      </form>
    </div>
  );
};

// Componente para mostrar una reseña individual en la lista
const ReviewItem = ({ review }) => {
  const altText = review.author + "'s avatar";

  return (
    <div className="review-item">
      <img src={getAvatarUrl(review.author)} alt={altText} className="avatar" />
      <div className="review-content">
        <div className="review-header">
          <div>
            <p className="review-author">{review.author}</p>
            <p className="review-date">{review.date}</p>
          </div>
          <div className="review-rating">
            <StarRating rating={review.rating} readOnly={true} />
            <span className="rating-score">{review.rating.toFixed(1)} / 5.0</span>
          </div>
        </div>
        <p className="review-text">{review.text}</p>
      </div>
    </div>
  );
};

// Componente principal que une todo
function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { movieId } = useParams();

  const API_URL = 'http://localhost:3001';

  useEffect(() => {
    if (!movieId) return;
    fetch(`${API_URL}/reviews/${movieId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error al cargar reseñas:", err));
  }, [API_URL, movieId]);

  const handleAddReview = ({ text, rating }) => {
    const newReview = {
      comment: text,
      rating,
      movieId: Number(movieId), // Usar el movieId de la URL
      // Removemos author y avatar hardcodeados para que vengan del backend
    };

    fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Importante: incluye las cookies
      body: JSON.stringify(newReview),
    })
    .then(res => {
      if (res.status === 401) {
        return res.json().then(data => {
          if (data.requiresLogin) {
            // Mostrar modal/aviso para iniciar sesión
            setShowLoginModal(true);
            throw new Error('Requires login');
          }
          throw new Error(data.message || 'Error de autenticación');
        });
      }
      return res.json();
    })
    .then(createdReview => {
      // Usar los datos que vienen del backend (incluyendo author y avatar del usuario autenticado)
      const fullReview = {
        ...createdReview,
        // Si el backend no incluye author/avatar, usar datos por defecto
        author: createdReview.author || 'Usuario',
        date: new Date().toLocaleDateString(),
      };
      setReviews([fullReview, ...reviews]);
    })
    .catch(err => {
      if (err.message !== 'Requires login') {
        console.error('Error al enviar la reseña:', err);
        alert('Error al enviar la reseña: ' + err.message);
      }
    });
  };


  return (
    <div className="reviews-section-container">
      <div className="reviews-section-header">
        <h2>User Reviews</h2>
        <a href="#" className="view-all-link">View All</a>
      </div>
      <AverageRating reviews={reviews} />
      <AddReviewForm onAddReview={handleAddReview} />
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map(review => <ReviewItem key={review.id} review={review} />)
        ) : (
          <p className="no-reviews-message">No reviews yet. Be the first to share your thoughts!</p>
        )}
      </div>
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => setShowLoginModal(false)}
      />
    </div>
  );
}



export default ReviewSection;