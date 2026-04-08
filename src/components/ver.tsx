import { useRouter } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Ver({ task }: any) {
  const router = useRouter();
  return (
    <TouchableOpacity 
      style={styles.btn} 
      onPress={() => router.push(`../ver/${task.id}`)}
    >
      <Text>Ver</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { padding: 8, backgroundColor: '#f0f0f0', borderRadius: 5, marginRight: 5 }
});