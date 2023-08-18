import { useContext } from "react";
import { userContext } from "../App";

export const HomePage = () => {
  const { user } = useContext(userContext);

  return (
    <div>
      <h1>{user ? user.name : null}</h1>
    </div>
  );
};
