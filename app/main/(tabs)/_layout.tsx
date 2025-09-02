import {Tabs} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                // Estilo geral da barra de abas, traduzido do seu CSS
                tabBarStyle: {
                    backgroundColor: '#000000', // --cor-fundo-preto
                    borderTopWidth: 0, // Remove a linha superior
                    height: 90, // Altura da barra
                },
                tabBarActiveTintColor: '#FFFFFF', // Cor do ícone e texto quando ativo
                tabBarInactiveTintColor: '#888888', // Cor quando inativo
                headerShown: false, // Esconde o cabeçalho padrão de cada tela de aba
            }}
        >

            {/* Cada <Tabs.Screen> é um botão na sua barra de abas */}

            <Tabs.Screen
                // O `name` DEVE corresponder ao nome do arquivo da tela
                name="objectives/index" // Aponta para o arquivo index.tsx
                options={{
                    title: 'Objetivos', // O texto que aparece abaixo do ícone
                    // A função que renderiza o ícone
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="bullseye" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="habits/index" // Aponta para o arquivo index.tsx
                options={{
                    title: 'Hábitos',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="trophy" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="tasks/index" // Aponta para o arquivo index.tsx
                options={{
                    title: 'Tarefas',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="check-square-o" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="beliefs/index" // Aponta para o arquivo principles.tsx
                options={{
                    title: 'Princípios',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="compass" size={size} color={color} />
                    ),
                }}
            />

            {/*Hidden Tabs/ CATEGORIES | NEW | DETAILS*/}
            <Tabs.Screen
                name="categories/index"
                options={{
                    href: null,
                    title: 'Categorias',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="certificate" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="categories/categories-new"
                options={{
                    href: null,
                    title: 'Categories New',
                }}
            />
            <Tabs.Screen
                name="categories/details/[id]"
                options={{
                    href: null,
                    title: 'Categories Details',
                }}
            />
            {/*Objectives New and Details*/}
            <Tabs.Screen
                name="objectives/objectives-new"
                options={{
                    href: null,
                    title: 'Objectives New',
                }}
            />
            <Tabs.Screen
                name="objectives/details/[id]"
                options={{
                    href: null,
                    title: 'Objective Details',
                }}
            />
            {/*Habits New and Details*/}
            <Tabs.Screen
                name="habits/habits-new"
                options={{
                    href: null,
                    title: 'Habits New',
                }}
            />
            <Tabs.Screen
                name="habits/details/[id]"
                options={{
                    href: null,
                    title: 'Habits Details',
                }}
            />
            {/*Tasks New and Details*/}
            <Tabs.Screen
                name="tasks/tasks-new"
                options={{
                    href: null,
                    title: 'Tasks New',
                }}
            />
            <Tabs.Screen
                name="tasks/details/[id]"
                options={{
                    href: null,
                    title: 'Tasks Details',
                }}
            />
            {/*Beliefs New and Details*/}
            <Tabs.Screen
                name="beliefs/beliefs-new"
                options={{
                    href: null,
                    title: 'Beliefs New',
                }}
            />
            <Tabs.Screen
                name="beliefs/details/[id]"
                options={{
                    href: null,
                    title: 'Beliefs Details',
                }}
            />
        </Tabs>
    );
}
