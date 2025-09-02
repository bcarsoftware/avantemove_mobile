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
import {Link, useRouter} from 'expo-router';
import RNPickerSelect from 'react-native-picker-select'; // A biblioteca para os menus
import DateTimePicker from '@react-native-community/datetimepicker';

// Este é o componente que representa sua tela de cadastro.
export default function SignUpScreen() {
    const router = useRouter();
    const date = new Date();

    // Usamos 'useState' para cada campo do formulário
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [birthDate, setBirthDate] = useState(new Date()); // Guarda o objeto da data
    const [showPicker, setShowPicker] = useState(false); // Controla se o calendário está visível

    const [gender, setGender] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [q1, setQ1] = useState(null);
    const [r1, setR1] = useState('');
    const [q2, setQ2] = useState(null);
    const [r2, setR2] = useState('');
    const [q3, setQ3] = useState(null);
    const [r3, setR3] = useState('');

    // Date Context
    const onChangeDate = (event: any, selectedDate?: Date) => {
        // 1. Sempre feche o calendário após uma ação.
        setShowPicker(false);

        // 2. Verifique se o usuário confirmou a data ('set') e se uma data foi realmente selecionada.
        if (event.type === 'set' && selectedDate) {
            // 3. Se sim, atualize o estado com a nova data.
            setBirthDate(selectedDate);
        }
        // Se o usuário cancelou ('dismissed'), não fazemos nada.
    };

    // Função para mostrar o calendário
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    // --- SUAS FUNÇÕES DE MÁSCARA (copiadas diretamente) ---
    const addMobileMask = (value: string) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 11);
        if (cleaned.length === 11) {
            return cleaned.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        return cleaned;
    };

    const removeMobileMask = (maskedNumber: string) => {
        if (!maskedNumber) return '';
        return '55' + maskedNumber.replace(/\D/g, '');
    };

    // --- SUA LÓGICA DE REGISTRO (adaptada para React Native) ---
    const handleRegister = async () => {
        // Adicione validações aqui conforme necessário
        if (!firstName || !email || !password) {
            Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios.');
            return;
        }

        const security = {
            //... Lógica de segurança aqui
            firstQuestion: q1,
            firstAnswer: r1,
            secondQuestion: q2,
            secondAnswer: r2,
            thirdQuestion: q3,
            thirdAnswer: r3,
        };

        const finalData = {
            firstName, lastName, birthDate, gender, username, email,
            password, mobile: removeMobileMask(mobile), experience: 10, active: true,
            security,
        };

        console.log("Dados a serem enviados:", finalData);
        // A lógica de FETCH para a sua API viria aqui.
        // Ex: await fetch('http://seu-ip:8080/user', { ... });
    };

    // Lista de perguntas de segurança para os menus
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
                <View style={styles.signUpCard}>
                    <Text style={styles.title}>AvanteMove</Text>
                    <Text style={styles.subtitle}>Novo Usuário</Text>

                    {/* Mapeamento dos campos do formulário */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nome:</Text>
                        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Sobrenome:</Text>
                        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Data de Nascimento:</Text>

                        {/* O "botão" que o usuário pressiona para abrir o calendário */}
                        <TouchableOpacity onPress={toggleDatePicker} style={styles.input}>
                            <Text style={styles.dateText}>{date.toLocaleDateString('pt-BR')}</Text>
                        </TouchableOpacity>

                        {/* O componente do calendário, que só aparece quando showPicker é true */}
                        {showPicker && (
                            <DateTimePicker
                                mode="date"
                                display="spinner" // ou 'calendar' ou 'default'
                                value={birthDate}
                                onChange={onChangeDate}
                                maximumDate={new Date()} // Impede que o usuário selecione datas futuras
                            />
                        )}
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Gênero:</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setGender(value)}
                            items={[
                                { label: 'Masculino', value: 'MALE' },
                                { label: 'Feminino', value: 'FEMALE' },
                                { label: 'Não Especificado', value: 'NOT_SPECIFIED' },
                                { label: 'Prefiro Não Dizer', value: 'PREFER_NOT_SAY' },
                            ]}
                            style={pickerSelectStyles}
                            placeholder={{ label: "Selecione seu gênero", value: null }}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nome de Usuário:</Text>
                        <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email:</Text>
                        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Senha:</Text>
                        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Celular:</Text>
                        <TextInput
                            style={styles.input}
                            value={mobile}
                            onChangeText={(text) => setMobile(addMobileMask(text))}
                            placeholder="(XX) 9XXXX-XXXX"
                            keyboardType="phone-pad"
                            maxLength={15}
                        />
                    </View>

                    {/* Perguntas de Segurança */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Primeira Pergunta:</Text>
                        <RNPickerSelect onValueChange={(value) => setQ1(value)} items={securityQuestions} style={pickerSelectStyles} placeholder={{ label: "Selecione uma Pergunta", value: null }} />
                        <TextInput style={styles.input} value={r1} onChangeText={setR1} placeholder="Sua resposta" />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Segunda Pergunta:</Text>
                        <RNPickerSelect onValueChange={(value) => setQ2(value)} items={securityQuestions} style={pickerSelectStyles} placeholder={{ label: "Selecione uma Pergunta", value: null }} />
                        <TextInput style={styles.input} value={r2} onChangeText={setR2} placeholder="Sua resposta" />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Terceira Pergunta:</Text>
                        <RNPickerSelect onValueChange={(value) => setQ3(value)} items={securityQuestions} style={pickerSelectStyles} placeholder={{ label: "Selecione uma Pergunta", value: null }} />
                        <TextInput style={styles.input} value={r3} onChangeText={setR3} placeholder="Sua resposta" />
                    </View>

                    <View>
                        {/* Link para Esqueceu a Senha*/}
                        <Link href={"/access/recovery"} asChild>
                            <TouchableOpacity>
                                <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>

                    {/* Botões */}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
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
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#0c69ab' },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    signUpCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
        fontSize: 14,
        color: '#666',
    },
    title: { fontSize: 24, fontWeight: 'bold' },
    subtitle: { fontSize: 18, color: '#555', marginBottom: 20 },
    formGroup: { marginBottom: 15, width: '100%' },
    label: { marginBottom: 5, fontWeight: 'bold', color: '#333' },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: { color: 'white', fontWeight: 'bold' },
    registerButton: { backgroundColor: '#28a745' },
    loginButton: { backgroundColor: '#dc3545' },
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
