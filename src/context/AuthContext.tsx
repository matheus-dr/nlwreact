import {createContext, ReactNode, useEffect, useState} from "react";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth";

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();
    const auth = getAuth()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,user => {
            if (user) {
                const {displayName, photoURL, uid} = user

                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        });

        return () => {
            unsubscribe()
        }
    }, [auth])

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider)
        if (result.user) {
            const {displayName, photoURL, uid} = result.user

            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account');
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }
    
    return (
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )
}
