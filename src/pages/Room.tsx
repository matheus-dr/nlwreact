import logoImage from '../assets/images/logo.svg';
import {Button} from "../components/Button";

import '../styles/room.scss';
import {RoomCode} from "../components/RoomCode";
import {useParams} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth";
import {get, getDatabase, push, ref} from "firebase/database";

// TODO: CRIAR UM TIPO PARA ISSO
//     author: {
//         name: string;
//         avatar: string;
//     };
//     content: string;
//     isAnswered: string;
//     isHighlighted: boolean;

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: string;
    isHighlighted: boolean;
}>;

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: string;
    isHighlighted: boolean;
}

type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();

    const params = useParams<RoomParams>();
    const roomId = params.id;

    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = ref(getDatabase(), `rooms/${roomId}`);

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
                }
            })

            setTitle(storedRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId, questions])

    async function handleSendNewQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false,
        };

        //TODO: FAZER UM HOOK PARA O REF DE ROOMS
        const roomRef = ref(getDatabase(), `rooms/${roomId}/questions`)
        push(roomRef, question);

        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImage} alt="Letmeask" />
                    <RoomCode code={roomId ?? ''} />
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>
                <form onSubmit={handleSendNewQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}
