import illustrationImage from "../assets/images/illustration.svg";
import logoImage from "../assets/images/logo.svg";
import {Button} from "../components/Button";
import {Link, useNavigate} from "react-router-dom"

import '../styles/auth.scss';
import {useAuth} from "../hooks/useAuth";
import {FormEvent, useState} from "react";
import {ref, getDatabase, push} from 'firebase/database'

export function NewRoom() {
    const {user} = useAuth();
    const navigate = useNavigate();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = ref(getDatabase(),'rooms');

        const firebaseRoom = push(roomRef, {
            title: newRoom,
            authorId: user?.id,
        });

        navigate(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImage} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vico</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImage} alt="Letmeask"/>
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
