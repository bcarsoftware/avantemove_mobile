import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {Link, router} from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox'; // ✨ A nova biblioteca de checkbox
import DateTimePicker from '@react-native-community/datetimepicker'; // O seletor de data

// Dados de exemplo para a lista. No futuro, isso virá de uma API.
const initialTasks = [
    { id: '1', title: 'Tarefa Um', completed: false },
    { id: '2', title: 'Tarefa Dois', completed: true },
    { id: '3', title: 'Tarefa Três', completed: false },
    { id: '4', title: 'Tarefa Quatro', completed: false },
    { id: '5', title: 'Tarefa Cinco', completed: false },
    { id: '6', title: 'Tarefa Seis', completed: true },
];

// Este é o componente que renderiza o CONTEÚDO da sua tela de tarefas.
export default function TasksScreen() {
    const [tasks, setTasks] = useState(initialTasks);
    const [fromDate, setFromDate] = useState(new Date());
    const [untilDate, setUntilDate] = useState(new Date());
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showUntilPicker, setShowUntilPicker] = useState(false);

    // Função para marcar/desmarcar uma tarefa
    const toggleTaskCompletion = (taskId: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const onChangeFromDate = (event: any, selectedDate?: Date) => {
        setShowFromPicker(false);
        if (selectedDate) setFromDate(selectedDate);
    };

    const onChangeUntilDate = (event: any, selectedDate?: Date) => {
        setShowUntilPicker(false);
        if (selectedDate) setUntilDate(selectedDate);
    };

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
                    <Text style={styles.pageTitle}>TAREFAS</Text>
                    <TouchableOpacity style={styles.newButton}
                    onPress={() => router.push("../tasks/tasks-new")}>
                        <Text style={styles.newButtonText}>Nova Tarefa</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- FILTRO DE DATAS --- */}
            <View style={styles.filterContainer}>
                <View style={styles.datePickerGroup}>
                    <Text style={styles.dateLabel}>Desde</Text>
                    <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateInput}>
                        <Text>{fromDate.toLocaleDateString('pt-BR')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.datePickerGroup}>
                    <Text style={styles.dateLabel}>Até</Text>
                    <TouchableOpacity onPress={() => setShowUntilPicker(true)} style={styles.dateInput}>
                        <Text>{untilDate.toLocaleDateString('pt-BR')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Componentes de Calendário (invisíveis até serem ativados) */}
            {showFromPicker && <DateTimePicker mode="date" value={fromDate} onChange={onChangeFromDate} />}
            {showUntilPicker && <DateTimePicker mode="date" value={untilDate} onChange={onChangeUntilDate} />}

            {/* --- LISTA DE TAREFAS --- */}
            <ScrollView contentContainerStyle={styles.mainContent}>
                <View style={styles.tasksContainer}>
                    {tasks.map((task) => (
                        <View key={task.id} style={styles.taskItem}>
                            <Checkbox
                                style={styles.checkbox}
                                value={task.completed}
                                onValueChange={() => toggleTaskCompletion(task.id)}
                                color={task.completed ? '#009CFF' : undefined}
                            />
                            <Link key={task.id} href={{
                                pathname: '../tasks/details/[id]',
                                params: {id: task.id}
                            }} asChild>
                                <TouchableOpacity style={styles.taskDescriptionContainer}>
                                    <Text style={styles.taskText}>{task.title}</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS (SEU CSS TRADUZIDO) ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7FCFF' },
    // Header
    header: { backgroundColor: '#009CFF', paddingHorizontal: 27, paddingTop: 46, paddingBottom: 20 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerTitle: { color: 'white', fontSize: 22, lineHeight: 30, fontWeight: '400' },
    headerBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
    pageTitle: { color: 'white', fontSize: 28, fontWeight: '500' },
    newButton: { backgroundColor: '#2C2C2C', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
    newButtonText: { color: '#F5F5F5', fontSize: 16 },
    // Filtro de Datas
    filterContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#F7FCFF' },
    datePickerGroup: { alignItems: 'center', gap: 5 },
    dateLabel: { fontSize: 16, color: '#333' },
    dateInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, backgroundColor: 'white' },
    // Conteúdo Principal
    mainContent: { padding: 18, paddingTop: 0 },
    tasksContainer: { backgroundColor: 'rgba(0, 156, 255, 0.13)', borderRadius: 20, padding: 15, gap: 9 },
    taskItem: { backgroundColor: 'white', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 15 },
    checkbox: { margin: 8, width: 24, height: 24, borderRadius: 4, borderWidth: 2 },
    taskDescriptionContainer: { flex: 1 },
    taskText: { fontSize: 22, color: '#000', fontWeight: '500' },
});
