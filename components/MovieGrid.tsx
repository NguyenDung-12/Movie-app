import MovieCard from "@/components/MovieCard";
import { formatPosterUrl } from "@/services/api";
import { FlatList, StyleSheet } from "react-native";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
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
          id={item.id}
          title={item.title}
          posterUrl={formatPosterUrl(item.poster_path)}
          rating={item.vote_average}
          releaseDate={item.release_date}
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
