import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList, // ✨ O componente ideal para listas performáticas
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

// Dados de exemplo para a lista de ranking.
// A propriedade 'isMe' será usada para o estilo especial.
const rankingData = [
    { id: '1', rank: 1, username: 'Username (Você)', xp: 50, isMe: true },
    { id: '2', rank: 2, username: 'Outro Jogador', xp: 49, isMe: false },
    { id: '3', rank: 3, username: 'Jogador_Top', xp: 47, isMe: false },
    { id: '4', rank: 4, username: 'Competidor', xp: 45, isMe: false },
    { id: '5', rank: 5, username: 'Novato', xp: 42, isMe: false },
    { id: '6', rank: 6, username: 'Estrategista', xp: 40, isMe: false },
    { id: '7', rank: 7, username: 'Persistente', xp: 38, isMe: false },
];

type Ranking = {
    rank: number;
    username: string;
    xp: number;
    isMe: boolean;
};

const months = process.env.EXPO_PUBLIC_MONTHS as unknown as string || '';

const currentMonthAndYear = (): string => {
    const date = new Date();

    const year = date.getFullYear();

    const monthIndex = date.getMonth();

    if (months.length === 0) return 'Mês/Ano';

    const month = months.split(',').map(month => month)[monthIndex];

    return `${month}/${year}`;
}

// Componente para renderizar um único item da lista
const RankingItem = (rank: Ranking) => (
    // Usamos um array de estilos para aplicar o estilo 'me' condicionalmente
    <View style={[styles.rankingItem, rank.isMe && styles.meItem]}>
        <Text style={[styles.itemText, styles.rankNumber]}>{rank.rank}.</Text>
        <Text style={[styles.itemText, styles.username]}>{rank.username}</Text>
        <Text style={[styles.itemText, styles.xp]}>{rank.xp}XP</Text>
    </View>
);

// Este é o componente que renderiza o CONTEÚDO da sua tela de ranking.
export default function RankingScreen() {
    const router = useRouter();

    const dateYear = currentMonthAndYear();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.rankingContainer}>
                {/* --- BARRA LATERAL AZUL --- */}
                <View style={styles.blueSidebar}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                        <FontAwesome name="times" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                {/* --- CONTEÚDO PRINCIPAL --- */}
                <View style={styles.rankingContent}>
                    <View style={styles.rankingHeader}>
                        <Text style={styles.headerTitle}>Power XP{'\n'}Classificação Mensal</Text>
                        <Text style={styles.headerSubtitle}>Mês: {dateYear}</Text>
                    </View>

                    {/* --- LISTA DE RANKING com FlatList --- */}
                    <FlatList
                        data={rankingData}
                        renderItem={({ item }) => (
                            <RankingItem
                                rank={item.rank}
                                username={item.username}
                                xp={item.xp}
                                isMe={item.isMe}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        style={styles.rankingList}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

// --- ESTILOS (SEU CSS TRADUZIDO) ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#009CFF' }, // Fundo azul para a área segura
    rankingContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    blueSidebar: {
        width: 64,
        backgroundColor: '#009CFF',
        alignItems: 'center',
        paddingTop: 60, // Espaço para o botão de fechar
    },
    closeBtn: {
        // Estilos do botão de fechar
    },
    rankingContent: {
        flex: 1,
        backgroundColor: '#000000',
        padding: 15,
    },
    // Títulos
    rankingHeader: {
        marginBottom: 15,
    },
    headerTitle: {
        color: 'white',
        fontSize: 32,
        fontWeight: '600',
    },
    headerSubtitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: '400',
        marginTop: 10,
    },
    // Lista de Ranking
    rankingList: {
        flex: 1,
        backgroundColor: '#009CFF',
        borderRadius: 10,
    },
    rankingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    // Estilo especial para o item do usuário
    meItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        borderBottomWidth: 0,
        marginHorizontal: 5, // Pequena margem para destacar
    },
    itemText: {
        color: '#FFFFFF', // --cor-fundo-ranking (que era branco)
        fontSize: 16,
        fontWeight: '500',
    },
    rankNumber: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    username: {
        flex: 1, // Faz o username ocupar o espaço
    },
    xp: {
        fontWeight: 'bold',
    },
});
