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
import DateTimePicker from '@react-native-community/datetimepicker';

// Este é o componente que renderiza os detalhes de um objetivo específico.
export default function ObjectiveDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // ✨ Pega o ID da URL (ex: de /objectives/123)

    // Estados para cada campo do formulário
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [finishDate, setFinishDate] = useState<Date | null>(null);
    const [createdAt, setCreatedAt] = useState('');
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showFinishDatePicker, setShowFinishDatePicker] = useState(false);

    // useEffect para buscar os dados do objetivo quando a tela carregar
    useEffect(() => {
        if (id) {
            // Em um app real, aqui você faria um fetch para a API:
            // fetch(`http://seu-ip:8080/objectives/${id}`)
            // Por enquanto, vamos simular o carregamento de dados:
            const mockData = {
                name: `Objetivo ${id}`,
                description: 'Esta é uma descrição carregada da API.',
                startDate: new Date(),
                finishDate: new Date(new Date().setDate(new Date().getDate() + 30)),
                createdAt: new Date().toLocaleDateString('pt-BR'),
            };
            setName(mockData.name);
            setDescription(mockData.description);
            setStartDate(mockData.startDate);
            setFinishDate(mockData.finishDate);
            setCreatedAt(mockData.createdAt);
        }
    }, [id]); // Roda sempre que o ID mudar

    const onChangeStartDate = (event: any, selectedDate?: Date) => {
        setShowStartDatePicker(false);
        if (event.type === 'set' && selectedDate) setStartDate(selectedDate);
    };

    const onChangeFinishDate = (event: any, selectedDate?: Date) => {
        setShowFinishDatePicker(false);
        if (event.type === 'set' && selectedDate) setFinishDate(selectedDate);
    };

    // Função para atualizar o objetivo
    const handleUpdate = () => {
        // Lógica para enviar os dados atualizados para a API (PUT ou PATCH)
        Alert.alert('Sucesso', `Objetivo ${id} atualizado!`);
        router.back();
    };

    // Função para excluir o objetivo com confirmação
    const handleDelete = () => {
        Alert.alert(
            'Excluir Objetivo',
            'Você tem certeza que deseja excluir este objetivo? Esta ação não pode ser desfeita.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => {
                        console.log(`Excluindo objetivo ${id}...`);
                        // Lógica para enviar a requisição DELETE para a API
                        Alert.alert('Excluído', 'O objetivo foi excluído com sucesso.');
                        router.back(); // Volta para a lista de objetivos
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Detalhes Objetivo</Text>
                <TouchableOpacity onPress={() => router.push('../../objectives')} style={styles.closeBtn}>
                    <FontAwesome name="times" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* --- FORMULÁRIO --- */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome*</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput style={styles.input} value={description} onChangeText={setDescription} />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Data Inicial*</Text>
                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.input}>
                        <Text style={styles.dateText}>{startDate?.toLocaleDateString('pt-BR')}</Text>
                    </TouchableOpacity>
                    {showStartDatePicker && <DateTimePicker mode="date" value={startDate || new Date()} onChange={onChangeStartDate} />}
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Data Final*</Text>
                    <TouchableOpacity onPress={() => setShowFinishDatePicker(true)} style={styles.input}>
                        <Text style={styles.dateText}>{finishDate?.toLocaleDateString('pt-BR')}</Text>
                    </TouchableOpacity>
                    {showFinishDatePicker && <DateTimePicker mode="date" value={finishDate || new Date()} onChange={onChangeFinishDate} />}
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Criado em:</Text>
                    <TextInput style={[styles.input, styles.disabledInput]} value={createdAt} editable={false} />
                </View>

                <Text style={styles.validationMessage}>Você pode Atualizar ou Excluir esse Objetivo.</Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Atualizar Objetivo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Excluir Objetivo</Text>
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
        justifyContent: 'center',
    },
    disabledInput: {
        backgroundColor: '#F0F0F0',
        color: '#A0A0A0',
    },
    dateText: { fontSize: 16, color: '#1E1E1E' },
    validationMessage: {
        fontSize: 14,
        color: '#000000',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    buttonsContainer: { gap: 10 },
    updateButton: {
        backgroundColor: '#2C2C2C', // Botão primário
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#dc3545', // Vermelho para exclusão
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#F5F5F5',
        fontSize: 16,
        fontWeight: '400',
    },
});
