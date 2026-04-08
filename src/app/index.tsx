import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Crear from "../components/crear";
import Validar from "../components/validar";

export default function App() {
  const [tasks, setTasks] = useState<any[]>([]);
  const API_URL = "http://192.168.0.198:3000/tasks";

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error en la respuesta del servidor");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error conectando a la API:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do App</Text>
      <Crear onTaskCreated={fetchTasks} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Validar task={item} onUpdate={fetchTasks} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
