
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import { Task } from '../models/Task';

const STORAGE_KEY = '@taskflow_tasks';

export type RootStackParamList = {
    Home: undefined;
    AddTask: undefined;
    TaskDetails: { taskId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedTasks !== null) {
                    setTasks(JSON.parse(storedTasks));
                }
            } catch (error) {
                console.error('Failed to load tasks:', error);
            } finally {
                setIsLoaded(true);
            }
        };

        loadTasks();
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        const saveTasks = async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
            } catch (error) {
                console.error('Failed to save tasks:', error);
            }
        };

        saveTasks();
    }, [tasks, isLoaded]);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" options={{ title: "Today's Tasks" }}>
                    {(props) => (
                        <HomeScreen {...props} tasks={tasks} setTasks={setTasks} />
                    )}
                </Stack.Screen>

                <Stack.Screen name="AddTask" options={{ title: 'Add Task' }}>
                    {(props) => (
                        <AddTaskScreen {...props} setTasks={setTasks} />
                    )}
                </Stack.Screen>

                <Stack.Screen name="TaskDetails" options={{ title: 'Task Details' }}>
                    {(props) => (
                        <TaskDetailsScreen {...props} tasks={tasks} setTasks={setTasks} />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}