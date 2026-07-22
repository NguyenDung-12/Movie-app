import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("Khong tim thay TMDB API key");
}
const BASE_URL = "https://api.themoviedb.org/3";

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}
export interface MovieDetail extends Movie {
  overview: string;
  backdrop_path: string;
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
}
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}
export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}
export interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}
export interface SearchMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}
export const getPopularMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const response = await apiClient.get("/movie/popular", {
      params: {
        page,
      },
    });

    return response.data.results ?? [];
  } catch (error) {
    console.log("Get popular movies error:", error);
    return [];
  }
};
export const getTopRatedMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get("/movie/top_rated");

    return response.data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
};
export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiClient.get("/trending/movie/day");

    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export const getMovieDetail = async (id: number): Promise<MovieDetail> => {
  const response = await apiClient.get(`/movie/${id}`);
  return response.data;
};
export const formatPosterUrl = (posterPath: string) => {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};
export const getMovieVideos = async (id: number): Promise<MovieVideo[]> => {
  const response = await apiClient.get(`/movie/${id}/videos`);
  return response.data.results;
};
export const getMovieCredits = async (id: number): Promise<CastMember[]> => {
  const response = await apiClient.get(`/movie/${id}/credits`);
  return response.data.cast;
};
export const getSimilarMovies = async (
  movieId: number,
): Promise<SimilarMovie[]> => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/similar`);

    return response.data.results ?? [];
  } catch (error) {
    console.log("Get similar movies error:", error);
    return [];
  }
};
export const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<SearchMoviesResponse> => {
  const keyword = query.trim();

  if (!keyword) {
    return {
      results: [],
      page: 1,
      total_pages: 0,
    };
  }

  try {
    const response = await apiClient.get("/search/movie", {
      params: {
        query: keyword,
        page,
        include_adult: false,
      },
    });

    console.log("TMDB search:", response.data);

    return {
      results: Array.isArray(response.data.results)
        ? response.data.results
        : [],
      page: response.data.page ?? page,
      total_pages: response.data.total_pages ?? 0,
    };
  } catch (error) {
    console.log("Search movies error:", error);

    return {
      results: [],
      page,
      total_pages: 0,
    };
  }
};
