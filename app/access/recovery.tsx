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
import { useRouter, Link } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select'; // Reutilizando a biblioteca de menus

// Este é o componente que representa sua tela de recuperação.
export default function RecoveryScreen() {
    const router = useRouter();

    // Estados para cada campo do formulário
    const [username, setUsername] = useState('');
    const [q1, setQ1] = useState(null);
    const [r1, setR1] = useState('');
    const [q2, setQ2] = useState(null);
    const [r2, setR2] = useState('');
    const [q3, setQ3] = useState(null);
    const [r3, setR3] = useState('');
    const [password, setPassword] = useState('');

    // Lógica que será executada ao clicar em "Atualizar"
    const handleUpdate = async () => {
        if (!username || !password || !r1 || !r2 || !r3) {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
            return;
        }

        const finalData = {
            username,
            password,
            security: {
                questions: [q1, q2, q3],
                responses: [r1, r2, r3],
            },
        };

        console.log("Dados para recuperação:", finalData);
        // A lógica de FETCH para a sua API de recuperação viria aqui.
        // Ex:
        // try {
        //   const response = await fetch('http://seu-ip:8080/recovery', { method: 'POST', body: JSON.stringify(finalData), ... });
        //   if (response.ok) {
        //     Alert.alert('Sucesso', 'Sua senha foi atualizada!');
        //     router.push('/login');
        //   } else {
        //     Alert.alert('Erro', 'As informações não conferem.');
        //   }
        // } catch (error) {
        //   Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor.');
        // }
    };

    const securityQuestions = [
        { label: 'Qual o nome do seu primeiro animal de estimação?', value: 'Qual o nome do seu primeiro animal de estimação?' },
        { label: 'Em que cidade seus pais se conheceram?', value: 'Em que cidade seus pais se conheceram?' },
        { label: 'Qual o nome da sua rua na infância?', value: 'Qual o nome da sua rua na infância?' },
        { label: 'Qual a sua comida favorita?', value: 'Qual a sua comida favorita?' },
        { label: 'Qual o nome da sua professora do primário?', value: 'Qual o nome da sua professora do primário?' },
    ];

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
                        <RNPickerSelect onValueChange={(value) => setQ1(value)} items={securityQuestions} style={pickerSelectStyles} placeholder={{ label: "Selecione a Pergunta", value: null }} />
                        <TextInput style={styles.input} value={r1} onChangeText={setR1} placeholder="Sua resposta" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Segunda Pergunta:</Text>
                        <RNPickerSelect onValueChange={(value) => setQ2(value)} items={securityQuestions} style={pickerSelectStyles} placeholder={{ label: "Selecione a Pergunta", value: null }} />
                        <TextInput style={styles.input} value={r2} onChangeText={setR2} placeholder="Sua resposta" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Terceira Pergunta:</Text>
                        <RNPickerSelect onValueChange={(value) => setQ3(value)} items={securityQuestions} style={pickerSelectStyles} placeholder={{ label: "Selecione a Pergunta", value: null }} />
                        <TextInput style={styles.input} value={r3} onChangeText={setR3} placeholder="Sua resposta" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nova Senha:</Text>
                        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                    </View>

                    {/* Botões de Ação */}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Atualizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.loginButton]}
                                          onPress={() => router.push('/access/login')}>
                            <Text style={styles.buttonText}>Entrar</Text>
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
