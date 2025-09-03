import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    BackHandler,
} from 'react-native';
import { useRouter, Link } from 'expo-router'; // Usamos 'Hiperligação' para navegação simples

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Este é o componente que representa sua tela de login.
export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    // ✨ 3. Adicione este bloco de código
    useEffect(() => {
        // Função que será chamada quando o botão de voltar for pressionado
        const onBackPress = () => {
            console.log("Botão de voltar pressionado na tela de login, navegando para o index.");

            // Navega para a tela inicial. Use a rota raiz '/'.
            router.replace('/');

            // Retornar 'true' informa ao Android: "Eu cuidei do evento,
            // não faça a ação padrão (que seria fechar o 'app')".
            return true;
        };

        // Adiciona o "ouvinte" para o evento 'hardwareBackPress'
        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        // Função de limpeza: remove o "ouvinte" quando o componente é desmontado
        // Isso é MUITO importante para evitar 'bugs' e memory leaks.
        return () => subscription.remove();
    }, [router]);

    // Função para lidar com o 'login' (será chamada pelo botão "Entrar")
    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Atenção', 'Por favor, preencha o usuário e a senha.');
            return;
        }

        console.log(`Tentando logar com: ${username}`);

        const loginDTO = { username, password };

        const btnOK = {
            text: "OK",
            onPress: () => router.push('../dashboard')
        };

        const btnOKCancel = {
            text: "OK",
            onPress: () => {return;}
        };

        const response = await fetch(
            `${baseURL}/user/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDTO)
            }
        );

        if (!response.ok) {
            Alert.alert(
                'Erro no Login',
                'Usuário ou Senha Inválidos!',
                [btnOKCancel]
            )
        }

        Alert.alert(
            'Sucesso!',
            'Bem vindo ao Avante Move!',
            [btnOK]
        )
    };

    return (
        // SafeAreaView garante que o conteúdo não fique sob os notches
        <SafeAreaView style={styles.container}>
            <View style={styles.loginCard}>
                <Text style={styles.title}>AvanteMove Login</Text>

                {/* Formulário de 'Login' */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Usuário/Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Digite seu usuário ou email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Senha:</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Digite sua senha"
                        secureTextEntry // Esconde a senha
                    />
                </View>

                {/* Link para Esqueceu a Senha*/}
                <Link href={"/access/recovery"} asChild>
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>
                </Link>

                {/* Botões de Ação */}
                <View style={styles.loginButtonsContainer}>
                    <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, styles.createAccountButton]}
                                          onPress={() => router.push('/access/sing-up')}>
                            <Text style={styles.buttonText}>Criar Conta</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

// O seu CSS traduzido para um objeto StyleSheet do React Native
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c69ab', // --blue-color
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loginCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    formGroup: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 16,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
        fontSize: 14,
        color: '#666',
    },
    loginButtonsContainer: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#28a745', // --green-color
    },
    createAccountButton: {
        backgroundColor: '#dc3545', // --red-color
    },
});
