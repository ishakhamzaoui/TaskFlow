import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import { Task } from '../models/Task';

export type RootStackParamList = {
    Home: undefined;
    AddTask: undefined;
    TaskDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', title: 'Learn React Native', completed: false },
        { id: '2', title: 'Buy groceries', completed: true },
        { id: '3', title: 'Read TypeScript documentation', completed: false },
        { id: '4', title: 'Go for a walk', completed: true },
    ]);

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

                <Stack.Screen
                    name="TaskDetails"
                    component={TaskDetailsScreen}
                    options={{ title: 'Task Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}