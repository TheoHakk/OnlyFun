import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"


import MainPage from "./routes/MainPage";
import Creation from "./routes/CreationVideoGame";
import Presentation from "./routes/PresentationVideoGame";
import Error from "./routes/Error";


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage></MainPage>,
            errorElement : <Error></Error>
        },
        {
          path: "/presentation/:id",
            element: <Presentation></Presentation>,
            errorElement : <Error></Error>
        },
        {
            path: "/creation",
            element: <Creation></Creation>,
            errorElement :<Error></Error>
        }
    ]);


    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );

}


export default App;
