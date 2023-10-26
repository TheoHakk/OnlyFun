import {useState} from "react";
import {useParams} from "react-router-dom";
import {useCurrentCommentaryContext} from "./ContextCommentary";

export default function CommentarySection() {
    const {id} = useParams();
    return (
        <div className="flex flex-col items-center justify-center">
            <Commentaries/>
            <NewCommentary id={id}/>
        </div>
    )
}

function Commentaries() {
    const {commentaries} = useCurrentCommentaryContext();
    return (
        <div
            className="flex flex-col content-start rounded border-solid border-2  w-2/3 p-2  shadow-xl overflow-auto">
            {commentaries.map((x) =>
                <Commentary source={x.PictureSource} name={x.Name} date={x.Date}
                            commentary={x.Commentary}></Commentary>)}
        </div>
    )
}

function Commentary(props) {
    return (
        <div className="flex flex-row p-2 w-full">
            <img src={props.source} className="h-10 rounded-full m-1.5" alt={props.source}/>
            <div className="rounded border-solid border-2 bg-slate-100 w-full pl-2 overflow-x-auto">
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

function NewCommentary(props) {
    const {commentaries, setCommentaries} = useCurrentCommentaryContext()
    const [name, setName] = useState(""); // État pour le nom
    const [commentary, setCommentary] = useState("");

    const handleNameChange = (e) => setName(e.target.value); //Va aller récupérér la valeur de son origine, un peu comme un délégué
    const handleCommentaryChange = (e) => setCommentary(e.target.value);

    const sendNewCommentary = () => {
        if (commentary !== "" && name !== "") {
            const newCommentary = {
                id: props.id,
                Name: name,
                Date: Date().toLocaleString().split(" ")[2] + "/" + Date().toLocaleString().split(" ")[1] + "/" + Date().toLocaleString().split(" ")[3],
                Commentary: commentary,
                PictureSource: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            };

            setCommentaries([...commentaries, newCommentary]);
            setName("");
            setCommentary("");
            fetch('http://localhost:3001/PostNewCommentary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCommentary)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
            })
        }
    };

    return (

        <div className="flex flex-col content-start rounded border-solid border-2  w-1/2 h-60 p-2 mt-6 shadow-xl">
            <input className="rounded border-solid border-2 bg-slate-100 pl-2 mb-2 w-1/4" type="text"
                   placeholder="Name" id="NewCommentaryName" value={name} onChange={handleNameChange}/>
            <textarea className="rounded border-solid border-2 bg-slate-100 w-full pl-2 h-4/5"
                      placeholder="Commentary" id="NewCommentaryCommentary"
                      value={commentary}
                      onChange={handleCommentaryChange}></textarea>
            <div className='button content-center w-1/4 bg-blue-500 mb-3 mt-3  cursor-pointer select-none
                    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                    active:border-b-[0px]
                    transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                    rounded-full  border-[1px] border-blue-400'>
                <span className='flex flex-col justify-center items-center h-full text-white font-bold text-lg'
                      onClick={sendNewCommentary}>Confirmer</span>
            </div>
        </div>
    )
}
