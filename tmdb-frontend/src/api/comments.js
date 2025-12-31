import axios from "axios";

// Axios 기본 인스턴스 새성
const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// 댓글 목록 가져오기
export const getComments = async (mtId) => {
    const response = await api.get(`/comments/${mtId}`);
    return response.data;
};

// 댓글 등록
export const addComment = async (content, mtId) => {
    const response = await api.post('/comments', {
        content,
        mtId,
    });
    return response.data;
};

// 댓글 삭제
export const deleteComment = async (id) => {
    await api.delete(`/comments/${id}`);
};
