import React from 'react';

const terms = [
  { term: 'React', definition: 'A JavaScript library for building user interfaces, maintained by Meta.' },
  { term: 'JSX', definition: 'A syntax extension for JavaScript that looks like HTML and is used with React.' },
  { term: 'Component', definition: 'Reusable UI blocks that can be functions or classes.' },
  { term: 'Props', definition: 'Inputs to components, passed from parent to child.' },
  { term: 'State', definition: 'Internal data of a component that can change over time.' },
  { term: 'Hooks', definition: 'Functions like useState, useEffect used to use React features in functional components.' },
  { term: 'useState', definition: 'A Hook to manage state in a functional component.' },
  { term: 'useEffect', definition: 'A Hook for performing side effects like data fetching.' },
  { term: 'Virtual DOM', definition: 'A lightweight copy of the DOM that React uses to optimize rendering.' },
  { term: 'Context API', definition: 'Provides a way to pass data through the component tree without props.' },
  { term: 'React Router', definition: 'A library for handling routing in React applications.' },
  { term: 'Redux', definition: 'A state management library for global state in large apps.' },
  { term: 'Fragment', definition: 'A wrapper element to return multiple elements from a component without a div.' },
  { term: 'Suspense', definition: 'Displays fallback UI while components load asynchronously.' },
  { term: 'Error Boundary', definition: 'A component that catches JavaScript errors in the component tree.' },
];

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '2rem',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#fdfdfd',
};

const headingStyle = {
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: '2rem',
  color: '#222',
};

const termStyle = {
  borderBottom: '1px solid #ddd',
  paddingBottom: '1rem',
  marginBottom: '1rem',
};

const termTitleStyle = {
  fontSize: '1.25rem',
  color: '#007acc',
  margin: '0 0 0.25rem 0',
};

const termDefStyle = {
  margin: 0,
  color: '#555',
};

export default function ReactTermsPage() {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>React Terms – BookNest</h1>
      {terms.map(({ term, definition }) => (
        <div key={term} style={termStyle}>
          <h3 style={termTitleStyle}>{term}</h3>
          <p style={termDefStyle}>{definition}</p>
        </div>
      ))}
    </div>
  );
}
