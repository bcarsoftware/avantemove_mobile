import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User } from "@/context/models/User";
import { Security } from "@/context/models/Security";

const USER_DATA_KEY = process.env.EXPO_PUBLIC_USER_DATA_KEY || 'UserDataKey'; // Chave para o armazenamento seguro
const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// ✨ ADICIONADO: isLoading para gerenciar o carregamento inicial
interface AuthContextData {
    user: User | null;
    isLoading: boolean; // Para saber quando o 'app' está a verificar o 'login'
    signIn: (apiData: any) => Promise<void>; // Aceita os dados brutos da API
    reflashUser: (apiData: any) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Função adaptadora que você já criou, agora dentro do contexto de uso
const adapterObjectToUser = async (data: any): Promise<User> => {
    const security = await getSecurityFromUser(data.data);

    return {
        id: data.data.id,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        birthDate: data.data.birthDate,
        gender: data.data.gender,
        username: data.data.username,
        email: data.data.email,
        mobile: data.data.mobile,
        experience: data.data.experience,
        active: data.data.active,
        security: security,
        tokenAccess: data.token,
        createdAt: data.data.createdAt,
        updatedAt: data.data.updatedAt
    } as User;
};

// get security by type
const getSecurityFromUser = async (user: any): Promise<Security | null> => {
    if (!user) return null;

    const response = await fetch(
        `${baseURL}/recovery/${user?.username || ''}/user`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) return null;

    const jsonData = await response.json();

    const recovery = jsonData.data;

    return {
        id: recovery.id,
        userId: recovery?.user.id || -1,
        firstQuestion: recovery.firstQuestion,
        secondQuestion: recovery.secondQuestion,
        thirdQuestion: recovery.thirdQuestion,
        firstResponse: recovery.firstResponse,
        secondResponse: recovery.secondResponse,
        thirdResponse: recovery.thirdResponse,
    } as Security;
};

const makeLogouOut = async (token: string): Promise<void> => {
    const logoutUrl = `${baseURL}/user/logout`;
    await fetch(logoutUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
}

const verifyToken = async (token: string): Promise<boolean> => {
    const url = `${baseURL}/user/token`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token })
    });

    if (!response.ok) {
        await makeLogouOut(token);

        return false;
    }

    return true;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Começa carregando

    // ✨ NOVO: Efeito para carregar o usuário do armazenamento ao iniciar o app
    useEffect(() => {
        async function loadUserFromStorage() {
            try {
                const userString = await SecureStore.getItemAsync(USER_DATA_KEY);
                if (userString) {
                    const data = JSON.parse(userString) as User || null;

                    const state = await verifyToken(data.tokenAccess || '');

                    if (!state) await signOut();
                }
            } catch (e) {
                console.error("Falha ao carregar usuário do armazenamento", e);
            } finally {
                setIsLoading(false); // Termina o carregamento, com ou sem usuário
            }
        }
        loadUserFromStorage().then(r => r);
    }, []); // O array vazio [] garante que rode apenas uma vez

    // ✨ ATUALIZADO: A função signIn agora salva os dados
    const signIn = async (apiData: any) => {
        try {
            const loggedUser = await adapterObjectToUser(apiData);
            setUser(loggedUser);
            // Salva a string JSON no armazenamento seguro
            await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(loggedUser));
            console.log("Usuário logado e salvo no SecureStore.");
        } catch (error) {
            console.error("Falha ao processar e salvar dados do usuário", error);
        }
    };

    // ✨ ATUALIZADO: A função signOut agora limpa o armazenamento
    const signOut = async () => {
        await makeLogouOut(user?.tokenAccess || '');
        setUser(null);
        await SecureStore.deleteItemAsync(USER_DATA_KEY);
        console.log("Usuário deslogado e dados removidos do SecureStore.");
    };

    // Reflashing User Data
    const reflashUser = async (apiData: any) => {
        try {
            const userString = await SecureStore.getItemAsync(USER_DATA_KEY);
            if (userString) {
                const data = JSON.parse(userString) as User || null;

                const user = await adapterObjectToUser(apiData);

                user.tokenAccess = data?.tokenAccess;

                await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(user));
                console.log("informações de usuário atualizadas no SecureStore.");
            }
            else {
                console.error("usuário não encontrado/logado!");
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        // Passa o isLoading para que o 'app' possa mostrar uma tela de carregamento
        <AuthContext.Provider value={{ user, isLoading, signIn, signOut, reflashUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
