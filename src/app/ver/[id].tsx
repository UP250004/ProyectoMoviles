import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams, useRouter} from 'expo-router';

export default function EditarTarea() {
  const { id } = useLocalSearchParams(); // Obtiene el ID de la URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    fetch(`http://192.168.0.198:3000/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setDescription(data.description);
      });
  }, [id]);


  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID de la tarea: {id}</Text>
      
      <Text 
        style={styles.label} 
      >Titulo: {title}</Text>
      <Text 
        style={styles.label} 
      >Descripcion: {description}</Text>
      <TouchableOpacity style={styles.Btn} onPress={ router.back}>
      <Text style={{ color: 'white' }}>Regresar</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 250,
    padding: 20,
    backgroundColor: '#001d60',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#38BDF8',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F1F5F9',
    marginBottom: 15,
  },
  accentText: {
    color: '#38BDF8',
    fontWeight: '600',
  },
  
  Btn: { backgroundColor: '#2d5a5a', padding: 15, borderRadius: 8, alignItems: 'center' }
});