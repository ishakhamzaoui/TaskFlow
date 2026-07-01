import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';

export type RootStackParamList = {
    Home: undefined;
    AddTask: undefined;
    TaskDetails: undefined; // we'll add a taskId param here later
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Today\'s Tasks' }}
                />
                <Stack.Screen
                    name="AddTask"
                    component={AddTaskScreen}
                    options={{ title: 'Add Task' }}
                />
                <Stack.Screen
                    name="TaskDetails"
                    component={TaskDetailsScreen}
                    options={{ title: 'Task Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}