import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utilities.jsx";

export const Reviews = () => {
  const { gameId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Updates the review
      try {
        const review_response = await api.get(`v1/reviews/${gameId}/`);
        setReviews(review_response.data); // Assuming the API response is directly the array of review objects
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [gameId]);

  return (
    <div className="mt-4"> {/* Center the content */}
      <h2 className="text-xl font-semibold mb-2 text-center">Reviews</h2>
      <div className="mt-4 text-center"> {/* Use mx-auto to center the reviews */}
        {reviews.map((review, index) => (
          <div className="text-center m-2 rounded-lg bg-slate-600 max-w-md" key={index}>
            <h2>User Name</h2>
            <p className=" text-xs"> {review.review_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
