import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Task } from '../models/Task';

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export default function HomeScreen({ navigation, tasks, setTasks }: Props) {

    const toggleComplete = (id: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== id)
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Today's Tasks</Text>

            {tasks.map((task) => (
                <View key={task.id} style={styles.taskRow}>
                    <Pressable onPress={() => toggleComplete(task.id)}>
                        <Text style={styles.checkbox}>
                            {task.completed ? '☑' : '□'}
                        </Text>
                    </Pressable>

                    <Text style={styles.taskTitle}>{task.title}</Text>

                    <Pressable onPress={() => deleteTask(task.id)}>
                        <Text style={styles.deleteButton}>✕</Text>
                    </Pressable>
                </View>
            ))}

            <Pressable style={styles.fab} onPress={() => navigation.navigate('AddTask')}>
                <Text style={styles.fabText}>+</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    checkbox: {
        fontSize: 20,
        marginRight: 10,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    taskTitle: {
        flex: 1,
        fontSize: 18,
    },
    deleteButton: {
        fontSize: 18,
        color: '#FF3B30',
        paddingHorizontal: 8,
    },
});