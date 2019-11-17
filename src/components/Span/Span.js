import React from 'react';

const Span = ({ content, ...otherProps }) => (
    <span style={{color: "red"}} {...otherProps}>{content}</span>
);

export default Span;