import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const SearchBar = ({ onSearch, placeholder }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

  return (
    <Form onSubmit={handleSubmit} className='mb-3'>
        <InputGroup>
            <Form.Control type='text' value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder || "검색어를 입력하세요"}
            />
            <Button type="submit" variant='primary'>검색</Button>
        </InputGroup>
    </Form>
  );
};

export default SearchBar;