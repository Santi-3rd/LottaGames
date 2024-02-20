import { createBrowserRouter } from "react-router-dom";
import { ProfilePage } from "./pages/ProfilePage"
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Library } from "./pages/LibraryPage";
import { Games } from "./pages/GamePage";
import { AddGame } from "./pages/AddGamePage";
import { Review } from "./pages/ReviewPage";
import App from "./App";


export const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
        children: [
            {
                index: true,
                element: <RegisterPage />,
            },
            {
                path: "login",
                element: <LoginPage/>,
            },
            {
                path: "profile",
                element:<ProfilePage/>,
            },
            {
                path:"library",
                element: <Library />,
            },
            {
                path: "games/:gameId",
                element: <Games />,
            },
            {
                path: "addgame/:gameId",
                element: <AddGame />,
            },
            {
                path: "review/:gameId",
                element: <Review />,
            },
        ],
    },
]);