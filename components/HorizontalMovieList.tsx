import { FlatList, StyleSheet, View } from "react-native";

import MovieCard from "@/components/MovieCard";
import { formatPosterUrl, type Movie } from "@/services/api";

interface HorizontalMovieListProps {
  movies: Movie[];
}

export default function HorizontalMovieList({
  movies,
}: HorizontalMovieListProps) {
  return (
    <FlatList
      horizontal
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.card}>
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
  container: {
    paddingHorizontal: 15,
  },

  card: {
    width: 180,
    marginRight: 15,
  },
});
