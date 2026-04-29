console.log("--- THE SERVER IS TRYING TO START ---");

const express = require("express");
const mqtt = require("mqtt");
const cors = require("cors");

console.log("--- LIBRARIES LOADED SUCCESSFULLY ---");

const app = express();
app.use(cors());
app.use(express.json());

const MQTT_BROKER = "mqtt://broker.hivemq.com";
const client = mqtt.connect(MQTT_BROKER);

let seats = { seat1: 0, seat2: 0, seat3: 0 };

client.on("connect", () => {
  console.log("✅ Connected to HiveMQ (The Cloud)");
  client.subscribe("epic_lab/seats/+");
});

client.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    seats[data.seatId] = data.status;
    console.log("🪑 Seat updated:", data);
  } catch (e) {
    console.log("❌ Error reading message:", e.message);
  }
});

app.get("/seats", (req, res) => {
  console.log("📱 Phone is asking for seat data...");
  res.json(seats);
});

// Using "0.0.0.0" is the secret to letting your phone talk to the laptop
app.listen(3000, "0.0.0.0", () => {
  console.log("🚀 Server running on port 3000!");
  console.log("👉 Check this on your phone: http://192.168.254.158:3000/seats");
});