import { useParams, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState } from "react";
import { api } from "../utilities.jsx"
import { userContext } from "../App";


export const AddReview = () => {
    const [isGameReviewed, setIsGameReviewed] = useState(null);



    useEffect(() => {})

    return (
        <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2 flex justify-center">Write a Review</h2>
      <div className="mt-4 flex justify-center">
        <textarea
          className="w-full max-w-md px-3 py-2 border rounded text-black text-sm"
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>
    </div>
    )
}
