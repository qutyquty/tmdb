import React, { useState } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';

const SearchBar = ({ onSearch, placeholder, backdropUrl }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

  return (
      <div style={{ backgroundImage: `url(${backdropUrl})`, 
        backgroundSize: "cover", backgroundPosition: "center",
        height: "400px", display: "flex", alignItems: "flex-end",
        padding: "20px", borderRadius: "10px", }}
      >
        <Form onSubmit={handleSubmit} className='mb-3 w-100'>
            <Row>
                <Col md={10}>
                    <Form.Control
                        type="text"
                        placeholder={placeholder || "검색어를 입력하세요"}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}                        
                    />
                </Col>
                <Col md={2}>
                    <Button type="submit" variant="primary" className="w-100">
                        검색
                    </Button>
                </Col>
            </Row>            
        </Form>
    </div>
  );
};

export default SearchBar;