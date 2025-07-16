import React, { useState, useEffect } from 'react';
import './ReviewSection.css'; // Importamos los estilos


const initialReviews = [
  {
    id: 3,
    author: 'Monkey D. Luffy',
    avatar: 'https://i.pinimg.com/736x/1e/40/3e/1e403e673934f4e71b2699d799797587.jpg',
    date: 'March 15, 2024',
    text: "A visual masterpiece that perfectly captures the spirit of gaming culture. Spielberg's direction brings the virtual world to life in spectacular fashion.",
    rating: 4,
  },
  {
    id: 2,
    author: 'Senku',
    avatar: 'https://i.pinimg.com/736x/e2/21/44/e2214434a938d277748529e87a2c0f65.jpg',
    date: 'March 15, 2024',
    text: "A visual masterpiece that perfectly captures the spirit of gaming culture. Spielberg's direction brings the virtual world to life in spectacular fashion.",
    rating: 5,
  },
  {
    id: 1,
    author: 'Roronoa Zoro',
    avatar: 'https://i.pinimg.com/736x/a2/34/a8/a234a81748bff8c12b87b7ac892d1911.jpg',
    date: 'October 5, 2024',
    text: "A visual masterpiece that perfectly captures the spirit of gaming culture. Spielberg's direction brings the virtual world to life in spectacular fashion.",
    rating: 3,
  },
];

// Información del usuario actual (en una app real, vendría de la autenticación)
const currentUser = {
    name: 'Son Goku',
    avatar: 'https://i.pinimg.com/736x/8a/a5/63/8aa56370a2b535b18413642c22268487.jpg'
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
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          filled={i < rating}
          interactive={!readOnly}
          onClick={() => !readOnly && onRatingChange(i + 1)}
        />
      ))}
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
      <img src={review.avatar} alt={altText} className="avatar" />
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

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
  fetch(`${API_URL}/reviews`)
    .then((res) => res.json())
    .then((data) => setReviews(data))
    .catch((err) => console.error("Error al cargar reseñas:", err));
}, []);


  const handleAddReview = ({ text, rating }) => {
  const newReview = {
    user: {
      name: currentUser.name,
      avatar: currentUser.avatar
    },
    comment: text,
    rating,
  };

  fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReview),
  })
    .then(res => res.json())
    .then(createdReview => {
      setReviews([createdReview, ...reviews]);
    })
    .catch(err => console.error('Error al enviar la reseña:', err));
  };


  return (
    <div className="reviews-section-container">
      <div className="reviews-section-header">
        <h2>User Reviews</h2>
        <a href="#" className="view-all-link">View All</a>
      </div>
      
      <AddReviewForm onAddReview={handleAddReview} />
      
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map(review => <ReviewItem key={review.id} review={review} />)
        ) : (
          <p className="no-reviews-message">No reviews yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
}

export default ReviewSection;