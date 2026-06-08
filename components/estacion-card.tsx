import { StyleSheet, Text, View } from "react-native";

interface Props {
    estacion: any;
}

export default function EstacionCard({
    estacion,
}: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
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

            <Text>
                ⛽ Gasolina 95:
                {" "}
                {estacion["Precio Gasolina 95 E5"]}
            </Text>

            <Text>
                ⛽ Gasóleo A:
                {" "}
                {estacion["Precio Gasoleo A"]}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        elevation: 3,
    },

    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
});