import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default function Eliminar({ id, onDelete }: { id: number, onDelete: () => void }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://10.10.145.176:3000/tasks/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onDelete(); // Refresca la lista en el index.tsx
      }
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={handleDelete}>
      <Text style={{ color: '#ff4d4d' }}>Borrar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { padding: 8, backgroundColor: '#fff0f0', borderRadius: 5, flexDirection: 'row', alignItems: 'center', marginLeft: 5 }
});