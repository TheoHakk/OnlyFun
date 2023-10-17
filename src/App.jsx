import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"


import MainPage from "./routes/MainPage";
import Presentation from "./routes/PresentationVideoGame";
import Creation from "./routes/CreationVideoGame";



function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage></MainPage>,
            errorElement : <div>404</div>
        },
        {
            path: "/presentation",
            element: <Presentation></Presentation>,
            errorElement : <div>404</div>
        },
        {
            path: "/creation",
            element: <Creation></Creation>,
            errorElement : <div>404</div>
        }
    ]);


    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );

}


export default App;
