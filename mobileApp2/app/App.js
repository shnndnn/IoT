import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const API = "http://192.168.254.158:3000/seats";

export default function App() {
  const [seats,setSeats]=useState([]);

  const loadSeats=async()=>{
    const res=await axios.get(API);
    setSeats(Object.entries(res.data).map(([id,status])=>({id,status})));
  };

  useEffect(()=>{
    loadSeats();
    setInterval(loadSeats,2000);
  },[]);

  const Seat=({item})=>(
    <View style={[styles.card,{backgroundColor:item.status? "#F9E0E0":"#DFF5E8"}]}>
      <Text style={{fontSize:50}}>💻</Text>
      <Text>{item.id}</Text>
      <Text style={{color:item.status?"red":"green"}}>
        {item.status?"Occupied":"Available"}
      </Text>
    </View>
  );

  return(
    <View style={styles.container}>
      <Text style={styles.title}>EPIC Laboratory</Text>
      <FlatList data={seats} numColumns={2} renderItem={Seat}/>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{flex:1,paddingTop:60,padding:20},
  title:{fontSize:25,fontWeight:"bold"},
  card:{flex:1,margin:10,padding:30,borderRadius:20,alignItems:"center"}
});