import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modificar from './modificar';
import Eliminar from './eliminar';
import Ver from './ver';

export default function Validar({ task, onUpdate }: any) {
  const handleToggleComplete = async () => {
  try {
    await fetch(`http://10.10.145.176:3000/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }), // Cambia de true a false o viceversa
    });
    onUpdate(); // Refresca la lista para que el cuadro cambie de color
  } catch (error) {
    console.error("Error al actualizar estado:", error);
  }
};
  return (
    <View style={styles.card}>
      <TouchableOpacity 
  style={[styles.checkbox, task.completed ? styles.checked : styles.unchecked]} 
  onPress={handleToggleComplete}
>
</TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.idText}># {task.id}</Text>
        <Text style={[styles.title, task.completed && styles.completedText]}>
          {task.title}
        </Text>
        <Text style={styles.descriptionText}>{task.description}</Text>
      </View>

      <View style={styles.actions}>
        <Ver task = {task} />
        <Modificar task={task} onUpdate={onUpdate} />
        <Eliminar id={task.id} onDelete={onUpdate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    padding: 15, 
    backgroundColor: 'white', 
    marginBottom: 10, 
    borderRadius: 8, 
    flexDirection: 'row', 
    alignItems: 'center',
    elevation: 2
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  unchecked: { borderColor: '#2d5a5a' },
  checked: { backgroundColor: '#2d5a5a', borderColor: '#2d5a5a' },
  infoContainer: { flex: 1 },
  idText: { fontSize: 10, color: '#888', fontWeight: 'bold' },
  title: { fontSize: 16, fontWeight: 'bold' },
  descriptionText: { fontSize: 13, color: '#666', marginTop: 2 },
  completedText: { textDecorationLine: 'line-through', color: 'gray' },
  actions: { flexDirection: 'row' }
});