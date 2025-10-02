import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { getConferenceById } from "../../db/db";

export default function ConferenceDetail() {
    const { id } = useLocalSearchParams();
    const [conference, setConference] = useState<any>(null);

    useEffect(() => {
    const load = async () => {
        if (id) {
        const conf = await getConferenceById(Number(id));
        setConference(conf);
        }
    };
    load();
    }, [id]);

    if (!conference) return <Text>Cargando...</Text>;

    return (
    <View style={{ padding: 20 }}>
        <Image source={{ uri: conference.image }} style={{ width: "100%", height: 200, marginBottom: 20 }} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{conference.title}</Text>
        <Text>Disertante: {conference.speaker}</Text>
        <Text>Horario: {conference.startTime} - {conference.endTime}</Text>
    </View>
    );
}
