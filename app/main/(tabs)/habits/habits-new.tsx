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
import RNPickerSelect from 'react-native-picker-select';

// Dados de exemplo para os seletores. No futuro, virão da API.
const goalsData = [
    { label: 'Aprender React Native', value: '1' },
    { label: 'Lançar App', value: '2' },
];
const categoriesData = [
    { label: 'Desenvolvimento Pessoal', value: 'cat1' },
    { label: 'Saúde', value: 'cat2' },
];
const daysOfWeek = [
    { key: 'MONDAY', label: 'Segunda' },
    { key: 'TUESDAY', label: 'Terça' },
    { key: 'WEDNESDAY', label: 'Quarta' },
    { key: 'THURSDAY', label: 'Quinta' },
    { key: 'FRIDAY', label: 'Sexta' },
    { key: 'SATURDAY', label: 'Sábado' },
    { key: 'SUNDAY', label: 'Domingo' },
];

// Este é o componente que renderiza o formulário de novo hábito.
export default function NewHabitScreen() {
    const router = useRouter();

    // TODO: const userId = useAuth(); // quando tiver com login e cofre
    const userId = 0; // delete depois

    // Estados para cada campo do formulário
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    // Função para lidar com a seleção múltipla de dias
    const toggleDaySelection = (dayKey: string) => {
        if (selectedDays.includes(dayKey)) {
            // Se o dia já está selecionado, remove
            setSelectedDays(selectedDays.filter((d) => d !== dayKey));
        } else {
            // Se não, adiciona
            setSelectedDays([...selectedDays, dayKey]);
        }
    };

    // Função para criar o hábito
    const handleCreateHabit = () => {
        if (!name || !selectedCategory || selectedDays.length === 0) {
            Alert.alert('Campos Obrigatórios', 'Preencha Nome, Categoria e pelo menos um Dia da Semana.');
            return;
        }

        const newHabit = { userId, objectiveId: selectedGoal, name, categoryId: selectedCategory, daysOfWeek: selectedDays };
        console.log('Criando novo hábito:', newHabit);
        Alert.alert('Sucesso', 'Hábito criado com sucesso!');
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Cadastrar Hábito</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <FontAwesome name="times" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* --- FORMULÁRIO --- */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>UserID: #{userId}</Text>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Objetivo (opcional)</Text>
                    <RNPickerSelect onValueChange={(value) => setSelectedGoal(value)} items={goalsData} style={pickerSelectStyles} placeholder={{ label: "Vincular a um objetivo...", value: null }}/>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome*</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nome do Hábito"/>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Categoria*</Text>
                    <RNPickerSelect onValueChange={(value) => setSelectedCategory(value)} items={categoriesData} style={pickerSelectStyles} placeholder={{ label: "Selecione uma categoria...", value: null }}/>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Dias da Semana*</Text>
                    <View style={styles.daysContainer}>
                        {daysOfWeek.map((day) => {
                            const isSelected = selectedDays.includes(day.key);
                            return (
                                <TouchableOpacity
                                    key={day.key}
                                    style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
                                    onPress={() => toggleDaySelection(day.key)}
                                >
                                    <Text style={[styles.dayButtonText, isSelected && styles.dayButtonTextSelected]}>
                                        {day.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <Text style={styles.validationMessage}>Você pode escolher um dia ou mais.</Text>

                <TouchableOpacity style={styles.createButton} onPress={handleCreateHabit}>
                    <Text style={styles.createButtonText}>Criar Hábito</Text>
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
        paddingVertical: 60,
    },
    headerTitle: { color: 'white', fontSize: 32, fontWeight: '400' },
    closeBtn: {},
    // Conteúdo
    mainContent: { padding: 36 },
    formGroup: { marginBottom: 20 },
    label: { fontSize: 16, color: '#1E1E1E', marginBottom: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        paddingHorizontal: 16,
        minHeight: 44,
        justifyContent: 'center',
        fontSize: 16,
    },
    // Dias da Semana
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    dayButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 20,
    },
    dayButtonSelected: {
        backgroundColor: '#009CFF',
        borderColor: '#009CFF',
    },
    dayButtonText: {
        color: '#1E1E1E',
    },
    dayButtonTextSelected: {
        color: 'white',
    },
    //
    validationMessage: {
        fontSize: 16,
        color: '#000000',
        marginTop: 20,
        textAlign: 'center',
    },
    createButton: {
        backgroundColor: '#2C2C2C',
        borderRadius: 8,
        padding: 12,
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    createButtonText: {
        color: '#F5F5F5',
        fontSize: 16,
        fontWeight: '400',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderWidth: 1,
        borderColor: '#D9D9D9', borderRadius: 8, color: 'black', minHeight: 44,
    },
    inputAndroid: {
        fontSize: 16, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 1,
        borderColor: '#D9D9D9', borderRadius: 8, color: 'black', minHeight: 44,
    },
});
