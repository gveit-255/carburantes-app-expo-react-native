import { Text, View } from "react-native";

interface Props {
    item: any;
    carburante: string;
}

export default function PrecioCard({
    item,
    carburante,
}: Props) {
    const precio = item[carburante];
    return (
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
                    fontSize: 16,
                    fontWeight: "bold",
                }}
            >
                {item["Rótulo"]}
            </Text>

            <Text>{item["Dirección"]}</Text>

            <Text>{item["Municipio"]}</Text>

            <Text>{item["Provincia"]}</Text>

            const precio = item[carburante];

            <Text
                style={{
                    marginTop: 8,
                    fontWeight: "bold",
                    color: precio ? "green" : "red",
                }}
            >
                {precio
                    ? `Precio: ${precio} €`
                    : "Precio no disponible"}
            </Text>
        </View>
    );
}