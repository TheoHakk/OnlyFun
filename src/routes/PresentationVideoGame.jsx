
import '../index.css';
import '../output.css';

import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";



function PresentationVideoGame() {
    const { id } = useParams();


    let [videoGame, setVideoGame] = useState(null);
    let [commentaries, setCommentaries] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:3001/GetVideoGame?id=${id}`),
            fetch(`http://localhost:3001/GetCommentaries?id=${id}`)
        ])
            .then(([resVideoGame, resCommentaries]) =>
                Promise.all([resVideoGame.json(), resCommentaries.json()])
            )
            .then(([fetchedVideoGame, fetchedCommentaries]) => {
                setVideoGame(fetchedVideoGame[0]);
                setCommentaries(fetchedCommentaries);
            });
    }, []);

    return (
        <div>
            {commentaries != null && videoGame != null ? (
                <div>
                    <GamePictureHeader source={videoGame.ImageLink} videoGameName={videoGame.Name}/>
                    <GameDescriptionInformations videoGame={videoGame}/>
                    <Video source={videoGame.VideoLink}/>
                    <CommentarySection commentaries={commentaries} id={videoGame.ID}/>
                    <Bottom/>
                </div>
            ) : (
                <p>Chargement en cours...</p>
            )}
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

function GameDescriptionInformations(props){
    return (
        <div>
            <div className="flex flex-row items-center justify-center m-40 shadow-2xl p-6 rounded-bl ">
                <GameDescription description={props.videoGame.Description}/>
                <GameInformations videoGame ={props.videoGame}/>
            </div>
        </div>
    );
}

function GameDescription(props){
    return (
        <div>
            <h1 className="text-3xl font-bold text-justify uppercase ">Description</h1>
            <p> {props.description}</p>
        </div>
    );
}

function GameInformations(props){
    return(
        <div>
            <div className="flex-col p-6 rounded-lg border-solid border-2 border-amber-600 ml-10 ">
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
        <div className="flex flex-row items-center justify-center m-40 shadow-2xl p-24 rounded-bl border-solid">
            <iframe className="shadow-2xl rounded-lg" width="750" height="450" src={props.source} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    );
}

function CommentarySection(props){

    const [commentaries, setCommentaries] = useState(props.commentaries)

    return(
        <div className="flex flex-col items-center justify-center">
            <Commentaries commentaries={commentaries}/>
            <NewCommentary commentaries={commentaries} setCommentaries={setCommentaries} id={props.id}/>
        </div>
    )
}

function Commentaries(props){
    return (
        <div className="flex flex-col content-start rounded-lg border-solid border-2  w-2/3 p-2  shadow-xl overflow-auto">
            {props.commentaries.map((x) =>
                <Commentary source={x.PictureSource} name={x.Name} date={x.Date} commentary={x.Commentary}></Commentary>)}
        </div>
    )
}

function Commentary(props){
    return(
        <div className="flex flex-row p-2 w-full">
            <img src={props.source} className="h-10 rounded-full m-1.5" alt={props.source}/>
            <div className="rounded-lg border-solid border-2 bg-slate-100 w-full pl-2">
                <div className="flex flex-row">
                    <h1 className="mr-6 font-semibold">{props.name}</h1>
                    <p className="font-extralight ">{props.date}</p>
                </div>
                <div className="ml-8">
                    <p>{props.commentary}</p>
                </div>
                <button>Reply</button>
            </div>
        </div>
    )
}

function NewCommentary(props){

    const [name, setName] = useState(""); // État pour le nom
    const [commentary, setCommentary] = useState("");
    const handleNameChange = (e) => {
        setName(e.target.value); //Va aller récupérér la valeur de son origine, un peu comme un délégué
    };

    const handleCommentaryChange = (e) => {
        setCommentary(e.target.value);
    };

    const sendNewCommentary = () => {
        if (commentary !== "" && name !== "") {
            const newCommentary = {
                id: props.id,
                Name: name,
                Date: Date().toLocaleString().split(" ")[2] + "/" + Date().toLocaleString().split(" ")[1] + "/" + Date().toLocaleString().split(" ")[3],
                Commentary: commentary,
                PictureSource: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            };
            //les ... permettent de faire une copie du tableau
            props.setCommentaries([...props.commentaries, newCommentary]);

            setName("") ;
            setCommentary("");

            console.log(Date().toLocaleString().split(" ")[2] + "/" + Date().toLocaleString().split(" ")[1] + "/" + Date().toLocaleString().split(" ")[3]);

            fetch('http://localhost:3001/PostNewCommentary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCommentary)
            }).then((response) => {
                if (response.ok) {
                    console.log("Commentaire envoyé");
                } else {
                    console.log("Erreur lors de l'envoi du commentaire");
                }
            })
        }
    };
    return(
        <div className="flex flex-col content-start rounded-lg border-solid border-2  w-1/2 h-60 p-2 mt-6 shadow-xl">
            <input className="rounded-lg border-solid border-2 bg-slate-100 pl-2 mb-2 w-1/4" type="text" placeholder="Name" id="NewCommentaryName" onChange={handleNameChange}/>
            <input className="rounded-lg border-solid border-2 bg-slate-100 w-full pl-2 h-4/5" type="" placeholder="Commentary" id="NewCommentaryCommentary" onChange={handleCommentaryChange}/>
            <div className='button content-center w-1/4 bg-blue-500 mb-3 mt-3  cursor-pointer select-none
                    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                    active:border-b-[0px]
                    transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                    rounded-full  border-[1px] border-blue-400'>
                <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg' onClick={sendNewCommentary}>Confirmer</span>
            </div>
        </div>
    )
}

function Bottom() {
    return (
        <div className="flex flex-row items-center justify-center m-40"></div>
    );
}

export default PresentationVideoGame;
