import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Library } from "./pages/LibraryPage";
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
                path: "home",
                element:<HomePage/>,
            },
            {
                path:"library",
                element: <Library />
            }
        ],
    },
]);