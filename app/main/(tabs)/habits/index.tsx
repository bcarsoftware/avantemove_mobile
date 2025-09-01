import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {Link, useRouter} from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface Habit {
    id: string;
    title: string;
}

// Dados de exemplo para a lista de hábitos. No futuro, isso virá de uma API.
const habitsData = [
    { id: '1', title: 'Hábito Um' } as Habit,
    { id: '2', title: 'Hábito Dois' } as Habit,
    { id: '3', title: 'Hábito Três' } as Habit,
    { id: '4', title: 'Hábito Quatro' } as Habit,
    { id: '5', title: 'Hábito Cinco' } as Habit,
    { id: '6', title: 'Hábito Seis' } as Habit,
];

// Este é o componente que renderiza o CONTEÚDO da sua tela de hábitos.
export default function HabitsScreen() {
    const router = useRouter();

    return (
        // SafeAreaView garante que o header não fique sob o notch do celular
        <SafeAreaView style={styles.container}>
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
                    <Text style={styles.pageTitle}>HÁBITOS</Text>
                    <TouchableOpacity style={styles.newButton}
                    onPress={() => router.push("../habits/habits-new")}>
                        <Text style={styles.newButtonText}>Novo Hábito</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- MAIN CONTENT --- */}
            {/* ScrollView permite que a lista de hábitos seja rollover */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.goalsContainer}>
                    {/* Mapeamos os dados de exemplo para renderizar cada ‘item’ da lista */}
                    {habitsData.map((habit: Habit) => (
                    <Link key={habit.id} href={{
                        pathname: '../habits/details/[id]',
                        params: {id: habit.id}
                    }} asChild>
                        <TouchableOpacity style={styles.goalItem}>
                            <Text style={styles.goalItemText}>{habit.title}</Text>
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
        padding: 24,
        paddingTop: 46, // Mantendo seus paddings
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
        lineHeight: 30,
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
        fontSize: 26,
        fontWeight: '500',
    },
});
