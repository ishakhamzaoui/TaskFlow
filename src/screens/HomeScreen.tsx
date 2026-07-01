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
};

const sampleTasks: Task[] = [
    {
        id: '1',
        title: 'Learn React Native',
        completed: false,
    },
    {
        id: '2',
        title: 'Buy groceries',
        completed: true,
    },
    {
        id: '3',
        title: 'Read TypeScript documentation',
        completed: false,
    },
    {
        id: '4',
        title: 'Go for a walk',
        completed: true,
    },
];

export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Today's Tasks</Text>

            {sampleTasks.map((task) => (
                <View key={task.id} style={styles.taskRow}>
                    <Text style={styles.checkbox}>
                        {task.completed ? '☑' : '□'}
                    </Text>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                </View>
            ))}

            <Pressable
                style={styles.fab}
                onPress={() => navigation.navigate('AddTask')}
            >
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
        fontSize: 18,
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
});