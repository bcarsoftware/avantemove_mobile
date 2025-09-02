import React, { createContext, useState, useContext, ReactNode } from 'react';
import {User} from "@/context/User";

// Define o que o nosso "cofre" (Contexto) vai conter
interface AuthContextData {
    user: User | null; // O usuário pode ser nulo se não estiver logado
    signIn: (userData: User) => void; // Função para fazer 'login'
    signOut: () => void; // Função para fazer logout
}

// Cria o cofre (o Contexto em si)
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Este é o componente "Provedor" que vai envolver o nosso 'app'
// e disponibilizar o cofre para todas as telas.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // A função que será chamada na tela de 'login' após o sucesso da API
    const signIn = (userData: User) => {
        // Aqui você também poderia salvar o usuário no armazenamento local (com expo-secure-store)
        setUser(userData);
    };

    const signOut = () => {
        // Limpa os dados do usuário do estado global
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Este é o "gancho" (hook) que as nossas telas usarão para acessar o cofre.
// É a "chave" do cofre.
export const useAuth = () => {
    return useContext(AuthContext);
};
