import React, { useState, useEffect } from 'react';
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

// Dados de exemplo para os seletores
const goalsData = [{ label: 'Aprender React Native', value: '1' }];
const categoriesData = [{ label: 'Desenvolvimento Pessoal', value: 'cat1' }];
const daysOfWeek = [
    { key: 'MONDAY', label: 'Segunda' }, { key: 'TUESDAY', label: 'Terça' },
    { key: 'WEDNESDAY', label: 'Quarta' }, { key: 'THURSDAY', label: 'Quinta' },
    { key: 'FRIDAY', label: 'Sexta' }, { key: 'SATURDAY', label: 'Sábado' },
    { key: 'SUNDAY', label: 'Domingo' },
];

// Este é o componente que renderiza os detalhes de um hábito específico.
export default function HabitDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // Pega o ID da URL

    // Estados para cada campo do formulário
    const [name, setName] = useState('');
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [createdAt, setCreatedAt] = useState('');

    // useEffect para buscar os dados do hábito quando a tela carregar
    useEffect(() => {
        if (id) {
            console.log('Buscando dados para o hábito com ID:', id);
            // Em um 'app' real, aqui você faria um fetch para a API:
            // fetch(`http://seu-ip:8080/habits/${id}`)
            // Por enquanto, vamos simular o carregamento de dados:
            const mockData = {
                name: `Hábito ${id}`,
                goalId: '1',
                categoryId: 'cat1',
                days: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
                createdAt: new Date().toLocaleDateString('pt-BR'),
            };
            setName(mockData.name);
            setSelectedGoal(mockData.goalId);
            setSelectedCategory(mockData.categoryId);
            setSelectedDays(mockData.days);
            setCreatedAt(mockData.createdAt);
        }
    }, [id]);

    const toggleDaySelection = (dayKey: string) => {
        setSelectedDays((currentDays) =>
            currentDays.includes(dayKey)
                ? currentDays.filter((d) => d !== dayKey)
                : [...currentDays, dayKey]
        );
    };

    const handleUpdate = () => {
        Alert.alert('Sucesso', `Hábito ${id} atualizado!`);
        router.back();
    };

    const handleDelete = () => {
        Alert.alert('Excluir Hábito', 'Você tem certeza?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: () => {
                    Alert.alert('Excluído', 'O hábito foi excluído.');
                    router.back();
                }},
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Detalhes Hábito</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <FontAwesome name="times" size={30} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.formGroup}>
                    <Text style={styles.labelId}>HabitID: #{id}</Text>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Objetivo</Text>
                    <RNPickerSelect value={selectedGoal} onValueChange={(value) => setSelectedGoal(value)} items={goalsData} style={pickerSelectStyles} placeholder={{}} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome*</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Categoria*</Text>
                    <RNPickerSelect value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)} items={categoriesData} style={pickerSelectStyles} placeholder={{}} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Dias da Semana*</Text>
                    <View style={styles.daysContainer}>
                        {daysOfWeek.map((day) => {
                            const isSelected = selectedDays.includes(day.key);
                            return (
                                <TouchableOpacity key={day.key} style={[styles.dayButton, isSelected && styles.dayButtonSelected]} onPress={() => toggleDaySelection(day.key)}>
                                    <Text style={[styles.dayButtonText, isSelected && styles.dayButtonTextSelected]}>{day.label}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Criado em:</Text>
                    <TextInput style={[styles.input, styles.disabledInput]} value={createdAt} editable={false} />
                </View>

                <Text style={styles.validationMessage}>Você pode atualizar ou excluir o hábito.</Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Atualizar Hábito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Excluir Hábito</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS (SEU CSS TRADUZIDO) ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
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
    mainContent: { padding: 36 },
    formGroup: { marginBottom: 20 },
    label: { fontSize: 16, color: '#1E1E1E', marginBottom: 8 },
    labelId: { fontSize: 16, color: '#888' },
    input: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        paddingHorizontal: 16,
        minHeight: 44,
        justifyContent: 'center',
        fontSize: 16,
    },
    disabledInput: { backgroundColor: '#F0F0F0', color: '#A0A0A0' },
    daysContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    dayButton: { paddingVertical: 10, paddingHorizontal: 15, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 20 },
    dayButtonSelected: { backgroundColor: '#009CFF', borderColor: '#009CFF' },
    dayButtonText: { color: '#1E1E1E' },
    dayButtonTextSelected: { color: 'white' },
    validationMessage: { fontSize: 14, color: '#000000', marginVertical: 10, textAlign: 'center' },
    buttonsContainer: { gap: 10, marginTop: 20 },
    updateButton: { backgroundColor: '#2C2C2C', borderRadius: 8, padding: 12, alignItems: 'center' },
    deleteButton: { backgroundColor: '#dc3545', borderRadius: 8, padding: 12, alignItems: 'center' },
    buttonText: { color: '#F5F5F5', fontSize: 16, fontWeight: '400' },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 8, color: 'black', minHeight: 44 },
    inputAndroid: { fontSize: 16, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 8, color: 'black', minHeight: 44 },
});
