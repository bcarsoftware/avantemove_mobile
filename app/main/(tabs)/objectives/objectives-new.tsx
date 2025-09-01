import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

// Este é o componente que renderiza o formulário de novo objetivo.
export default function NewObjectiveScreen() {
    const router = useRouter();

    // Estados para cada campo do formulário
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishDate, setFinishDate] = useState<Date | null>(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showFinishDatePicker, setShowFinishDatePicker] = useState(false);

    // Funções para lidar com a seleção de data
    const onChangeStartDate = (event: any, selectedDate?: Date) => {
        setShowStartDatePicker(false);
        if (event.type === 'set' && selectedDate) {
            setStartDate(selectedDate);
        }
    };

    const onChangeFinishDate = (event: any, selectedDate?: Date) => {
        setShowFinishDatePicker(false);
        if (event.type === 'set' && selectedDate) {
            setFinishDate(selectedDate);
        }
    };

    // Função para criar o objetivo
    const handleCreateObjective = () => {
        if (!name || !startDate) {
            Alert.alert('Campos Obrigatórios', 'Por favor, preencha o Nome e a Data Inicial.');
            return;
        }
        if (finishDate && finishDate < startDate) {
            Alert.alert('Data Inválida', 'A Data Final deve ser posterior à Data Inicial.');
            return;
        }

        const newObjective = {
            name,
            description,
            startDate: startDate.toISOString().split('T')[0],
            finishDate: finishDate ? finishDate.toISOString().split('T')[0] : null,
        };

        console.log('Criando novo objetivo:', newObjective);
        // Aqui viria a lógica para enviar o 'newObjective' para a sua API
        Alert.alert('Sucesso', 'Objetivo criado com sucesso!');
        router.back(); // Volta para a tela de lista de objetivos
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Cadastrar Objetivo</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <FontAwesome name="times" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* --- FORMULÁRIO --- */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome*</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Ex: Ler um livro por mês"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Detalhes sobre o objetivo"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Data Inicial*</Text>
                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.input}>
                        <Text style={startDate ? styles.dateText : styles.placeholderText}>
                            {startDate ? startDate.toLocaleDateString('pt-BR') : 'DD/MM/AAAA'}
                        </Text>
                    </TouchableOpacity>
                    {showStartDatePicker && (
                        <DateTimePicker mode="date" value={startDate || new Date()} onChange={onChangeStartDate} />
                    )}
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Data Final*</Text>
                    <TouchableOpacity onPress={() => setShowFinishDatePicker(true)} style={styles.input}>
                        <Text style={finishDate ? styles.dateText : styles.placeholderText}>
                            {finishDate ? finishDate.toLocaleDateString('pt-BR') : 'DD/MM/AAAA'}
                        </Text>
                    </TouchableOpacity>
                    {showFinishDatePicker && (
                        <DateTimePicker mode="date" value={finishDate || new Date()} onChange={onChangeFinishDate} />
                    )}
                </View>

                <Text style={styles.validationMessage}>
                    Se você inserir a Data Final, ela deve ser posterior à Data Inicial inserida.
                </Text>

                <TouchableOpacity style={styles.createButton} onPress={handleCreateObjective}>
                    <Text style={styles.createButtonText}>Criar Objetivo</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS (SEU CSS TRADUZIDO) ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    // Header
    header: {
        backgroundColor: '#009CFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 36,
        paddingVertical: 60, // Aumentado para melhor visual
    },
    headerTitle: {
        color: 'white',
        fontSize: 32,
        fontWeight: '400',
    },
    closeBtn: {},
    // Main Content
    mainContent: {
        padding: 36,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#1E1E1E',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        minHeight: 44,
        justifyContent: 'center',
    },
    dateText: { fontSize: 16, color: '#1E1E1E' },
    placeholderText: { fontSize: 16, color: '#757575' },
    validationMessage: {
        fontSize: 14,
        color: '#000000',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center',
    },
    createButton: {
        backgroundColor: '#2C2C2C',
        borderRadius: 8,
        padding: 12,
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    createButtonText: {
        color: '#F5F5F5',
        fontSize: 16,
        fontWeight: '400',
    },
});
