// app/(tabs)/objectives/index.tsx

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Link, router} from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface Objective {
    id: string;
    title: string;
}

// Dados de exemplo para a lista de objetivos. No futuro, isso virá de uma API.
const objectivesData = [
    { id: '1', title: 'Objetivo Um' } as Objective,
    { id: '2', title: 'Objetivo Dois' } as Objective,
    { id: '3', title: 'Objetivo Três' } as Objective,
    { id: '4', title: 'Objetivo Quatro' } as Objective,
    { id: '5', title: 'Objetivo Cinco' } as Objective,
    { id: '6', title: 'Objetivo Seis' } as Objective,
];

// Este é o componente que renderiza o CONTEÚDO da sua tela de objetivos.
export default function ObjectivesScreen() {
    return (
        // SafeAreaView garante que o header não fique sob o notch do celular
        <SafeAreaView style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Link href="../../../dashboard" asChild>
                        <TouchableOpacity>
                            {/* O '\n' dentro de um <Text> funciona como o <br> do HTML */}
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
                    <Text style={styles.pageTitle}>OBJETIVOS</Text>
                    <TouchableOpacity style={styles.newButton}
                    onPress={() => router.push('../objectives/objectives-new')}>
                        <Text style={styles.newButtonText}>Novo Objetivo</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- MAIN CONTENT --- */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.goalsContainer}>
                    {/* Mapeamos os dados de exemplo para renderizar cada ‘item’ da lista */}
                    {objectivesData.map((objective: Objective) => (
                        <Link key={objective.id} href={{
                            pathname: '../objectives/details/[id]',
                            params: {id: objective.id}
                        }} asChild>
                            <TouchableOpacity style={styles.goalItem}>
                                <Text style={styles.goalItemText}>{objective.title}</Text>
                            </TouchableOpacity>
                        </Link>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS (SEU CSS TRADUZIDO) ---
const styles = StyleSheet.create({
    container: {
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
    newButton: {
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
    goalsContainer: {
        backgroundColor: 'rgba(0, 156, 255, 0.13)', // --cor-fundo-content
        borderRadius: 20,
        padding: 15,
        gap: 9, // Espaçamento entre os itens
    },
    goalItem: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        minHeight: 76,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goalItemText: {
        color: '#000000', // --cor-texto-secundário
        fontSize: 28,
        fontWeight: '500',
    },
});
