import axios from "axios";

// Axios 기본 인스턴스 새성
const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// 인기 영화 조회
export const getPopularMovies = async () => {
    try {
        const response = await api.get("/movies/popular");
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

// 영화 검색
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

// 인기 티비쇼 조회
export const getPopularTvShows = async () => {
    try {
        const response = await api.get("/tv/popular");
        return response.data;
    } catch (error) {
        console.error("Error fetching popular tvshows: ", error);
        throw error;
    }
};

// 티비쇼 검색
export const searchTvShows = async (query) => {
    try {
        const response = await api.get(`/tv/search`, {
            params: { query },
        });
        return response.data.results || [];
    } catch (error) {
        console.error("Error searching tvshows: ", error);
        throw error;
    }
};

// 티비쇼 상세 조회
export const getTvShowDetail = async (id) => {
    try {
        const response = await api.get(`/tv/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tv detail: ", error);
        throw error;
    }
};

// 티비쇼 출연배우 조회
export const getTvShowCredits = async (id) => {
    try {
        const response = await api.get(`/tv/${id}/credits`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tv credits: ", error);
        throw error;
    }
};

// 배우 출연 영화 목록 가져오기
export const getActorMovieCredits = async (actorId) => {
    try {
        const response = await api.get(`/person/${actorId}/movie_credits`);
        return response.data;
    } catch (error) {
        console.error("Error fetching actor movie credits: ", error);
        throw error;
    }
};

// 배우 출연 TV 목록 가져오기
export const getActorTvCredits = async (actorId) => {
    try {
        const response = await api.get(`/person/${actorId}/tv_credits`);
        return response.data;
    } catch (error) {
        console.error("Error fetching actor tv credits: ", error);
        throw error;
    }
};
