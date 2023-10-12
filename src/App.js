import './App.css';




function App() {
    let source= "https://images4.alphacoders.com/108/1083979.jpg";
    let videoGameName= "Satisfactory";
  return (
      <div >
        <GamePictureHeader source={source} videoGameName={videoGameName}/>
          <GameDescriptionInformations/>
          <Video/>
          <CommentarySection/>
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

function GameDescriptionInformations(){
    return (
        <div>
            <div className="flex flex-row items-center justify-center m-40 shadow-2xl p-6 rounded-bl ">
                <GameDescription />
                <GameInformations />
            </div>
        </div>
    );
}

function GameDescription(){
    return (
        <div>
            <h1 className="text-3xl font-bold text-justify uppercase ">Description</h1>
            <p>Satisfactory is a first-person open-world factory building game with a dash of exploration and combat. Pioneering for FICSIT Incorporated means charting and exploiting an alien planet, battling alien lifeforms, creating multi-story factories, entering conveyor belt heaven, automating vehicles, and researching new technologies.</p>
        </div>
    );
}

function GameInformations(){
    return(
        <div>
            <div className="flex-col p-6 rounded-lg border-solid border-2 border-amber-600 ml-10 ">
                <h1 className="text-3xl font-bold uppercase">Informations</h1>
                <p className="text-center">Genre: Adventure, Indie, Simulation</p>
                <p className="text-center">Release Date: 19 Mar, 2019</p>
                <p className="text-center">Developer: Coffee Stain Studios</p>
                <p className="text-center">Publisher: Coffee Stain Publishing</p>
            </div>
        </div>
    );
}


function Video() {
    return (
        <div className="flex flex-row items-center justify-center m-40 shadow-2xl p-24 rounded-bl border-solid">
            <iframe className="shadow-2xl rounded-lg" width="750" height="450" src="https://www.youtube.com/embed/8PGepeXVkG4?si=KgswNEI6TM5Ha4qe" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    );
}

function CommentarySection(){
    return(
        <div className="flex flex-col items-center justify-center">
            <Commentaries/>
            <NewCommentary/>
        </div>
    )
}

function Commentaries(props){
    return(
        <div className="rounded-lg border-solid border-2  w-1/2 shadow-xl">
            <Commentary source="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" name="John Doe" date="19/03/2019" commentary="This game is awesome!"/>
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
                <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg '>Send</span>
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
