import { useState, Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Picker } from '@react-native-picker/picker';
import { Task } from '../models/Task';
import { Category } from '../models/Task';

type AddTaskScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddTask'
>;

type Props = {
  navigation: AddTaskScreenNavigationProp;
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export default function AddTaskScreen({ navigation, setTasks }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Personal');

  const handleAdd = () => {
    if (title.trim().length === 0) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      category,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Task</Text>

      <TextInput
        style={styles.input}
        placeholder="What do you need to do?"
        value={title}
        onChangeText={setTitle}
        autoFocus
      />

      <Picker selectedValue={category}
        onValueChange={(value) => setCategory(value as Category)}
      >
        <Picker.Item label="Work" value="Work" />
        <Picker.Item label="Personal" value="Personal" />
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Study" value="Study" />
      </Picker>

      <Pressable style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>

      <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
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
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 16,
  },
});