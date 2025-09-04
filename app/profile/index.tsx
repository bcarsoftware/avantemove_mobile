import React, { useState, useEffect } from 'react';
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
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import {Checkbox} from "expo-checkbox";

// TODO: const user = useAuth();
const user: {id: string} = {id: '0'};

// Este é o componente COMPLETO que representa a sua tela de edição de perfil.
export default function EditProfileScreen() {
    const router = useRouter();

    // --- ESTADOS PARA CADA CAMPO DO FORMULÁRIO ---
    const [userId, setUserId] = useState('12345'); // Exemplo
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const [gender, setGender] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Geralmente para confirmação ou nova senha
    const [mobile, setMobile] = useState('');
    const [q1, setQ1] = useState(null);
    const [r1, setR1] = useState('');
    const [q2, setQ2] = useState(null);
    const [r2, setR2] = useState('');
    const [q3, setQ3] = useState(null);
    const [r3, setR3] = useState('');

    const [seePassword, setSeePassword] = useState<boolean>(false);

    // Simula o carregamento dos dados do usuário quando a tela abre
    useEffect(() => {
        // Num 'app' real, aqui você leria os dados de um arquivo ou API
        // const userData = await readFile('user.json');
        setUserId(user.id);
        setFirstName('Abel');
        setLastName('Backend');
        setUsername('abel.backend');
        setEmail('abel@exemplo.com');
        // ... E preencheria todos os outros estados
    }, []);

    // --- FUNÇÕES AUXILIARES ---
    const onChangeDate = (event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (event.type === 'set' && selectedDate) {
            setDate(selectedDate);
        }
    };

    const addMobileMask = (value: string) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 11);
        if (cleaned.length === 11) {
            return cleaned.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        return cleaned;
    };

    const handleUpdate = () => {
        // Coleta todos os dados dos estados
        const updatedData = {
            id: userId, firstName, lastName,
            birthDate: date ? date.toISOString().split('T')[0] : null,
            gender, username, email, password, mobile,
            firstQuestion: q1,
            secondQuestion: q2,
            thirdQuestion: q3,
            firstAnswer: r1,
            secondAnswer: r2,
            thirdAnswer: r3,
        };
        console.log('Atualizando perfil com os seguintes dados:', updatedData);
        Alert.alert('Sucesso', 'Perfil atualizado!');
        router.back();
    };

    const securityQuestions = [
        { label: 'Qual o nome do seu primeiro animal de estimação?', value: 'Qual o nome do seu primeiro animal de estimação?' },
        { label: 'Em que cidade seus pais se conheceram?', value: 'Em que cidade seus pais se conheceram?' },
        { label: 'Qual o nome da sua rua na infância?', value: 'Qual o nome da sua rua na infância?' },
        { label: 'Qual a sua comida favorita?', value: 'Qual a sua comida favorita?' },
        { label: 'Qual o nome da sua professora do primário?', value: 'Qual o nome da sua professora do primário?' },
    ];

    const handleSeePassword = async () => {setSeePassword(!seePassword);};

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                            <FontAwesome name="times" size={30} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>AvanteMove</Text>
                    <Text style={styles.subtitle}>Perfil de Usuário</Text>

                    {/* --- FORMULÁRIO COMPLETO --- */}
                    <View style={styles.formGroup}>
                        <Text style={styles.labelId}>ID: #{userId}</Text>
                    </View>

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
                        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
                            <Text style={date ? styles.dateText : styles.placeholderText}>
                                {date ? date.toLocaleDateString('pt-BR') : 'Selecione a data'}
                            </Text>
                        </TouchableOpacity>
                        {showPicker && <DateTimePicker mode="date" value={date || new Date()} onChange={onChangeDate} />}
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
                        <Text style={styles.label}>Nova Senha (opcional):</Text>
                        <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                    </View>

                    {/* Checkbox para Mostrar Texto da Senha */}
                    <View style={styles.formGroup}>
                        <Text>
                            <Checkbox
                                style={styles.checkBtnPasswd}
                                value={seePassword}
                                onValueChange={setSeePassword}
                                color={seePassword ? '#009CFF' : undefined}
                            >
                            </Checkbox>
                            <Text style={styles.seePassword} onPress={handleSeePassword}>  Ver a Senha</Text>
                        </Text>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Celular:</Text>
                        <TextInput style={styles.input} value={mobile} onChangeText={(text) => setMobile(addMobileMask(text))} keyboardType="phone-pad" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Primeira Pergunta:</Text>
                        <RNPickerSelect onValueChange={(value) => setQ1(value)} items={securityQuestions} style={pickerSelectStyles} placeholder={{ label: "Selecione", value: null }} />
                        <TextInput style={styles.input} value={r1} onChangeText={setR1} placeholder="Sua resposta" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Segunda Pergunta:</Text>
                        <RNPickerSelect onValueChange={(value) => setQ2(value)} items={securityQuestions} style={pickerSelectStyles} placeholder={{ label: "Selecione", value: null }} />
                        <TextInput style={styles.input} value={r2} onChangeText={setR2} placeholder="Sua resposta" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Terceira Pergunta:</Text>
                        <RNPickerSelect onValueChange={(value) => setQ3(value)} items={securityQuestions} style={pickerSelectStyles} placeholder={{ label: "Selecione", value: null }} />
                        <TextInput style={styles.input} value={r3} onChangeText={setR3} placeholder="Sua resposta" />
                    </View>

                    {/* --- BOTÕES DE AÇÃO --- */}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Atualizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => router.back()}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#000000' },
    seePassword: {
        fontSize: 15,
        color: '#777',
        margin: 10
    },
    checkBtnPasswd: {
        margin: 8,
        width: 17,
        height: 17,
        borderRadius: 4,
        borderWidth: 2
    },
    scrollContainer: { paddingVertical: 30, paddingHorizontal: 20 },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        alignItems: 'center',
    },
    header: { width: '100%', alignItems: 'flex-end', marginBottom: 10 },
    closeBtn: { padding: 10 },
    title: { fontSize: 24, fontWeight: 'bold' },
    subtitle: { fontSize: 18, color: '#555', marginBottom: 20 },
    formGroup: { marginBottom: 15, width: '100%' },
    label: { marginBottom: 5, fontWeight: 'bold', color: '#333' },
    labelId: { marginBottom: 5, fontWeight: 'bold', color: '#888', textAlign: 'left', width: '100%' },
    input: {
        width: '100%',
        minHeight: 44,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 4,
    },
    dateText: { fontSize: 16 },
    placeholderText: { fontSize: 16, color: '#A9A9A9' },
    buttonsContainer: { flexDirection: 'row', gap: 10, marginTop: 20, width: '100%' },
    button: { flex: 1, padding: 12, borderRadius: 5, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: 'bold' },
    updateButton: { backgroundColor: '#28a745' },
    cancelButton: { backgroundColor: '#dc3545' },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderWidth: 1,
        borderColor: '#ccc', borderRadius: 5, color: 'black', paddingRight: 30, marginTop: 4,
    },
    inputAndroid: {
        fontSize: 16, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 1,
        borderColor: '#ccc', borderRadius: 5, color: 'black', paddingRight: 30, marginTop: 4,
    },
});
