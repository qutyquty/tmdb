import React, { useEffect, useState } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';

import { getComments, addComment, deleteComment } from '../api';

const Comments = ({ mtId }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    // DB에서 댓글 가져오기
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getComments(mtId);
                console.log("Comments get() => ", data);
                setComments(data);
            } catch (error) {
                console.error("댓글 불러오기 실패: ", error);
            }
        };
        fetchComments();
    }, [mtId]);

    // 댓글 등록
    const handleAdd = async () => {
        if (text.trim()) {
            try {
                const newComment = await addComment(text, mtId);
                setComments([...comments, newComment]);
                setText("");
            } catch (error) {
                console.error("댓글 저장 실패: ", error);
            }
        }
    };

    // 댓글 삭제
    const handleDelete = async (id) => {
        try {
            await deleteComment(id);
            setComments(comments.filter((c) => c.id !== id));
        } catch (error) {
            console.error("댓글 삭제 실패: ", error);
        }
    };

  return (
    <Card className='mt-3'>
        <Card.Header>댓글</Card.Header>
        <Card.Body>
            <ListGroup variant='flush' className='mb-3'>
                {comments.length === 0 ? (
                    <ListGroup.Item>아직 댓글이 없습니다.</ListGroup.Item>
                ) : (
                    comments.map((c) => (
                        <ListGroup.Item key={c.id}>
                            <div>{c.content}</div>
                            <div className='mt-2 text-end d-flex justify-content-between align-items-center'>
                                <small className='text-muted'>{new Date(c.createdAt).toLocaleString()}</small>
                                <Button variant='outline-danger' size="sm" onClick={() => handleDelete(c.id)}>
                                    삭제
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>

            <Form>
                <Form.Group className='mb-2' controlId='commentInput'>
                    <Form.Control type='text' placeholder='댓글을 입력하세요'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleAdd();
                            }
                        }}
                    />
                </Form.Group>
                <Button variant='primary' onClick={handleAdd} className='w-100'>등록</Button>
            </Form>
        </Card.Body>
    </Card>    
  );
};

export default Comments;
