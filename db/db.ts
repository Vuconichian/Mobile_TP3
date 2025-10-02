import * as SQLite from "expo-sqlite";

// Abrir DB (una sola vez)
export const dbPromise = SQLite.openDatabaseAsync("conferences_v5.db"); // nuevo nombre para crear desde cero

// Inicializar tabla
export const initDB = async () => {
    const db = await dbPromise;

    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS conferences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        speaker TEXT NOT NULL,
        startTime TEXT NOT NULL,
        endTime TEXT NOT NULL,
        image TEXT,
        latitude REAL,
        longitude REAL
    );
    `);
};

// Insertar datos de ejemplo
export const seedData = async () => {
    const db = await dbPromise;

  // Limpiar tabla
    await db.execAsync("DELETE FROM conferences;");

    const conferences = [
    { title: "Tractor", speaker: "Juan Pérez", startTime: "10:00", endTime: "11:00", image: "https://scontent.faep24-2.fna.fbcdn.net/v/t39.30808-6/494052711_1243919961072229_8218436576914685672_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFGiULM2Fe3bQclkbC0rmZsDIjPpUVKWfsMiM-lRUpZ-xKmsWWTDdEKoIaPGjMzzbHYEtdQ7kIhvIQw6QCWMSVU&_nc_ohc=Y7DO7a7if_QQ7kNvwEx4Xxy&_nc_oc=AdnwJepY1hPBQLbhhvJxyC5iMU-9ApHx2Xwh3rv3cphvbMOg2VIV4S5qCcjkK0tjKtI&_nc_zt=23&_nc_ht=scontent.faep24-2.fna&_nc_gid=YtaSGB7hPbw692j9T-vKBw&oh=00_Afac0lYGIQ-29ahWNkXJQURkxEajlsmECgS-uTsUthUmPw&oe=68E3C832", latitude: -32.481230, longitude: -58.237965 },
    { title: "7 Colinas", speaker: "María López", startTime: "11:15", endTime: "12:15", image: "https://scontent.ffdo24-3.fna.fbcdn.net/v/t51.75761-15/491442688_18378776758187020_2653509409981406616_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHP1roaDIiixnqTozkE5rf9ksEDiloaLUmSwQOKWhotSfZDBfvwyfdxwjXLVRHh69cy30_7qy99SWiYOOszWOE_&_nc_ohc=y9S8aecezl4Q7kNvwFRHclb&_nc_oc=AdnJIRr4wvfw1bpxK-cT13dbuxRPzRruHSjDYMPXoa4uu5BDCGfhaPkXB3iF60mw4E4&_nc_zt=23&_nc_ht=scontent.ffdo24-3.fna&_nc_gid=XPLJGipVksaTlnT0PyI1tg&oh=00_Afa6NRjsEiMlThPxM0f8JMlGWu3WgPgmfwfNQqa7sBAUQA&oe=68E3CE3F", latitude: -32.480001, longitude: -58.235208 },
    { title: "Drakkar", speaker: "Carlos Díaz", startTime: "12:30", endTime: "13:30", image: "https://scontent.ffdo24-3.fna.fbcdn.net/v/t39.30808-6/474114194_1024120402858544_1464177929710663466_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHqOahnUFY77kMS0MjBB1MxLsz_vONjhOYuzP-842OE5tf-QvAGNTDGQtpQ_ijuZnpt7KctO-WNIEgpif-w56Ug&_nc_ohc=88MxgCGY_bUQ7kNvwGu-_WX&_nc_oc=AdkFTJ1vlxcWHqpf_1kwE9fAyCIqfKE8jtrKm0Fo6gdZKLOq2EJfrTMaxI4g-8YDZJc&_nc_zt=23&_nc_ht=scontent.ffdo24-3.fna&_nc_gid=aQNPvFgEyvY4cKZFFPhbAQ&oh=00_Afaitk68NFVyBfi5YFeTZPYQDJ_90SOUu5fIvy_uOO0bYw&oe=68E3C07E", latitude: -32.480505, longitude: -58.233963 },
    { title: "Ambar", speaker: "Lucía Fernández", startTime: "14:00", endTime: "15:00", image: "https://www.reasonwhy.es/media/library/cerveza-ambar.jpg", latitude: -32.482282, longitude: -58.232597 },
    { title: "Klug Gebrau", speaker: "Pedro Sánchez", startTime: "15:15", endTime: "16:15", image: "https://kluggebrau.netlify.app/assets/foto2.webp", latitude: -32.482296, longitude: -58.255269 },
    { title: "Byggvir", speaker: "Ana García", startTime: "16:30", endTime: "17:30", image: "https://scontent.faep24-1.fna.fbcdn.net/v/t39.30808-6/485765616_1218530536940458_5478668833240723432_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGZxpGXwYDWtsvktM_teg9-2jq9YDNggSbaOr1gM2CBJsW4m3xb5zIiPkKbaZ48Y8J4AotWJGG5uQk7ieCoZv83&_nc_ohc=wR8vJqcN_oUQ7kNvwH15dwW&_nc_oc=AdlSYj58z4Xe7JOUTagqMm3Wn3qi7I_8dv0qG-w3xinCyeVfR451EVM3xdomTy2i2Po&_nc_zt=23&_nc_ht=scontent.faep24-1.fna&_nc_gid=TuBlZ_j83s8eUqbZOfsrbA&oh=00_Afb6VaN13GGgbkoirWRscsBWoaJQxQma5SC4iRys4O_AXw&oe=68E3C288", latitude: -32.487088, longitude: -58.233402 },
    { title: "Lagash", speaker: "Martín Romero", startTime: "17:45", endTime: "18:45", image: "https://images.untp.beer/crop?width=640&height=640&stripmeta=true&url=https://untappd.s3.amazonaws.com/photos/2024_05_26/cdb0e397f706e1ed3d6f376ba16eb7af_c_1384688071_raw.jpg", latitude: -32.480074, longitude: -58.233869 },
    { title: "Bigua", speaker: "Laura Torres", startTime: "19:00", endTime: "20:00", image: "https://esa-cdn.carta.menu/storage/media/logo/48949345/conversions/logo.jpg", latitude: -32.486433, longitude: -58.270861 },
    ];

    for (const c of conferences) {
    await db.runAsync(
        "INSERT INTO conferences (title, speaker, startTime, endTime, image, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [c.title, c.speaker, c.startTime, c.endTime, c.image, c.latitude, c.longitude]
    );
    }
};

// Obtener todas
export const getConferences = async () => {
    const db = await dbPromise;
    return await db.getAllAsync("SELECT * FROM conferences");
};

// Obtener por id
export const getConferenceById = async (id: number) => {
    const db = await dbPromise;
  return await db.getFirstAsync("SELECT * FROM conferences WHERE id = ?", [id]);
};
