import {useState, useRef} from "react";
import * as PropTypes from "prop-types";
import {Form} from "react-router-dom";


function CreationVideoGame() {
    return (
        <div>
            <Header></Header>
            <NavButtons></NavButtons>
            <CreationFrame></CreationFrame>
        </div>
    );
}

function Header() {
    return (
        <div>
            <div
                className=" flex flex-col items-center justify-center w-full h-52 bg-gray-100 dark:bg-gray-900 shadow-2xl">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-bold text-center text-gray-800 dark:text-white md:text-6xl">
                        Création de jeu</h1>
                    <p className="mt-2 text-center text-gray-600 dark:text-gray-400 md:text-lg">
                        Vous pouvez éditer votre jeu ici</p>
                </div>
            </div>
        </div>
    );
}

function InputVideoGame(props) {
    return (
        <div className="bg-gray-100 rounded m-2 p-2">
            <label htmlFor={props.name} className="block text-sm font-medium ml-2 text-gray-700">
                {props.name}
            </label>
            <div className="mt-1">
                <textarea
                    name={props.name}
                    id={props.name}
                    className="shadow-sm pl-1 focus:ring-indigo-500 focus:border-indigo-500 block w-4/5 ml-5 sm:text-sm border-gray-300 rounded-md"
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
}

function NavButtons() {
    return (
        <div className="flex flex-row justify-center w-full h-20 mt-20   ">
            <button onClick={goToMain}
                    className="hover:text-gray-400 dark:bg-gray-900 dark:text-white transition-all rounded bg-gray-200 text-xl p-2 font-light hover:shadow-2xl ">Retourner
                au menu de sélection
            </button>
        </div>
    );
}

function goToMain() {
    window.location.href = "/";
}

function CreationFrame() {

    const names = [
        "Nom du jeu",
        "Lien de l'image",
        "Description",
        "Genre",
        "Date de sortie",
        "Développeur",
        "Editeur",
        "Lien de la vidéo"
    ];
    const [videoGame, setVideoGame] = useState(
        {
            Name: "",
            ImageLink: "",
            Description: "",
            Genre: "",
            ReleaseDate: "",
            Developper: "",
            Publisher: "",
            VideoLink: ""
        }
    );

    const params = [
        "Name",
        "ImageLink",
        "Description",
        "Genre",
        "ReleaseDate",
        "Developper",
        "Publisher",
        "VideoLink"
    ];

    function handleInputChanged(param, value) {
        if (value)
            setVideoGame({...videoGame, [param]: value});
    }


    function handleValidation() {

        for (let i = 0; i < params.length; i++) {
            if (!videoGame[params[i]]) {
                alert("le champ " + params[i] + " doit être rempli")
                return
            }
        }
        console.log("on y va")
        fetch('http://localhost:3001/PostNewVideoGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(videoGame)
        }).then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
        })
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <div className="w-2/3 p-4 shadow-md ">
                <form onSubmit={(e) => e.preventDefault()}>
                    {names.map((x, index) =>
                        <InputVideoGame
                            name={x} number={index} onChange={(e) => handleInputChanged(params[index], e.target.value)}>
                        </InputVideoGame>)}
                    <button onClick={handleValidation}>
                        Valider
                    </button>
                </form>
            </div>
        </div>
    );

}

export default CreationVideoGame;