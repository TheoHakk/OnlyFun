import './App.css';








function App() {
    let videoGame = {
        name: "Satisfactory",
        source: "https://images4.alphacoders.com/108/1083979.jpg",
        description: "Satisfactory is a first-person open-world factory building game with a dash of exploration and combat. Pioneering for FICSIT Incorporated means charting and exploiting an alien planet, battling alien lifeforms, creating multi-story factories, entering conveyor belt heaven, automating vehicles, and researching new technologies.",
        informations: {
            genre: "Adventure, Indie, Simulation",
            releaseDate: "19 Mar, 2019",
            developer: "Coffee Stain Studios",
            publisher: "Coffee Stain Publishing"
        },
        video: "https://www.youtube.com/embed/8PGepeXVkG4?si=KgswNEI6TM5Ha4qe",
        commentaries : [
            {
                name: "John Doe",
                date: "19/03/2019",
                commentary: "This game is awesome!",
                source: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            },
            {
                name: "Jane dane",
                date: "19/03/2019",
                commentary: "This game is holy boly!",
                source: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            }]
    }


    return (
        <div>
            <GamePictureHeader source={videoGame.source} videoGameName={videoGame.name}/>
            <GameDescriptionInformations videoGame={videoGame}/>
            <Video source={videoGame.video}/>
            <CommentarySection videoGame={videoGame}/>
            <Bottom/>
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
                <GameDescription description={props.videoGame.description}/>
                <GameInformations informations ={props.videoGame.informations}/>
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

function Information(props) {
    return (
        <div>
            <p className="font-normal">{props.titre} : {props.detail}</p>
        </div>
    );
}

function GameInformations(props){
    return(
        <div>
            <div className="flex-col p-6 rounded-lg border-solid border-2 border-amber-600 ml-10 ">
                <h1 className="text-3xl font-bold uppercase">Informations</h1>
                <Information titre={"Genre"} detail={props.informations.genre}/>
                <Information titre={"Date"} detail={props.informations.releaseDate}/>
                <Information titre={"Développeur"} detail={props.informations.developer}/>
                <Information titre={"Publieur"} detail={props.informations.publisher}/>
            </div>
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
    return(
        <div className="flex flex-col items-center justify-center">
            <Commentaries videoGame={props.videoGame}/>
            <NewCommentary/>
        </div>
    )
}

function Commentaries(props){

    let commentaries = props.videoGame.commentaries;
    return (
        <div className="flex flex-col content-start rounded-lg border-solid border-2  w-1/2 h-60 p-2  shadow-xl">
            {commentaries.map((x) => <Commentary source={x.source} name={x.name} date={x.date} commentary={x.commentary}></Commentary>)}
        </div>
    )
}

function Commentary(props){
    return(
        <div className="flex flex-row p-2 w-full">
            <img src={props.source} className="h-10 rounded-full m-1.5"/>
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
    return(
        <div className="flex flex-col content-start rounded-lg border-solid border-2  w-1/2 h-60 p-2 mt-6 shadow-xl">
            <input className="rounded-lg border-solid border-2 bg-slate-100 pl-2 mb-2 w-1/4" type="text" placeholder="Name"/>
            <input className="rounded-lg border-solid border-2 bg-slate-100 w-full pl-2 h-4/5" type="" placeholder="Commentary"/>
            <div className='button w-20 h-14 bg-blue-500  cursor-pointer select-none
                    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                    active:border-b-[0px]
                    transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                    rounded-full  border-[1px] border-blue-400'>
                <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg mb-12'>Send</span>
            </div>
        </div>
    )
}


function Bottom() {
    return (
        <div className="flex flex-row items-center justify-center m-40"></div>
    );
}


export default App;
