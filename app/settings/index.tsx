import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

// Dados para os botões do menu, para renderizar dinamicamente
const menuItems = [
    { title: 'Perfil', href: '../profile' },
    { title: 'PowerXP Ranking', href: '../ranking' },
    { title: 'Objetivos', href: '../main/(tabs)/objectives' },
    { title: 'Hábitos', href: '../main/(tabs)/habits' },
    { title: 'Tarefas', href: '../main/(tabs)/tasks' },
    { title: 'Princípios', href: '../main/(tabs)/beliefs' },
    { title: 'Categorias', href: '../main/(tabs)/categories' },
    { title: 'Desativar Conta', href: '../deactivate'},
    { title: 'Avançado', href: '../advanced' }
];

// Este é o componente que renderiza o CONTEÚDO da sua tela de configurações.
export default function SettingsScreen() {
    const router = useRouter();

    // Função para lidar com o logout
    const handleLogout = () => {
        Alert.alert(
            'Sair',
            'Você tem certeza que deseja sair?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: () => {
                        console.log('Usuário deslogado');
                        // Aqui iria a lógica para limpar o token e navegar para o login
                        router.replace('../access/login');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.settingsContainer}>
                {/* --- BARRA LATERAL AZUL --- */}
                <View style={styles.blueSidebar} />

                {/* --- CONTEÚDO PRINCIPAL --- */}
                <ScrollView contentContainerStyle={styles.mainContent}>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileTitle}>Olá, Abel!</Text>
                        {/* Botão de fechar (volta para a tela anterior) */}
                        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                            <FontAwesome name="times" size={30} color="#FEF7FF" />
                        </TouchableOpacity>
                    </View>

                    {/* --- BOTÕES DO MENU --- */}
                    <View style={styles.menuButtons}>
                        {menuItems.map((item) => (
                            <Link key={item.title} href={item.href as any} asChild>
                                <TouchableOpacity style={styles.menuButton}>
                                    <Text style={styles.menuButtonText}>{item.title}</Text>
                                </TouchableOpacity>
                            </Link>
                        ))}
                        {/* Botão de Sair com lógica customizada */}
                        <TouchableOpacity
                            style={[styles.menuButton, styles.logoutButton]}
                            onPress={handleLogout}
                        >
                            <Text style={styles.menuButtonText}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

// --- ESTILOS (SEU CSS TRADUZIDO) ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#000000' },
    settingsContainer: {
        flex: 1,
        flexDirection: 'row', // Para colocar a sidebar ao lado do conteúdo
    },
    blueSidebar: {
        width: 67,
        backgroundColor: '#009CFF', // --cor-fundo-azul
    },
    mainContent: {
        flex: 1, // Ocupa o resto do espaço
        backgroundColor: '#000000', // --cor-fundo-preto
        padding: 24,
        alignItems: 'center',
    },
    // Conteúdo do Menu
    profileInfo: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
    },
    profileTitle: {
        color: 'white',
        fontFamily: 'Inter',
        fontSize: 36,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
    },
    closeBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    menuButtons: {
        width: '100%',
        maxWidth: 300,
        gap: 15, // Espaçamento entre os botões
    },
    menuButton: {
        width: '100%',
        minHeight: 52, // Altura mínima para melhor toque
        backgroundColor: 'rgba(0, 156, 255, 0.7)', // --cor-botoes-azul
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButtonText: {
        color: '#FEF7FF', // --cor-texto-secundario
        fontFamily: 'Roboto',
        fontWeight: '600',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#FF0000', // --cor-botao-sair
    },
});
