import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams} from 'expo-router';

export default function EditarTarea() {
  const { id } = useLocalSearchParams(); // Obtiene el ID de la URL
  const [task, setTask] = useState({ title: '', description: '' });
  useEffect(() => {
    fetch(`http://10.10.145.176:3000/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        setTask({
          title: data.title,
          description: data.description
        });
      });
  }, [id]);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0e0e0' }}>
      <View style={styles.container}>
        <Text style={styles.label}>ID de la tarea: {id}</Text>
        
        {/* Usamos un valor por defecto para que no de error si los datos no han llegado */}
        <Text style={styles.label}>Titulo: {task.title || "Cargando..."}</Text>
        
        <Text style={styles.label}>Descripcion: {task.description || "Sin descripción"}</Text>
        
        <TouchableOpacity style={styles.Btn} onPress={() => router.back()}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a', 
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    marginVertical: 40,
    borderWidth: 1,
    borderColor: 'rgba(248, 226, 56, 0.3)', 
    shadowColor: '#800000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  label: {
    fontSize: 28,
    fontWeight: '800', // Más grueso para dar jerarquía
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  accentText: {
    color: '#38bdf8',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase', // Estilo de etiqueta/tag
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  inputLabel: {
    color: '#94a3b8', // Color grisáceo para los nombres de los campos
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  
  Btn: { backgroundColor: '#2d5a5a', padding: 15, borderRadius: 8, alignItems: 'center' }
});