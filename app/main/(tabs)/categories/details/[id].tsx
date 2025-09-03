// app/categories/[id].tsx

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

// Este é o componente que renderiza os detalhes de uma categoria específica.
export default function CategoryDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // Pega o ID da categoria da URL

    // Estados para os campos do formulário
    const [name, setName] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    // useEffect para buscar os dados da categoria quando a tela carregar
    useEffect(() => {
        if (id) {
            console.log('Buscando dados para a categoria com ID:', id);
            // Simulação de carregamento de dados da API
            const mockData = {
                name: `Categoria ${id}`,
                createdAt: new Date().toLocaleDateString('pt-BR'),
            };
            setName(mockData.name);
            setCreatedAt(mockData.createdAt);
        }
    }, [id]);

    // Função para atualizar a categoria
    const handleUpdate = () => {
        if (!name.trim()) {
            Alert.alert('Erro', 'O nome da categoria не pode ficar em branco.');
            return;
        }
        Alert.alert('Sucesso', `Categoria ${id} atualizada!`);
        router.back();
    };

    // Função para excluir a categoria com confirmação
    const handleDelete = () => {
        Alert.alert(
            'Excluir Categoria',
            'Você tem certeza que deseja excluir esta categoria? Esta ação é irreversível.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => {
                        console.log(`Excluindo categoria ${id}...`);
                        Alert.alert('Excluída', 'A categoria foi excluída com sucesso.');
                        router.back();
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Detalhes Categoria</Text>
                <TouchableOpacity onPress={() => router.push('../../categories')} style={styles.closeBtn}>
                    <FontAwesome name="times" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* --- FORMULÁRIO --- */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.formGroup}>
                    <Text style={styles.labelId}>CategoriaID: #{id}</Text>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nome da Categoria</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nome da Categoria"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Criado em:</Text>
                    <TextInput
                        style={styles.input}
                        value={createdAt}
                        editable={ false }
                    />
                </View>

                <Text style={styles.validationMessage}>Você pode Atualizar ou Excluir essa Categoria.</Text>

                {/* --- BOTÕES DE AÇÃO --- */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Atualizar Categoria</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Excluir Categoria</Text>
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
        paddingVertical: 12,
        fontSize: 16,
    },
    validationMessage: {
        fontSize: 14,
        color: '#000000',
        marginVertical: 10,
        textAlign: 'center',
    },
    buttonsContainer: { gap: 10, marginTop: 10 },
    updateButton: {
        backgroundColor: '#2C2C2C',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
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
