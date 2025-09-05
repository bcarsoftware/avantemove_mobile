import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from "@/context/AuthContext";

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Este é o componente que renderiza a sua tela de desativação de conta.
export default function DeactivateAccountScreen() {
    const router = useRouter();
    const { user, signOut } = useAuth();

    // Estado para o campo de confirmação
    const [confirmationInput, setConfirmationInput] = useState('');

    const fetchDeactivate = async () => {
        if (user) {
            const userId = user.id;
            const token = user.tokenAccess || '';
            const url = `${baseURL}/users/${userId}/delete`;

            const response = await fetch(
                url,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                }
            );

            if (response.ok) {
                await signOut(); // Limpa os dados do usuário do 'app'
                router.replace('../index'); // Envia o usuário para a tela inicial
            }
            else {
                const data = await response.json();
                console.error(data);

                Alert.alert('Erro ao Desativar', 'Usuário não excluído!');
            }
        }
    }

    // Função para lidar com a desativação
    const handleDeactivate = () => {
        // Validação para garantir que o usuário digitou o username/email correto
        if (!user) {
            Alert.alert("Erro Fatal!", "Usuário não está logado!");
            return;
        }

        if (confirmationInput.toLowerCase() !== user.username.toLowerCase() && confirmationInput.toLowerCase() !== user.email.toLowerCase()) {
            Alert.alert('Confirmação Inválida', 'O nome de usuário ou email não corresponde ao seu. Por favor, tente novamente.');
            return;
        }

        // Alerta de confirmação nativo
        Alert.alert(
            'Desativar Conta',
            'Você tem certeza que deseja desativar sua conta? Você poderá reativá-la fazendo login novamente.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Desativar',
                    style: 'destructive',
                    onPress: async () => {
                        console.log(`Desativando conta para o usuário: ${user.id}`);
                        await fetchDeactivate();
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>AvanteMove</Text>
                <Text style={styles.subtitle}>Desativar Conta</Text>

                <View style={styles.enunciateContainer}>
                    <Text style={styles.enunciateText}>• Você pode voltar depois</Text>
                    <Text style={styles.enunciateText}>
                        <Text style={{ fontWeight: 'bold' }}>• Para excluir seus dados permanentemente</Text>, entre em contato!
                    </Text>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Para confirmar, digite seu Usuário ou Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={confirmationInput}
                        onChangeText={setConfirmationInput}
                        placeholder='@username'
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.button, styles.deactivateButton]} onPress={handleDeactivate}>
                        <Text style={styles.buttonText}>Desativar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => router.back()}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

// --- ESTILOS (SEU CSS TRADUZIDO) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111', // --black-color
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    subtitle: { fontSize: 20, color: '#333', marginBottom: 20 },
    enunciateContainer: {
        marginBottom: 20,
        alignSelf: 'flex-start',
        gap: 8,
    },
    enunciateText: {
        fontSize: 14,
        color: '#0c69ab', // --blue-color
        textAlign: 'left',
    },
    formGroup: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deactivateButton: {
        backgroundColor: '#dc3545', // --red-color
    },
    cancelButton: {
        backgroundColor: '#0c69ab', // --blue-color
    },
});
