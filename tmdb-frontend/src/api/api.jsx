import axios from "axios";

// Axios 기본 인스턴스 새성
const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// 인기 영화 조회
export const getPopularMovies = async () => {
    try {
        const response = await api.get("/movies/popular");
        console.log("api.jsx => ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching popular movies: ", error);
        throw error;
    }
};

// 영화 상세 조회
export const getMovieDetail = async (id) => {
    try {
        const response = await api.get(`/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie detail: ", error);
        throw error;
    }
};

// 검색
export const searchMovies = async (query) => {
    try {
        const response = await api.get(`/movies/search`, {
            params: { query },
        });
        return response.data.results || [];
    } catch (error) {
        console.error("Error searching movies: ", error);
        throw error;
    }
};

// 배우 상세 조회 API
export const getActorDetail = async (id) => {
    try {
        const response = await api.get(`/movies/actors/${id}/detail`);
        return response.data; // { actor: {...}, cast: [...] } 형태
    } catch (error) {
        console.error("배우 상세 조회 API 호출 에러: ", error);
        throw error;
    }
};
