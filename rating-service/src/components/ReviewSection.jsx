import React, { useState, useEffect } from 'react';
import './ReviewSection.css';

const mockReviews = [
  {
    id: 1,
    user: 'Roronoa Zoro',
    date: 'October 6, 2024',
    rating: 8.4,
    comment: "A visual masterpiece that perfectly captures the spirit of gaming culture. Spielberg's direction brings the virtual world to life in spectacular fashion.",
    likes: 54,
    replies: 63
  },
  {
    id: 2,
    user: 'Senku',
    date: 'March 15, 2024',
    rating: 7.9,
    comment: "A visual masterpiece that perfectly captures the spirit of gaming culture. Spielberg's direction brings the virtual world to life in spectacular fashion.",
    likes: 23,
    replies: 43
  },
  {
    id: 3,
    user: 'Monkey D. Luffy',
    date: 'March 11, 2024',
    rating: 9.2,
    comment: "A visual masterpiece that perfectly captures the spirit of gaming culture. Spielberg's direction brings the virtual world to life in spectacular fashion.",
    likes: 423,
    replies: 476
  }
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: '', comment: '' });

  useEffect(() => {
    setReviews(mockReviews);
  }, []);

  const handleAddReview = () => {
    if (!newReview.comment || !newReview.rating) return;

    const nueva = {
      id: Date.now(),
      user: 'Usuario actual',
      date: new Date().toLocaleDateString(),
      rating: parseFloat(newReview.rating),
      comment: newReview.comment,
      likes: 0,
      replies: 0
    };

    setReviews([nueva, ...reviews]);
    setNewReview({ rating: '', comment: '' });
  };

  return (
    <div className="reviews-section">
      <h2 className="title">User Reviews</h2>

      <div className="review-form">
        <div className="user-info">
          <img src="https://i.pravatar.cc/50" alt="user" className="user-avatar" />
          <div className="user-meta">
            <p>Add Your Review</p>
            <input
              type="number"
              placeholder="Rating (1-10)"
              className="rating-input"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            />
          </div>
        </div>
        <textarea
          placeholder="Write your review..."
          className="comment-input"
          rows={3}
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        />
        <button className="submit-btn" onClick={handleAddReview}>Post Review</button>
      </div>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div>
                <p className="review-user">{review.user}</p>
                <p className="review-date">{review.date}</p>
              </div>
              <p className="review-rating">⭐ {review.rating.toFixed(1)} / 10</p>
            </div>
            <p className="review-comment">{review.comment}</p>
            <div className="review-footer">
              👍 {review.likes} &nbsp;&nbsp; 💬 {review.replies}
            </div>
          </div>
        ))
      ) : (
        <p className="no-reviews">No reviews yet. Be the first!</p>
      )}
    </div>
  );
} 