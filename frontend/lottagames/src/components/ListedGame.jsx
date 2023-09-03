import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

export const ListedGame = ({ game }) => {
  const navigate = useNavigate();
  const { id, cover, name } = game;


  return (
    <div
      className="flex p-2 hover:shadow-black hover:shadow-lg rounded-md transition duration-300 bg-slate-600"
      onClick={() => navigate(`/games/${id}`)} 
    >
      {cover && (
        <div>
          <img
            src={`https:${cover.url}`}
            alt={`Cover for ${name}`}
          />
        </div>
      )}
      <div className="flex flex-col justify-between ml-2">
        <h3 className="text-xl">{name}</h3>
      </div>
    </div>
  );
}
