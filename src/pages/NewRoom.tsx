import illustrationImage from "../assets/images/illustration.svg";
import logoImage from "../assets/images/logo.svg";
import {Button} from "../components/Button";
import {Link} from "react-router-dom"

import '../styles/auth.scss';
import {useAuth} from "../hooks/useAuth";

export function NewRoom() {
    const {user} = useAuth();

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
                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
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
