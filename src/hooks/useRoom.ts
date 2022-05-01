import {useEffect, useState} from "react";
import {makeFirebaseRef} from "./makeFirebaseRef";
import {get, off} from "firebase/database";
import {useAuth} from "./useAuth";

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: string;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: string;
    isHighlighted: boolean;
    likes: Record<string, { authorId: string }>
}>;

export function useRoom(roomId?: string) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = makeFirebaseRef(`rooms/${roomId}`);

        get(roomRef).then(data => {
            const storedRoom = data.val();
            const firebaseQuestions = storedRoom.questions as FirebaseQuestions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions)
                .map(([key, value]) => {
                    return {
                        id: key,
                        content: value.content,
                        author: value.author,
                        isHighlighted: value.isHighlighted,
                        isAnswered: value.isAnswered,
                        likeCount: Object.values(value.likes ?? {}).length,
                        likeId: Object.entries(value.likes ?? {})
                            .find(([key, like]) =>
                            like.authorId === user?.id
                        )?.[0]
                    }
                })

            setTitle(storedRoom.title);
            setQuestions(parsedQuestions);
        })

        off(roomRef)
    }, [roomId, questions, user?.id])

    return { questions, title }
}
