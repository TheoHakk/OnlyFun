import {useState, createContext, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import CommentarySection from "./CommentarySection";

const CurrentCommentaryContext = createContext(null);

export default function ContextCommentary() {

    const {id} = useParams();
    console.log(id + " id trouvé dans contextCommentary");
    const [commentaries, setCommentaries] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:3001/Commentaries?id=${id}`)
        ])
            .then(([resCommentaries]) =>
                Promise.all([resCommentaries.json()])
            )
            .then(([fetchedCommentaries]) => {
                setCommentaries(fetchedCommentaries);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    return (
        <div>
            {!!commentaries ? (
                <CurrentCommentaryContext.Provider value={{commentaries, setCommentaries}}>
                    <CommentarySection></CommentarySection>
                </CurrentCommentaryContext.Provider>
            ) : (
                <p>Chargement en cours...</p>
            )}
        </div>
    )
}

export function useCurrentCommentaryContext() {
    return useContext(CurrentCommentaryContext);
}
