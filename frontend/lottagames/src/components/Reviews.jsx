import React, { useState } from "react";

export const Reviews = () => {
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleReviewSubmit = () => {
    if (reviewText.trim() === "") return;
    const newReview = { text: reviewText, date: new Date().toLocaleDateString() };
    setReviews([...reviews, newReview]);
    setReviewText("");
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">User Reviews</h2>
      <div className="space-y-2">
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded">
            <p>{review.text}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <textarea
          className="w-full px-3 py-2 border rounded"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleReviewSubmit}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

