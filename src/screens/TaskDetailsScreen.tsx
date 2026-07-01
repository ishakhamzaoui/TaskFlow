import { View, Text, StyleSheet } from 'react-native';

export default function TaskDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Task Details Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});