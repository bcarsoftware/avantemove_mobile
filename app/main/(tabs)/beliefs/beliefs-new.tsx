// app/(tabs)/principles/new.tsx

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

// Este é o componente que renderiza o formulário de novo princípio.
export default function NewPrincipleScreen() {
    const router = useRouter();
    // TODO: const { user } = useAuth(); // Pega os dados do usuário do contexto global
    const user = {id: 0};

    // Estado para o campo de descrição
    const [description, setDescription] = useState('');

    // Função para criar o princípio
    const handleCreatePrinciple = () => {
        if (!description.trim()) {
            Alert.alert('Campo Obrigatório', 'Por favor, preencha a descrição do princípio.');
            return;
        }
        if (!user) {
            Alert.alert('Erro', 'Usuário não autenticado.');
            return;
        }

        const newPrinciple = {
            userId: user.id,
            description,
        };

        console.log('Criando novo princípio:', newPrinciple);
        // Aqui viria a lógica para enviar o 'newPrinciple' para a sua API
        Alert.alert('Sucesso', 'Princípio criado com sucesso!');
        router.back(); // Volta para a lista de princípios
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Cadastrar Princípio</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <FontAwesome name="times" size={30} color="white" />
                </TouchableOpacity>
            </View>

            {/* --- FORMULÁRIO --- */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>UserID: #{user.id}</Text>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Descrição*</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]} // Adiciona estilo de área de texto
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Descrição do Princípio"
                        multiline={true} // Permite múltiplas linhas
                        numberOfLines={6} // Altura inicial
                    />
                </View>

                <TouchableOpacity style={styles.createButton} onPress={handleCreatePrinciple}>
                    <Text style={styles.createButtonText}>Criar Princípio</Text>
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
    },
    textArea: {
        minHeight: 120, // Altura maior para a área de descrição
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
