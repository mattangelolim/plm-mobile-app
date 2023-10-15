import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "./Navbar";
// import { firebase } from "@react-native-firebase/app";
import { db } from "../config";
import { ref, onValue } from "firebase/database";

export default function HomeScreen() {
  const [sensorData, setSensorData] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const sensorRef = ref(db, "Sensor/");
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      setSensorData(data);
      console.log(data);
    });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/home.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 10 }]}
              onPress={() => alert("BOBO SI KYLE")}
            >
              <Text style={styles.buttonText}>Plant Matching</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("PlantPrefPage")}
            >
              <Text style={styles.buttonText}>Plant Preference</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.title}>Air Quality</Text>
            <Text style={styles.centeredText}>
              Temperature: {sensorData && sensorData.temperature} °C
            </Text>
            <Text style={styles.centeredText}>
              Humidity: {sensorData && sensorData.humidity} %
            </Text>
            <Text style={styles.centeredText}>
              Heat Index: {sensorData && sensorData.heat_index.toFixed(2)} °C
            </Text>
            <Text style={styles.centeredText}>
              Air Quality Index: {sensorData && sensorData.mq135Value}
            </Text>
            <Text style={styles.result}>
              Air Quality is: {sensorData && sensorData.quality}
            </Text>
          </View>
          <StatusBar style="auto" />
        </View>
      </View>
      <Navbar />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    flex: 1,
  },
  content: {
    // borderWidth: 2,
    // borderColor: "red",
    height: "80%",
    display: "flex",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginTop: "40%",
    height: "fit",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "black",
  },
  button: {
    justifyContent: "center",
    textAlign: "center",
    height: 60,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  containerText: {
    justifyContent: "flex-start",
    backgroundColor: "rgba(38, 166, 91, 0.4)",
    borderRadius: 10,
    height: "50%",
    padding: 20,
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
  },
  centeredText: {
    // justifyContent: "justify",
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    textAlign: "justify",
    marginVertical: 5,
  },
  result: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
