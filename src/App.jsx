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
import Connection from "./routes/Connection";
import useToken from "./routes/useToken";

function InnerApp() {
    const {token, setToken} = useToken();
    console.log("token : " + token);

    fetch(`http://localhost:3001/Verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token: token})
    })
        .then(data => {
            if (data.status === 200) {
                console.log('token valid');
            } else {
                console.log('token not valid');
                setToken("null");
            }
        });


    if (!token)
        return <Connection setToken={setToken}/>

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainPage></MainPage>,
            errorElement: <Error></Error>
        },
        {
            path: "/presentation/:id",
            element: <Presentation></Presentation>,
            errorElement: <Error></Error>
        },
        {
            path: "/creation",
            element: <Creation></Creation>,
            errorElement: <Error></Error>
        },
        {
            path: "/404",
            element: <Error></Error>
        }
    ]);
    return (<RouterProvider router={router}/>)
}

export default function App() {
    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <InnerApp/>
        </React.StrictMode>
    );
}


