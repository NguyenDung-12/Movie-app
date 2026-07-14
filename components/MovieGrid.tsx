import MovieCard from "@/components/MovieCard";
import { formatPosterUrl } from "@/services/api";
import { FlatList, StyleSheet } from "react-native";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieGridProps {
  movies: Movie[];
}

console.log("--- ĐANG LOAD MOVIEGRID ---");
export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <MovieCard
          title={item.title}
          posterUrl={formatPosterUrl(item.poster_path)}
        />
      )}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  row: {
    justifyContent: "space-between",
  },
});
