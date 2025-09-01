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

// Dados de exemplo para o seletor. No futuro, virão da API.
const habitsData = [
    { label: 'Ler um livro', value: 'habit1' },
    { label: 'Ir à academia', value: 'habit2' },
];

// Este é o componente que renderiza o formulário de nova tarefa.
export default function NewTaskScreen() {
    const router = useRouter();

    // Estados para cada campo do formulário
    const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    // Função para criar a tarefa
    const handleCreateTask = () => {
        if (!name || !selectedHabit) {
            Alert.alert('Campos Obrigatórios', 'Por favor, selecione um Hábito e preencha o Nome da tarefa.');
            return;
        }

        const newTask = {
            habitId: selectedHabit,
            name,
            comment,
        };

        console.log('Criando nova tarefa:', newTask);
        // Aqui viria a lógica para enviar o 'newTask' para a sua API
        Alert.alert('Sucesso', 'Tarefa criada com sucesso!');
        router.back(); // Volta para a lista de tarefas
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Cadastrar Tarefa</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <FontAwesome name="times" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* --- FORMULÁRIO --- */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Hábito*</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedHabit(value)}
                        items={habitsData}
                        style={pickerSelectStyles}
                        placeholder={{ label: "Vincular a um hábito...", value: null }}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome*</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nome da Tarefa"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Comentário</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]} // Adiciona estilo de área de texto
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Comentário (opcional)"
                        multiline={true} // Permite múltiplas linhas
                        numberOfLines={4} // Altura inicial
                    />
                </View>

                <TouchableOpacity style={styles.createButton} onPress={handleCreateTask}>
                    <Text style={styles.createButtonText}>Criar Tarefa</Text>
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
        paddingVertical: 12,
        fontSize: 16,
        minHeight: 44,
        justifyContent: 'center',
    },
    textArea: {
        minHeight: 100, // Altura maior para o campo de comentário
        textAlignVertical: 'top', // Alinha o texto no topo no Android
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
