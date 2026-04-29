import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

// Double check this IP matches your laptop's current IP!
const API = "http://192.168.254.158:3000/seats";

export default function Index() { // Changed name to Index
  const [seats, setSeats] = useState([]);

  const loadSeats = async () => {
    try {
      const res = await axios.get(API);
      // This converts your object {seat1: 0} into an array [{id: 'seat1', status: 0}]
      setSeats(Object.entries(res.data).map(([id, status]) => ({ id, status })));
    } catch (error) {
      console.log("Waiting for server...");
    }
  };

  useEffect(() => {
    loadSeats();
    const interval = setInterval(loadSeats, 2000);
    return () => clearInterval(interval); // This cleans up when you close the app
  }, []);

  const Seat = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.status ? "#F9E0E0" : "#DFF5E8" }]}>
      <Text style={{ fontSize: 50 }}>💻</Text>
      <Text style={styles.seatLabel}>{item.id}</Text>
      <Text style={{ color: item.status ? "red" : "green", fontWeight: "bold" }}>
        {item.status ? "Occupied" : "Available"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EPIC Laboratory</Text>
      <FlatList 
        data={seats} 
        numColumns={2} 
        renderItem={Seat}
        keyExtractor={(item) => item.id} // Helps the list run smoothly
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 25, fontWeight: "bold", marginBottom: 20, textAlign: 'center' },
  card: { flex: 1, margin: 10, padding: 20, borderRadius: 20, alignItems: "center", elevation: 2 },
  seatLabel: { fontSize: 16, marginVertical: 5, fontWeight: '500' }
});