import logoImage from '../assets/images/logo.svg'
import googleIconImage from '../assets/images/google-icon.svg'
import illustrationImage from '../assets/images/illustration.svg'

import '../styles/auth.scss';
import {Button} from "../components/Button";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

export function Home() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        navigate('/rooms/new');
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImage} alt="Logo do Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
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