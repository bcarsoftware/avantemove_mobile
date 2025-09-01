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

// Dados de exemplo para o seletor de hábitos
const habitsData = [{ label: 'Ler um livro', value: 'habit1' }];

// Este é o componente que renderiza os detalhes de uma tarefa específica.
export default function TaskDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // Pega o ID da URL

    // Estados para cada campo do formulário
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
    const [createdAt, setCreatedAt] = useState('');

    // useEffect para buscar os dados da tarefa quando a tela carregar
    useEffect(() => {
        if (id) {
            console.log('Buscando dados para a tarefa com ID:', id);
            // Simulação de carregamento de dados da API
            const mockData = {
                name: `Tarefa ${id}`,
                comment: 'Este é um comentário carregado da API.',
                habitId: 'habit1',
                createdAt: new Date().toLocaleDateString('pt-BR'),
            };
            setName(mockData.name);
            setComment(mockData.comment);
            setSelectedHabit(mockData.habitId);
            setCreatedAt(mockData.createdAt);
        }
    }, [id]);

    // Funções para as ações dos botões
    const handleFinish = () => {
        Alert.alert('Finalizar Tarefa', 'Tem certeza que deseja marcar esta tarefa como finalizada?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Finalizar', onPress: () => {
                    console.log(`Finalizando tarefa ${id}...`);
                    router.back();
                }},
        ]);
    };

    const handleUpdate = () => {
        Alert.alert('Sucesso', `Tarefa ${id} atualizada!`);
        router.back();
    };

    const handleDelete = () => {
        Alert.alert('Excluir Tarefa', 'Esta ação не pode ser desfeita.', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: () => {
                    console.log(`Excluindo tarefa ${id}...`);
                    router.back();
                }},
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Detalhes Tarefa</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <FontAwesome name="times" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* --- FORMULÁRIO --- */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Hábito</Text>
                    <RNPickerSelect value={selectedHabit} onValueChange={(value) => setSelectedHabit(value)} items={habitsData} style={pickerSelectStyles} placeholder={{}} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome*</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Comentário</Text>
                    <TextInput style={[styles.input, styles.textArea]} value={comment} onChangeText={setComment} multiline={true} numberOfLines={4} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Criado em:</Text>
                    <TextInput style={[styles.input, styles.disabledInput]} value={createdAt} editable={false} />
                </View>

                <Text style={styles.validationMessage}>Você pode Finalizar, Atualizar ou Excluir a Tarefa.</Text>

                {/* --- BOTÕES DE AÇÃO --- */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                        <Text style={styles.buttonText}>Finalizar Tarefa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Atualizar Tarefa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Excluir Tarefa</Text>
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
    input: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        minHeight: 44,
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    disabledInput: { backgroundColor: '#F0F0F0', color: '#A0A0A0' },
    validationMessage: {
        fontSize: 14,
        color: '#000000',
        marginVertical: 10,
        textAlign: 'center',
    },
    buttonsContainer: { gap: 10, marginTop: 10 },
    buttonText: { color: '#F5F5F5', fontSize: 16, fontWeight: 'bold' },
    finishButton: {
        backgroundColor: '#28a745', // Verde
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    updateButton: {
        backgroundColor: '#2C2C2C', // Preto/Cinza
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#dc3545', // Vermelho
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 8, color: 'black', minHeight: 44 },
    inputAndroid: { fontSize: 16, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 1, borderColor: '#D9D9D9', borderRadius: 8, color: 'black', minHeight: 44 },
});
