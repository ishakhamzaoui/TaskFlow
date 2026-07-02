import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Task } from '../models/Task';
import { Dispatch, SetStateAction } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'> & {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export default function TaskDetailsScreen({ route, navigation, tasks, setTasks }: Props) {
  const { taskId } = route.params;
  const task = tasks.find((t) => t.id === taskId);

  // If the task no longer exists, show a message.
  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Task not found.</Text>

        <Pressable
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const [title, setTitle] = useState(task?.title ?? '');

  const handleSave = () => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, title } : t
      )
    );

    navigation.goBack();
  };

  const handleDelete = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((t) => t.id !== taskId)
    );

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Task title"
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});