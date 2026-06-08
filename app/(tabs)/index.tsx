import { useState } from "react";

import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

import { Picker } from "@react-native-picker/picker";




import EstacionCard from "@/components/estacion-card";
import Loading from "@/components/loading";
import { getEstacionesCCAA } from "@/services/api";
import { comunidades } from "../../data/comunidades";



export default function HomeScreen() {
  const [loading, setLoading] = useState(false);

  const [idCCAA, setIdCCAA] = useState("01");

  const [datos, setDatos] = useState<any[]>([]);

  const [error, setError] = useState<string>("");

  async function buscar() {
    try {
      setError("");
      setDatos([]);
      setLoading(true);

      console.log(`Iniciando búsqueda de estaciones para CCAA: ${idCCAA}`);

      const json = await getEstacionesCCAA(idCCAA);

      if (!json || !json.ListaEESSPrecio) {
        setError("Respuesta inválida del servidor");
        return;
      }

      if (json.ListaEESSPrecio.length === 0) {
        setError("No hay estaciones disponibles para esta comunidad");
        return;
      }

      console.log(`Estaciones cargadas: ${json.ListaEESSPrecio.length}`);
      setDatos(json.ListaEESSPrecio);
    } catch (e) {
      const mensaje = e instanceof Error ? e.message : "Error desconocido";
      console.error(`Error en búsqueda: ${mensaje}`);
      setError(`Error: ${mensaje}`);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Estaciones por Comunidad Autónoma
      </Text>

      <Picker
        selectedValue={idCCAA}
        onValueChange={setIdCCAA}
      >
        {comunidades.map((item) => (
          <Picker.Item
            key={item.id}
            label={item.nombre}
            value={item.id}
          />
        ))}
      </Picker>

      <Button
        title="Buscar estaciones"
        onPress={buscar}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={datos}
        keyExtractor={(item, index) =>
          item.IDEESS ?? index.toString()
        }
        renderItem={({ item }) => (
          <EstacionCard estacion={item} />
        )}
        ListEmptyComponent={
          !loading && !error ? (
            <Text style={styles.emptyText}>
              Selecciona una comunidad y haz clic en Buscar
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  error: {
    color: "#d32f2f",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#ffebee",
    borderRadius: 5,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});