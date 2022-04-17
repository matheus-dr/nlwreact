import logoImage from '../assets/images/logo.svg'
import googleIconImage from '../assets/images/google-icon.svg'
import illustrationImage from '../assets/images/illustration.svg'

import '../styles/auth.scss';
import {Button} from "../components/Button";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {FormEvent, useState} from "react";
import {getDatabase, ref, get} from "firebase/database";

export function Home() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        navigate('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await get(ref(getDatabase(), `rooms/${roomCode}`));

        if (!roomRef.exists()) {
            alert("Room doesn't exists.");
            return;
        }

        navigate(`/rooms/${roomCode}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImage} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImage} alt="Letmeask"/>
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImage} alt="Logo do Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
