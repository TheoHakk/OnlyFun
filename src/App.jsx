import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"


import MainPage from "./routes/videogame/MainPage";
import Creation from "./routes/videogame/CreationVideoGame";
import Presentation from "./routes/videogame/PresentationVideoGame";
import Error from "./routes/error/Error";
import Connection from "./routes/connection/Connection";
import useToken from "./routes/token/useToken";
import {createContext, useContext, useEffect, useState} from "react";

const CurrentUserContext = createContext(null);

function InnerApp() {
    const [user, setUser] = useState(null);
    const {token, setToken} = useToken();
    let proofOfWork = null;


    useEffect(() => {
        fetch(`http://localhost:3001/Verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: token})
        })
            .then(data => {
                if (data.status === 404) {
                    console.log('token not valid');
                    setToken("null");
                } else {
                    let User = null;
                    data.json().then(data => {
                        console.log(data);
                        User = {
                            username: data[0].Username,
                            id: data[0].Id
                        }
                        console.log("User");
                        console.log(User);
                        setUser(User);
                        proofOfWork = "yep";
                    })
                }
            });
    }, [proofOfWork]);


    if (!token)
        return <Connection setToken={setToken}/>

    const router = createBrowserRouter([
        {
            path: "/",
            element:
                <CurrentUserContext.Provider value={{user}}>
                    <MainPage></MainPage>
                </CurrentUserContext.Provider>,
            errorElement: <Error></Error>
        },
        {
            path: "/presentation/:id",
            element:
                <CurrentUserContext.Provider value={{user}}>
                    <Presentation></Presentation>
                </CurrentUserContext.Provider>,
            errorElement: <Error></Error>
        },
        {
            path: "/creation",
            element:
                <Creation></Creation>,
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

export function useCurrentUserContext() {
    return useContext(CurrentUserContext);
}
