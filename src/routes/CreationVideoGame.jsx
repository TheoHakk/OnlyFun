import {useState} from "react";


export default function CreationVideoGame() {
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
    const placeHolder = props.dataName.replace("-", " ");
    const name = props.name.replace("-", "");

    return (
        <div className="bg-gray-100 rounded m-2 p-2">
            <label className="block text-sm font-medium ml-2 text-gray-700">
                {placeHolder}
            </label>
            <div className="mt-1">
                <textarea
                    name={name}
                    className="shadow-sm pl-1 focus:ring-indigo-500 focus:border-indigo-500 block w-4/5 ml-5 sm:text-sm border-gray-300 rounded-md"
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
    const params = [
        "Name",
        "Image-Link",
        "Description",
        "Genre",
        "Release-Date",
        "Developper",
        "Publisher",
        "Video-Link"
    ];


    const paramsForObject = params.map(param => param.replace('-',''))
    const initialVideoGame = Object.fromEntries(paramsForObject.map(param => [param, ""]));
    const [videoGame, setVideoGame] = useState(initialVideoGame);

    const handleValidation = (data) => {
        const updatedVideoGame = {};
        paramsForObject.forEach(param => {
            updatedVideoGame[param] = data.get(param);
        });
        setVideoGame(updatedVideoGame);

        fetch('http://localhost:3001/NewVideoGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(videoGame)
        }).then((response) => {
            if (!response.ok)
                throw new Error("HTTP error " + response.status);
        })
    };

    function submitForm(e) {
        const data = new FormData(e.target)
        handleValidation(data)
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <div className="w-2/3 p-4 shadow-md ">
                <form onSubmit={submitForm}>
                    {params.map((param) =>
                        <InputVideoGame
                            dataName={param} name={param}>
                        </InputVideoGame>)}
                    <button>
                        Valider
                    </button>
                </form>
            </div>
        </div>
    );
}
