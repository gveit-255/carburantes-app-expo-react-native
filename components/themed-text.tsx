import { StyleSheet, Text, View } from "react-native";

interface Props {
  estacion: any;
}

export default function PrecioCard({
  estacion,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.rotulo}>
        {estacion["Rótulo"]}
      </Text>

      <Text>
        📍 {estacion["Dirección"]}
      </Text>

      <Text>
        🏙️ {estacion["Municipio"]}
      </Text>

      <Text>
        🗺️ {estacion["Provincia"]}
      </Text>

      <Text style={styles.precio}>
        💰 Precio:
        {" "}
        {estacion["PrecioProducto"]}
        €
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 3,
  },

  rotulo: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },

  precio: {
    marginTop: 8,
    fontWeight: "bold",
  },
});