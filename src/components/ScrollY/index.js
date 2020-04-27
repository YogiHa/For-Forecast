import React from 'react';

export default function ScrollX(props) {
  return (
    <div
      style={{
        overflowX: 'scroll',
        overflowY: 'hidden',
        dispaly: 'none',
        height: '80%'
      }}
    >
      {props.children}
    </div>
  );
}
