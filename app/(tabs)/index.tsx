import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { getConferences } from "../../db/db";

const { width } = Dimensions.get("window");
const cardWidth = (width - 40) / 2; // margen para 2 columnas

export default function Home() {
  const [conferences, setConferences] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const data = await getConferences();
      setConferences(data);
    };
    load();
  }, []);

  return (
    <FlatList
      data={conferences}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10 }}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => router.push(`/conference/${item.id}`)}>
          <View style={[styles.card, { width: cardWidth }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.speaker}>{item.speaker}</Text>
            <Text style={styles.time}>{item.startTime} - {item.endTime}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  speaker: {
    fontSize: 12,
    color: "#555",
  },
  time: {
    fontSize: 12,
    color: "#777",
  },
});
