// app/categories.tsx

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface Category {
    id: string;
    title: string;
}

// Dados de exemplo para a lista de categorias.
const categoriesData = [
    { id: '1', title: 'Categoria Um' } as Category,
    { id: '2', title: 'Categoria Dois' } as Category,
    { id: '3', title: 'Categoria Três' } as Category,
    { id: '4', title: 'Categoria Quatro' } as Category,
    { id: '5', title: 'Categoria Cinco' } as Category,
    { id: '6', title: 'Categoria Seis' } as Category,
];

// Este é o componente que renderiza o CONTEÚDO da sua tela de categorias.
export default function CategoriesScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.mainContainer}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Link href="../../../dashboard" asChild>
                        <TouchableOpacity>
                            <Text style={styles.headerTitle}>Primeiro Nome{'\n'}@username</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="../../../settings" asChild>
                        <TouchableOpacity>
                            <FontAwesome name="gear" size={36} color="white" />
                        </TouchableOpacity>
                    </Link>
                </View>
                <View style={styles.headerBottom}>
                    <Text style={styles.pageTitle}>CATEGORIAS</Text>
                    <TouchableOpacity style={styles.newCategory}
                    onPress={() => router.push('../categories/categories-new')}>
                        <Text style={styles.newButtonText}>Nova Categoria</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- MAIN CONTENT --- */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                {/* ✨ MUDANÇA: Renomeado de 'goals-container' para 'categories-container' */}
                <View style={styles.categoriesContainer}>
                    {categoriesData.map((category: Category) => (
                        <Link key={category.id} href={{
                            pathname: '../categories/details/[id]',
                            params: {id: category.id}
                        }} asChild>
                            {/* ✨ MUDANÇA: Renomeado de 'goal-item' para 'category-item' */}
                            <TouchableOpacity style={styles.categoryItem}>
                                <Text style={styles.categoryItemText}>{category.title}</Text>
                            </TouchableOpacity>
                        </Link>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS (SEU CSS TRADUZIDO E RENOMEADO) ---
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F7FCFF', // --cor-fundo-principal
    },
    // Header
    header: {
        backgroundColor: '#009CFF', // --cor-fundo-azul
        paddingHorizontal: 27,
        paddingVertical: 46,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '400',
    },
    headerBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    pageTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: '500',
    },
    newCategory: {
        backgroundColor: '#2C2C2C',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    newButtonText: {
        color: '#F5F5F5',
        fontSize: 16,
        fontWeight: '400',
    },
    // Main Content
    mainContent: {
        padding: 18,
    },
    // ✨ MUDANÇA: Renomeado de 'goalsContainer' para 'categoriesContainer'
    categoriesContainer: {
        backgroundColor: 'rgba(0, 156, 255, 0.13)', // --cor-fundo-content
        borderRadius: 20,
        padding: 15,
        gap: 9,
    },
    // ✨ MUDANÇA: Renomeado de 'goalItem' para 'categoryItem'
    categoryItem: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        minHeight: 76,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // ✨ MUDANÇA: Renomeado de 'goalItemText' para 'categoryItemText'
    categoryItemText: {
        color: '#000000', // --cor-texto-secundário
        fontSize: 28,
        fontWeight: '500',
    },
});
