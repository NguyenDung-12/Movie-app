import { formatPosterUrl, type SimilarMovie } from "@/services/api";
import { FlatList, StyleSheet, View } from "react-native";
import MovieCard from "./MovieCard";

interface SimilarMoviesProps {
  movies: SimilarMovie[];
}

export default function SimilarMovies({ movies }: SimilarMoviesProps) {
  return (
    <FlatList
      horizontal
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <MovieCard
            id={item.id}
            title={item.title}
            posterUrl={formatPosterUrl(item.poster_path)}
            rating={item.vote_average}
            releaseDate={item.release_date}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  item: {
    marginRight: 15,
  },
});
