// app/categories/new.tsx

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

// Este é o componente que renderiza o formulário de nova categoria.
export default function NewCategoryScreen() {
    const router = useRouter();
    // TODO: const { user } = useAuth(); // Pega os dados do usuário do contexto global
    const user = {id: 0};

    // Estado para o texto que o usuário está digitando
    const [currentCategory, setCurrentCategory] = useState('');
    // Estado para a lista de categorias que o usuário já adicionou
    const [categories, setCategories] = useState<string[]>([]);

    // Função para adicionar a categoria digitada à lista
    const handleAddCategory = () => {
        const trimmedCategory = currentCategory.trim();
        if (trimmedCategory && !categories.includes(trimmedCategory)) {
            setCategories([...categories, trimmedCategory]);
            setCurrentCategory(''); // Limpa o input
        }
    };

    // Função para remover uma categoria da lista
    const handleRemoveCategory = (indexToRemove: number) => {
        setCategories(categories.filter((_, index) => index !== indexToRemove));
    };

    // Função para criar as categorias
    const handleCreateCategories = () => {
        if (categories.length === 0) {
            Alert.alert('Nenhuma Categoria', 'Por favor, adicione pelo menos uma categoria.');
            return;
        }

        // Mapeia o array de strings para o formato que a API espera
        const newCategories = categories.map(name => ({
            userId: user.id,
            name: name,
        }));

        console.log('Criando novas categorias:', newCategories);
        // Aqui viria a lógica para enviar o array 'newCategories' para a sua API
        Alert.alert('Sucesso', `${categories.length} categoria(s) criada(s) com sucesso!`);
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Cadastrar Categoria</Text>
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
                    <Text style={styles.label}>Categorias</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={currentCategory}
                            onChangeText={setCurrentCategory}
                            placeholder="Digite uma categoria e adicione"
                            onSubmitEditing={handleAddCategory} // Adiciona ao pressionar "Enter"
                        />
                        <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
                            <Text style={styles.addButtonText}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Container para as "tags" das categorias adicionadas */}
                <View style={styles.tagsContainer}>
                    {categories.map((category, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{category}</Text>
                            <TouchableOpacity onPress={() => handleRemoveCategory(index)}>
                                <FontAwesome name="times-circle" size={20} color="#900" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.createButton} onPress={handleCreateCategories}>
                    <Text style={styles.createButtonText}>Criar Categoria(s)</Text>
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
    inputContainer: { flexDirection: 'row', gap: 10 },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 8,
        paddingHorizontal: 16,
        minHeight: 44,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#009CFF',
        paddingHorizontal: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    // Tags
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    tag: {
        flexDirection: 'row',
        backgroundColor: '#E0E0E0',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        gap: 8,
    },
    tagText: {
        fontSize: 16,
    },
    // Botão principal
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
