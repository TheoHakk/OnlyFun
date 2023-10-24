import '../App.css';
import {useEffect, useState} from "react";


function MainPage() {
    let [videoGames, setVideoGames] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:3001/GetAllVideoGames`),
        ])
            .then(([resVideoGames]) =>
                Promise.all([resVideoGames.json()])
            )
            .then(([fetchedVideoGames]) => {
                setVideoGames(fetchedVideoGames);
            });
    }, []);

    return (
        <div>
            {!!videoGames ? (
                <div>
                    <Header></Header>
                    <NavButtons></NavButtons>
                    <VideoGameCards videoGames={videoGames}></VideoGameCards>
                </div>
            ) : (
                <p>Chargement en cours...</p>
            )}
        </div>
    );
}
function NavButtons() {
    return (
        <div className="flex flex-row justify-center w-full h-20 mb-10 ">
            <button onClick={goToCreation} className="hover:text-gray-400 dark:bg-gray-900 dark:text-white rounded bg-gray-200 text-xl p-2 font-light transition-all hover:shadow-2xl">Créer une nouvelle publication</button>
        </div>
    );
}

function VideoGameCards(props) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full overflow-x-auto  ">
            <div className="flex flex-wrap justify-center w-full max-w-6xl">
                {props.videoGames.map((x) =>
                    <VideoGameCard source={x.ImageLink} description={x.Description} id={x.ID} videoGameName={x.Name}/>)}
            </div>
        </div>
    );
}

function Header() {
    return (
        <div>
            <div className="mb-10 flex flex-col items-center justify-center w-full h-52 bg-gray-100 dark:bg-gray-900 shadow-2xl">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-bold text-center text-gray-800 dark:text-white md:text-6xl">
                        Welcome to OnlyFun</h1>
                    <p className="mt-2 text-center text-gray-600 dark:text-gray-400 md:text-lg">
                        The best place to find the best games</p>
                </div>
            </div>
            <button onClick={goToCreation} className="rounded-full w-12 h-12 "></button>
        </div>
    );
}

function goToCreation() {
    window.location.href = "/creation";
}

function VideoGameCard(props) {
    const link = "/presentation/" + props.id;
    return (
        <a href={link}
           className="max-w-sm m-6 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 ">
            <img className="rounded-t-lg" src={props.source} alt={props.videoGameName}/>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.videoGameName}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.description}</p>
            </div>
        </a>
    );


}


export default MainPage;