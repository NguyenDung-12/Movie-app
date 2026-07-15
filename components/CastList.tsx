import { Image } from "expo-image";
import { FlatList, StyleSheet, Text, View } from "react-native";

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CastListProps {
  cast: CastMember[];
}

export default function CastList({ cast }: CastListProps) {
  return (
    <FlatList
      horizontal
      data={cast}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{
              uri: item.profile_path
                ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
                : "https://via.placeholder.com/185x278?text=No+Image",
            }}
            style={styles.image}
            contentFit="cover"
          />

          <Text numberOfLines={1} style={styles.name}>
            {item.name}
          </Text>

          <Text numberOfLines={2} style={styles.character}>
            {item.character}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  card: {
    width: 100,
    marginRight: 15,
    alignItems: "center",
  },

  image: {
    width: 90,
    height: 120,
    borderRadius: 20,
  },

  name: {
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 8,
    fontSize: 13,
  },

  character: {
    color: "#AAA",
    fontSize: 12,
    marginTop: 2,
  },
});
