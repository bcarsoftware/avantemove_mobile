import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {Href, Link, router} from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface Belief {
    id: string;
    title: string;
    href: Href;
}

// Dados de exemplo para a lista de princípios.
const principlesData = [
    { id: '1', title: 'Princípio Um', href: '../principles/1' } as Belief,
    { id: '2', title: 'Princípio Dois', href: '../principles/2' } as Belief,
    { id: '3', title: 'Princípio Três', href: '../principles/3' } as Belief,
    { id: '4', title: 'Princípio Quatro', href: '../principles/4' } as Belief,
    { id: '5', title: 'Princípio Cinco', href: '../principles/5' } as Belief,
    { id: '6', title: 'Princípio Seis', href: '../principles/6' } as Belief,
];

// Este é o componente que renderiza o CONTEÚDO da sua tela de princípios.
export default function PrinciplesScreen() {
    return (
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
                    <Text style={styles.pageTitle}>PRINCÍPIOS</Text>
                    <TouchableOpacity style={styles.newBelief}
                                      onPress={() => router.push('../beliefs/belief-new')}>
                        <Text style={styles.newBeliefText}>Novo Princípio</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- MAIN CONTENT --- */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.beliefsContainer}>
                    {principlesData.map((principle) => (
                        <Link key={principle.id} href={principle.href} asChild>
                            <TouchableOpacity style={styles.goalItem}>
                                <Text style={styles.goalItemText}>{principle.title}</Text>
                            </TouchableOpacity>
                        </Link>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS (SEU CSS TRADUZIDO) ---
// A estrutura é idêntica à das outras telas de abas para manter a consistência.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FCFF',
    },
    // Header
    header: {
        backgroundColor: '#009CFF',
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
    newBelief: {
        backgroundColor: '#2C2C2C',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    newBeliefText: {
        color: '#F5F5F5',
        fontSize: 16,
        fontWeight: '400',
    },
    // Main Content
    mainContent: {
        padding: 18,
    },
    beliefsContainer: {
        backgroundColor: 'rgba(0, 156, 255, 0.13)',
        borderRadius: 20,
        padding: 15,
        gap: 9,
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
        color: '#000000',
        fontSize: 28,
        fontWeight: '500',
    },
});
