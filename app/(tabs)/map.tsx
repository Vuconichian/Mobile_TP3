import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { getConferences } from "../../db/db";

export default function MapScreen() {
    const [conferences, setConferences] = useState<any[]>([]);

    useEffect(() => {
    const load = async () => {
      const data = await getConferences(); // Usamos la función async de db.ts
        setConferences(data);
    };
    load();
    }, []);

    return (
    <MapView
        style={{ flex: 1 }}
        initialRegion={{
        latitude: -32.4846,
        longitude: -58.2322,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
        }}
    >
        {conferences.map((conf) => (
        <Marker
            key={conf.id}
            coordinate={{
            latitude: conf.latitude,
            longitude: conf.longitude,
            }}
            title={conf.title}
            description={`${conf.speaker} - ${conf.startTime} a ${conf.endTime}`}
        />
        ))}
    </MapView>
    );
}
