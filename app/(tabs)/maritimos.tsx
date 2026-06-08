import { useState } from "react";
import {
    Button,
    FlatList,
    SafeAreaView,
    Text,
    View,
} from "react-native";

import { Picker } from "@react-native-picker/picker";



import Loading from "@/components/loading";
import { getMaritimosProvincia } from "../../services/api";

const provincias = [
    { nombre: "Castellón", id: 12 },
    { nombre: "Barcelona", id: 8 },
    { nombre: "Valencia", id: 46 },
    { nombre: "Alicante", id: 3 },
    { nombre: "Murcia", id: 30 },
    { nombre: "Málaga", id: 29 },
    { nombre: "Cádiz", id: 11 },
];

export default function MaritimosScreen() {
    const [loading, setLoading] = useState(false);

    const [idProvincia, setIdProvincia] =
        useState(12);

    const [datos, setDatos] =
        useState<any[]>([]);

    async function buscar() {
        try {
            setLoading(true);

            const json =
                await getMaritimosProvincia(idProvincia);

            setDatos(json.ListaEESSPrecio);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                padding: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                }}
            >
                Provincia
            </Text>

            <Picker
                selectedValue={idProvincia}
                onValueChange={(value) =>
                    setIdProvincia(value)
                }
            >
                {provincias.map((p) => (
                    <Picker.Item
                        key={p.id}
                        label={p.nombre}
                        value={p.id}
                    />
                ))}
            </Picker>

            <Button
                title="Buscar"
                onPress={buscar}
            />

            <FlatList
                data={datos}
                keyExtractor={(item) =>
                    item.IDPosteMaritimo
                }
                renderItem={({ item }) => (
                    <View
                        style={{
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 12,
                            marginVertical: 8,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            {item["Rótulo"]}
                        </Text>

                        <Text>
                            Puerto:
                            {" "}
                            {item["Puerto"]}
                        </Text>

                        <Text>
                            Municipio:
                            {" "}
                            {item["Municipio"]}
                        </Text>

                        <Text>
                            Provincia:
                            {" "}
                            {item["Provincia"]}
                        </Text>

                        <Text>
                            Gasóleo B:
                            {" "}
                            {item["Precio Gasoleo B"]}
                        </Text>

                        <Text>
                            Gasolina 95:
                            {" "}
                            {item["Precio Gasolina 95 E5"]}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}