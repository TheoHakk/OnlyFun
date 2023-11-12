import '../../index.css';
import '../../output.css';

import {useState, useEffect, createContext} from "react";
import {useParams} from "react-router-dom";
import ContextCommentary from "../commentaries/ContextCommentary";
const CurrentVideoGameContext = createContext(null);



function PresentationVideoGame() {
    const {id} = useParams();
    let [videoGame, setVideoGame] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:3001/VideoGame?id=${id}`),
        ])
            .then(([resVideoGame]) =>
                Promise.all([resVideoGame.json()])
            )
            .then(([fetchedVideoGame]) => {
                setVideoGame(fetchedVideoGame[0]);
            })
            .catch(error => {
                window.location.href = "/404";
            });
    }, [id]);

    return (
        <div>
            {videoGame != null ? (
                <CurrentVideoGameContext.Provider value={{videoGame}}>
                    <div>
                        <GamePictureHeader source={videoGame.ImageLink} videoGameName={videoGame.Name}/>
                        <NavButtons></NavButtons>
                        <GameDescriptionInformations videoGame={videoGame}/>
                        <Video source={videoGame.VideoLink}/>
                        <ContextCommentary/>
                        <Bottom/>
                    </div>
                </CurrentVideoGameContext.Provider>
            ) : (
                <p>Chargement en cours...</p>
            )}
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


function GamePictureHeader(props) {
    return (
        <div>
            <div className="relative w-full mx-auto">
                <img src={props.source} className="h-80 w-full object-cover shadow-2xl" alt={props.videoGameName}/>

                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute inset-0 flex justify-center items-center">

                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-white uppercase lg:text-7xl">{props.videoGameName}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}


function goToMain() {
    window.location.href = "/";
}

function GameDescriptionInformations(props) {
    return (
        <div>
            <div className="flex flex-row items-center justify-center m-40 shadow-2xl p-6 rounded ">
                <GameDescription description={props.videoGame.Description}/>
                <GameInformations videoGame={props.videoGame}/>
            </div>
        </div>
    );
}

function GameDescription(props) {
    return (
        <div>
            <h1 className="text-3xl font-bold text-justify uppercase ">Description</h1>
            <p> {props.description}</p>
        </div>
    );
}

function GameInformations(props) {
    return (
        <div>
            <div className="flex-col p-6 rounded border-solid border-2 border-amber-600 ml-10 ">
                <h1 className="text-3xl font-bold uppercase">Informations</h1>
                <Information titre={"Genre"} detail={props.videoGame.Genre}/>
                <Information titre={"Date"} detail={props.videoGame.ReleaseDate}/>
                <Information titre={"Développeur"} detail={props.videoGame.Developper}/>
                <Information titre={"Publieur"} detail={props.videoGame.Publisher}/>
            </div>
        </div>
    );
}

function Information(props) {
    return (
        <div>
            <p className="font-normal">{props.titre} : {props.detail}</p>
        </div>
    );
}

function Video(props) {
    return (
        <div className="flex flex-row items-center justify-center m-40 shadow-2xl p-24 rounded border-solid">
            <iframe className="shadow-2xl rounded" width="750" height="450" src={props.source}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
        </div>
    );
}

function Bottom() {
    return (
        <div className="flex flex-row items-center justify-center m-40"></div>
    );
}

export default PresentationVideoGame;


