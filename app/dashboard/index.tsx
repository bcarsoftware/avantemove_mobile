import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Link, useRouter, Href } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; // A nova biblioteca de ícones

// Este é o componente que representa a sua tela de Dashboard.
export default function DashboardScreen() {
    // Estado para guardar o nome do usuário (pode vir da API no futuro)
    const [userName, setUserName] = useState('Abel');

    type infoCard = {
        title: string;
        href: Href;
        iconName: React.ComponentProps<typeof FontAwesome>["name"]
    };

    // Componente reutilizável para os cards da grade
    const InfoCard = (data: infoCard) => (
        <Link href={data.href} asChild>
            <TouchableOpacity style={styles.infoCard}>
                <View style={styles.cardIcon}>
                    {/* Usamos o componente FontAwesome em vez da etiqueta <i> */}
                    <FontAwesome name={data.iconName} size={48} color="white" />
                </View>
                <Text style={styles.infoCardTitle}>{data.title}</Text>
            </TouchableOpacity>
        </Link>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
                {/* --- HEADER --- */}
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <View>
                            <Text style={styles.headerWelcome}>Bem-vindo(a), {userName}</Text>
                            <Text style={styles.headerAppName}>Avante Move</Text>
                        </View>
                        <Link href="../settings" asChild>
                            <TouchableOpacity>
                                <FontAwesome name="gear" size={36} color="white" />
                            </TouchableOpacity>
                        </Link>
                    </View>
                    <View style={styles.headerStats}>
                        <Text style={styles.statText}># XP</Text>
                    </View>
                </View>

                {/* --- MAIN CONTENT (Sobreposto) --- */}
                <View style={styles.mainContent}>
                    <View style={styles.contentCard}>
                        <View style={styles.cardsGrid}>
                            <InfoCard iconName="bullseye" title="Objetivos" href="../main/(tabs)/objectives" />
                            <InfoCard iconName="trophy" title="Hábitos" href="../main/(tabs)/habits" />
                            <InfoCard iconName="check-square-o" title="Tarefas" href="../main/(tabs)/tasks" />
                            <InfoCard iconName="compass" title="Princípios" href="../main/(tabs)/beliefs" />
                        </View>
                    </View>
                </View>

                {/* --- MOTTO SECTION --- */}
                <View style={styles.mottoSection}>
                    <Text style={styles.mottoText}>O hábito é uma construção diária</Text>
                    <Link href="../main/(tabs)/categories" asChild>
                        <TouchableOpacity style={styles.btnCategories}>
                            <FontAwesome name="star" size={20} color="#F5F5F5" />
                            <Text style={styles.btnCategoriesText}>Categorias</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS (SEU CSS TRADUZIDO) ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F7FCFF' },
    scrollView: { flex: 1 },
    scrollContentContainer: { paddingBottom: 30 },
    // Header
    header: {
        backgroundColor: '#009CFF',
        color: 'white',
        padding: 20,
        paddingBottom: 100,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerWelcome: { fontSize: 22, color: 'white', fontWeight: '400' },
    headerAppName: { fontSize: 26, color: 'white', fontWeight: '500' },
    headerStats: { alignItems: 'center' },
    statText: { fontSize: 26, color: 'white', fontWeight: '500' },
    // Main Content
    mainContent: {
        paddingHorizontal: 20,
        marginTop: -80, // A mágica da sobreposição!
    },
    contentCard: {
        backgroundColor: 'rgba(0, 156, 255, 0.13)',
        borderRadius: 20,
        padding: 20,
        // Sombra (multiplataforma)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
    },
    // Cards Grid
    cardsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    infoCard: {
        backgroundColor: '#000000',
        borderRadius: 20,
        padding: 15,
        height: 150,
        width: '48%', // Para criar 2 colunas com espaço
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    cardIcon: {
        position: 'absolute',
        top: '20%',
    },
    infoCardTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Inter',
    },
    // Motto Section
    mottoSection: {
        backgroundColor: '#009CFF',
        paddingVertical: 40,
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        gap: 20,
    },
    mottoText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
    },
    btnCategories: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#000000',
        borderRadius: 8,
    },
    btnCategoriesText: {
        color: '#F5F5F5',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'Inter',
    },
});
