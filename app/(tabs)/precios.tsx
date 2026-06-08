import { useState } from "react";

import {
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput
} from "react-native";

import { Picker } from "@react-native-picker/picker";


import { productos } from "../../data/productos";
import { provincias } from "../../data/provincias";

import Loading from "@/components/loading";
import PrecioCard from "@/components/themed-text";
import {
    getPrecios,
} from "../../services/api";

export default function PreciosScreen() {
    const [loading, setLoading] =
        useState(false);

    const [provincia, setProvincia] =
        useState(28);

    const [producto, setProducto] =
        useState(1);

    const [fecha, setFecha] =
        useState("12-02-2026");

    const [datos, setDatos] =
        useState<any[]>([]);

    async function buscar() {
        try {
            setLoading(true);

            const json =
                await getPrecios(
                    fecha,
                    provincia,
                    producto
                );

            const lista =
                json.ListaEESSPrecio.map(
                    (item: any) => ({
                        ...item,
                        PrecioProducto:
                            item.PrecioProducto,
                    })
                );

            setDatos(lista);
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
            style={styles.container}
        >
            <Text style={styles.title}>
                Precios Históricos
            </Text>

            <Text>
                Fecha
            </Text>

            <TextInput
                style={styles.input}
                value={fecha}
                onChangeText={setFecha}
                placeholder="12-02-2026"
            />

            <Text>
                Provincia
            </Text>

            <Picker
                selectedValue={
                    provincia
                }
                onValueChange={
                    setProvincia
                }
            >
                {provincias.map(
                    (item) => (
                        <Picker.Item
                            key={item.id}
                            label={
                                item.nombre
                            }
                            value={item.id}
                        />
                    )
                )}
            </Picker>

            <Text>
                Carburante
            </Text>

            <Picker
                selectedValue={
                    producto
                }
                onValueChange={
                    setProducto
                }
            >
                {productos.map(
                    (item) => (
                        <Picker.Item
                            key={item.id}
                            label={
                                item.nombre
                            }
                            value={item.id}
                        />
                    )
                )}
            </Picker>

            <Button
                title="Buscar precios"
                onPress={buscar}
            />

            <FlatList
                data={datos}
                keyExtractor={(
                    item,
                    index
                ) =>
                    index.toString()
                }
                renderItem={({
                    item,
                }) => (
                    <PrecioCard
                        estacion={item}
                    />
                )}
            />
        </SafeAreaView>
    );
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
        },

        title: {
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 15,
        },

        input: {
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
            marginTop: 5,
        },
    });