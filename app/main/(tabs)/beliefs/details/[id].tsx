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

// Este é o componente que renderiza os detalhes de um princípio específico.
export default function PrincipleDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // Pega o ID da URL

    // Estados para os campos do formulário
    const [description, setDescription] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    // useEffect para buscar os dados do princípio quando a tela carregar
    useEffect(() => {
        if (id) {
            console.log('Buscando dados para o princípio com ID:', id);
            // Simulação de carregamento de dados da API
            const mockData = {
                description: `Este é o princípio número ${id}, carregado da API. Devemos sempre buscar a melhoria contínua.`,
                createdAt: new Date().toLocaleDateString('pt-BR'),
            };
            setDescription(mockData.description);
            setCreatedAt(mockData.createdAt);
        }
    }, [id]);

    // Função para atualizar o princípio
    const handleUpdate = () => {
        if (!description.trim()) {
            Alert.alert('Erro', 'A descrição não pode ficar em branco.');
            return;
        }
        Alert.alert('Sucesso', `Princípio ${id} atualizado!`);
        router.back();
    };

    // Função para excluir o princípio com confirmação
    const handleDelete = () => {
        Alert.alert(
            'Excluir Princípio',
            'Você tem certeza que deseja excluir este princípio? Esta ação é irreversível.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => {
                        console.log(`Excluindo princípio ${id}...`);
                        Alert.alert('Excluído', 'O princípio foi excluído com sucesso.');
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
                <Text style={styles.headerTitle}>Detalhes Princípio</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <FontAwesome name="times" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* --- FORMULÁRIO --- */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.formGroup}>
                    <Text style={styles.labelId}>PrincípioID: #{id}</Text>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Descrição do Princípio"
                        multiline
                        numberOfLines={6}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Criado em:</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={createdAt}
                        editable={ false }
                    />
                </View>

                <Text style={styles.validationMessage}>Você pode Atualizar ou Excluir esse Princípio.</Text>

                {/* --- BOTÕES DE AÇÃO --- */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Atualizar Princípio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Excluir Princípio</Text>
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
    textArea: {
        minHeight: 120,
        textAlignVertical: 'top',
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
