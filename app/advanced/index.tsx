import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox'; // O componente de checkbox do Expo

// Este é o componente que renderiza sua tela de configurações avançadas.
export default function AdvancedSettingsScreen() {
    const router = useRouter();

    // Estado para controlar o valor do checkbox
    const [isMotivationChecked, setIsMotivationChecked] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* --- BARRA LATERAL AZUL --- */}
                <View style={styles.blueSidebar} />

                {/* --- CONTEÚDO PRINCIPAL --- */}
                <ScrollView contentContainerStyle={styles.mainContent}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Mais Configurações{'\n'}Avançado</Text>
                        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                            <FontAwesome name="times" size={30} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* --- SEÇÃO DE NOTIFICAÇÕES --- */}
                    <View style={styles.sectionNotifications}>
                        <Text style={styles.sectionTitle}>Notificações</Text>

                        {/* O campo de checkbox completo. Usamos TouchableOpacity para tornar toda a área clicável. */}
                        <TouchableOpacity
                            style={styles.checkboxField}
                            onPress={() => setIsMotivationChecked(!isMotivationChecked)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.checkboxLabel}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={isMotivationChecked}
                                    onValueChange={setIsMotivationChecked}
                                    color={isMotivationChecked ? '#E8B931' : '#FFFFFF'}
                                />
                                <Text style={styles.labelText}>Enviar Mensagens Motivacionais</Text>
                            </View>
                            <Text style={styles.descriptionText}>
                                Ele utiliza os parâmetros dos seus valores e princípios e gera uma mensagem personalizada com base em IA para você.
                            </Text>
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
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    blueSidebar: {
        width: 67,
        backgroundColor: '#009CFF', // --cor-fundo-secundario
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#000000', // --cor-fundo-principal
        paddingHorizontal: 37,
        paddingVertical: 40,
    },
    // Header
    header: {
        width: '100%',
        alignItems: 'center', // Para centralizar o H1
    },
    headerTitle: {
        color: 'white',
        fontSize: 40,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 40,
    },
    closeBtn: {
        position: 'absolute',
        top: -10,
        right: -10,
    },
    // Seção de Notificações
    sectionNotifications: {
        marginTop: 50,
    },
    sectionTitle: {
        color: 'white',
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
    },
    checkboxField: {
        gap: 12,
    },
    checkboxLabel: {
        flexDirection: 'row',
        alignItems: 'center', // Alinha o checkbox com o texto
        gap: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#FFFFFF', // Borda branca para contraste
    },
    labelText: {
        flex: 1, // Permite que o texto quebre a linha se necessário
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#F3F3F3', // --cor-texto-secundario
    },
    descriptionText: {
        fontFamily: 'Inter',
        fontSize: 14, // Um pouco menor para hierarquia visual
        color: '#EBFFEE', // --cor-texto-descricao
        marginLeft: 36, // (24 do checkbox + 12 do gap) para alinhar
        lineHeight: 20,
    },
});
