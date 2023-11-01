import {useState} from "react";
import {useParams} from "react-router-dom";
import {useCurrentCommentaryContext} from "./ContextCommentary";

export default function CommentarySection() {
    const {id} = useParams();
    const {commentaries} = useCurrentCommentaryContext();

    //Check if we do not have commentaries
    console.log(commentaries)

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
            className="flex flex-col content-start w-2/3 p-2 overflow-clip">
            {commentaries.map((commentary) =>
                <Commentary object={commentary}></Commentary>)}
        </div>
    )
}

function Commentary(props) {

    const commentary = props.object;
    const {commentaries, setCommentaries} = useCurrentCommentaryContext();

    function eraseCommentary() {
        setCommentaries(commentaries.filter((x) => x.ID !== commentary.ID));

        fetch('http://localhost:3001/EraseCommentary?id=' + commentary.ID, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                } else {
                    console.log("Commentaire supprimé");
                }
            });
    }
    return (
        <div className="flex flex-row p-2 w-full shadow rounded-lg m-1">
            <img src={commentary.PictureSource} className="h-10 rounded-full m-1.5" alt={commentary.PictureSource}/>
            <div className="rounded border-solid border-2 bg-slate-100 w-full pl-2 overflow-x-auto">
                <div className="flex flex-row">
                    <h1 className="mr-6 font-semibold">{commentary.Name}</h1>
                    <p className="font-extralight ">{commentary.Date}</p>
                </div>
                <div className="ml-8">
                    <p>{commentary.Commentary}</p>
                </div>
                <button onClick={eraseCommentary}>Effacer</button>
            </div>
        </div>
    )
}

function NewCommentary(props) {
    const {commentaries, setCommentaries} = useCurrentCommentaryContext()
    const [name, setName] = useState(""); // État pour le nom
    const [commentary, setCommentary] = useState("");

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

            fetch('http://localhost:3001/NewCommentary', {
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

    function submitForm(e) {
        e.preventDefault();

        const data = new FormData(e.target);
        setName(data.get('name'))
        setCommentary(data.get('commentary'))

        sendNewCommentary();
    }

    return (
        <form onSubmit={submitForm}
              className="flex flex-col content-start rounded border-solid border-2  w-1/2 h-60 p-2 mt-6 shadow-xl">
            <input className="rounded border-solid border-2 bg-slate-100 pl-2 mb-2 w-1/4" type="text"
                   placeholder="Nom" id="name" name="name" />
            <textarea className="rounded border-solid border-2 bg-slate-100 w-full pl-2 h-4/5"
                      placeholder="Commentaire" id="commentary" name="commentary" ></textarea>
            <div className='button content-center w-1/4 bg-blue-500 mb-3 mt-3  cursor-pointer select-none
                    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                    active:border-b-[0px]
                    transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                    rounded-full  border-[1px] border-blue-400'>
                <button className='text-center h-full w-full text-white font-bold text-lg'>
                    Envoyer
                </button>
            </div>
        </form>
    )
}
