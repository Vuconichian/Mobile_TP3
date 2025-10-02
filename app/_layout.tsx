// _layout.tsx externo
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { initDB, seedData } from "../db/db";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await initDB();
      await seedData();
      setReady(true);
    };
    setup();
  }, []);

  if (!ready) return null; // o un <Loading /> bonito

  return <Stack
    screenOptions={{
        headerShown: true,           // mostrar la barra
        headerTitle: "ConfBeer", // el título que querés
      }}/>;
}
