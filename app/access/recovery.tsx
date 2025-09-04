import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Este é o componente que representa sua tela de recuperação.
export default function RecoveryScreen() {
    const router = useRouter();

    // Estados para cada campo do formulário
    const [username, setUsername] = useState('');
    const [q1, setQ1] = useState('');
    const [r1, setR1] = useState('');
    const [q2, setQ2] = useState('');
    const [r2, setR2] = useState('');
    const [q3, setQ3] = useState('');
    const [r3, setR3] = useState('');
    const [password, setPassword] = useState('');

    // load recovery by username
    const handleLoadRecovery = async () => {
        const url = `${baseURL}/recovery/${username}/user`;

        const response = await fetch(
            url,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        );

        if (response.ok) {
            const data = await response.json();
            const recovery = data.data;

            setQ1(recovery.firstQuestion);
            setQ2(recovery.secondQuestion);
            setQ3(recovery.thirdQuestion);
        }
    };

    // Lógica que será executada ao clicar em "Atualizar"
    const handleUpdate = async () => {
        const url = `${baseURL}/recovery/${username}/user`;

        const data = {
            newPassword: password,
            firstQuestion: q1,
            secondQuestion: q2,
            thirdQuestion: q3,
            firstResponse: r1,
            secondResponse: r2,
            thirdResponse: r3
        };

        const invalid = Object.values(data).map((item: string) => !item).includes(true);

        if (invalid) {
            Alert.alert('Erro nos Dados', 'Por favor, preencha os campos obrigatórios.');
            return;
        }

        const recoveryDTO = {userId: 0, ...data};

        const response = await fetch(
            url,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recoveryDTO)
            }
        );

        const btnOKCancel = {
            text: "OK",
            onPress: () => {return;}
        };

        const btnOK = {
            text: "OK",
            onPress: () => {
                router.push('../access/login');
            }
        };

        if (!response.ok) {
            const data = await response.json();
            console.log(data);

            Alert.alert(
                'Erro ao Atualizar!',
                'O acesso não foi recuperado!',
                [btnOKCancel]
            )
            return;
        }

        Alert.alert(
            'Sucesso!',
            'Senha atualizada, pode fazer login!',
            [btnOK]
        )
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    <Text style={styles.title}>AvanteMove</Text>
                    <Text style={styles.subtitle}>Recuperar Acesso</Text>

                    {/* Campos do formulário */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nome de Usuário ou Email:</Text>
                        <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Primeira Pergunta:</Text>
                        <TextInput style={styles.input} value={q1} onChangeText={setQ1} placeholder="Primeira Pergunta" />
                        <TextInput style={styles.input} value={r1} onChangeText={setR1} placeholder="Sua resposta" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Segunda Pergunta:</Text>
                        <TextInput style={styles.input} value={q2} onChangeText={setQ2} placeholder="Segunda Pergunta" />
                        <TextInput style={styles.input} value={r2} onChangeText={setR2} placeholder="Sua resposta" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Terceira Pergunta:</Text>
                        <TextInput style={styles.input} value={q3} onChangeText={setQ3} placeholder="Terceira Pergunta" />
                        <TextInput style={styles.input} value={r3} onChangeText={setR3} placeholder="Sua resposta" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nova Senha:</Text>
                        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                    </View>

                    {/* Botões de Ação */}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={() => handleUpdate()}>
                            <Text style={styles.buttonText}>Atualizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.loginButton]}
                                          onPress={() => handleLoadRecovery()}>
                            <Text style={styles.buttonText}>Buscar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS (SEU CSS TRADUZIDO) ---
// Os estilos são muito parecidos com a tela de cadastro, o que é ótimo para consistência!
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#0c69ab' },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    title: { fontSize: 24, fontWeight: 'bold' },
    subtitle: { fontSize: 18, color: '#555', marginBottom: 20 },
    formGroup: { marginBottom: 15, width: '100%' },
    label: { marginBottom: 8, fontWeight: 'bold', color: '#333' },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 4,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: { color: 'white', fontWeight: 'bold' },
    updateButton: { backgroundColor: '#28a745' }, // Verde para ação principal
    loginButton: { backgroundColor: '#dc3545' }, // Vermelho para ação secundária/voltar
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30,
        marginBottom: 5,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30,
        marginBottom: 5,
    },
});
