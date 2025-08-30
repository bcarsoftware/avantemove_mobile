import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground, // Componente especial para imagens de fundo
    SafeAreaView,    // Garante que o conteúdo não fique sob os notches
    Pressable,
} from 'react-native';
import {useRouter} from "expo-router";

// Este é o componente que representa sua tela de abertura.
export default function OpeningScreen() {
    const router = useRouter();

    const handleScreenPress = () => {
        router.replace('/access/login');
    }

    // A INTERFACE (UI) - O seu HTML traduzido para componentes React Native
    // Mapeamento:
    // <body> -> <SafeAreaView> + <View>
    // <header> -> <View style={styles.header}>
    // <h1> -> <Text>
    // <main> com background-image -> <ImageBackground>
    // <div id="AppLogo"> -> <Image>
    // <footer> -> <View style={styles.footer}>
    return (
        <Pressable style={styles.pressableContainer} onPress={handleScreenPress}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* -- HEADER -- */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Avance!</Text>
                </View>

                {/* -- MAIN CONTENT com Imagem de Fundo -- */}
                <ImageBackground
                    source={require('../assets/images/gemini-smile-woman.png')}
                    style={styles.mainContent}
                    resizeMode="cover" // Equivalente a 'background-size: cover'
                >
                    {/* -- LOGO -- */}
                    <Image
                        source={require('../assets/images/avante-move-white-logo.png')}
                        style={styles.logo}
                        resizeMode="contain" // Equivalente a 'background-size: contain'
                    />
                </ImageBackground>

                {/* -- FOOTER -- */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Desperte sua melhor versão!
                    </Text>
                </View>
            </View>
        </SafeAreaView>
        </Pressable>
    );
}

// --- O ESTILO (StyleSheet) ---
// O seu CSS traduzido para objetos JavaScript.
const styles = StyleSheet.create({
    pressableContainer: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#0c69ab', // Cor do header/footer para preencher a área segura
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#111111', // Cor de fundo escura
    },
    // Estilos do Header
    header: {
        backgroundColor: '#0c69ab',
        padding: 24,
        alignItems: 'center', // text-align: center
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 42, // Tamanho de fonte fixo, mas robusto
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    // Estilos do Conteúdo Principal
    mainContent: {
        flexGrow: 1, // Ocupa todo o espaço disponível
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '85%',
        height: '60%',
        // O 'drop-shadow' do CSS não existe. Usamos 'shadow' no iOS e 'elevation' no Android.
        // Esta é a sombra para iOS:
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        // Esta é a sombra para Android:
        elevation: 10,
    },
    // Estilos do Footer
    footer: {
        backgroundColor: '#0c69ab',
        padding: 24,
        alignItems: 'center',
    },
    footerText: {
        color: '#ffffff',
        fontSize: 22,
        fontStyle: 'italic', // Equivalente a <em>
        fontFamily: 'Roboto',
    },
});
