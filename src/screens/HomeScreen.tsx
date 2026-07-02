import { Dispatch, SetStateAction } from 'react';
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
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const getCategoryColor = (category: Task['category']) => {
        switch (category) {
            case 'Work':
                return '#007AFF';
            case 'Personal':
                return '#34C759';
            case 'Shopping':
                return '#FF9500';
            case 'Study':
                return '#AF52DE';
            default:
                return '#8E8E93';
        }
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

                    <Pressable
                        style={{ flex: 1 }}
                        onPress={() => navigation.navigate('TaskDetails', { taskId: task.id })}
                    >
                        <Text style={styles.taskTitle}>{task.title}</Text>

                        <View
                            style={[
                                styles.categoryTag,
                                { backgroundColor: getCategoryColor(task.category) },
                            ]}
                        >
                            <Text style={styles.categoryText}>{task.category}</Text>
                        </View>
                    </Pressable>

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
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        fontSize: 20,
        marginRight: 10,
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
    categoryTag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
        marginTop: 4,
    },

    categoryText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
});