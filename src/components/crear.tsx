import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Crear({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [text, setText] = useState('');

  //Función para enviar la tarea a la API
  const handleAdd = async () => {
    if (!text.trim()) return; // No agregar si está vacío

    try {
      const response = await fetch('http://192.168.0.198:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: text, 
          description: "Nueva tarea", //placeholder, se puede modificar en modificar dentro de la pagina :p
          completed: false 
        }),
      });

      if (response.ok) {
        setText(''); // Limpiar el input después de agregar
        onTaskCreated(); // Refrescar la lista en la pantalla principal
      }
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={text} 
        onChangeText={setText}
        placeholder="Nueva tarea..."
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={{ color: 'white' }}>+ Agregar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
  input: { flex: 1, borderBottomWidth: 1, borderColor: '#ccc', marginRight: 10, padding: 8 },
  button: { backgroundColor: '#2d5a5a', padding: 10, borderRadius: 5 }
});