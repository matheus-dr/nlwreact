import logoImage from '../assets/images/logo.svg';
import deleteImage from '../assets/images/delete.svg'

import '../styles/room.scss';
import {RoomCode} from "../components/roomcode";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button} from "../components/button";
import { Question } from '../components/question';
import {useRoom} from "../hooks/useRoom";
import {makeFirebaseRef} from "../hooks/makeFirebaseRef";
import {remove, update} from "firebase/database";

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const navigate = useNavigate();

    const { questions, title } = useRoom(roomId);

    async function handleEndRoom() {
        await update(
            makeFirebaseRef(`rooms/${roomId}`),
            {endedAt: new Date()}
        );

        navigate('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
            const questionRef = makeFirebaseRef(`rooms/${roomId}/questions/${questionId}`);
            await remove(questionRef);
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <Link to="/">
                        <img src={logoImage} alt="Letmeask" />
                    </Link>
                    <div>
                        <RoomCode code={roomId ?? ''} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >
                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImage} alt="Remover pergunta"/>
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
