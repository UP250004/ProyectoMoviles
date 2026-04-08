import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function EditarTarea() {
  const { id } = useLocalSearchParams(); // Obtiene el ID de la URL
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    fetch(`http://10.10.145.176:3000/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setDescription(data.description);
      });
  }, [id]);

  const handleSave = async () => {
  try {
    const datos = { title, description };
    console.log("2. Enviando datos:", datos);

    const response = await fetch(`http://10.10.145.176:3000/tasks/${id}`, {
      method: 'PATCH',//solo se actualizan los campos que se envían, no es necesario enviar el objeto completo
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),//en este caso solo se envia el título y la descripción, el campo "completed" no se toquetea.
    });

    console.log("Respuesta recibida. Status:", response.status);

    if (response.ok) {
      console.log("¡Éxito! Volviendo al inicio");
      router.replace('/');
    }
  } catch (error) {
    console.error("ERROR EN FETCH:", error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID de la tarea: {id}</Text>
      
      <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Título" 
      />
      
      <TextInput 
        style={[styles.input, { height: 100 }]} 
        value={description} 
        onChangeText={setDescription} 
        placeholder="Descripción" 
        multiline 
      />
<TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
  <Text style={{ color: 'white' }}>Guardar Cambios</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  label: { fontSize: 12, color: 'gray', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 20 },
  saveBtn: { backgroundColor: '#2d5a5a', padding: 15, borderRadius: 8, alignItems: 'center' }
});