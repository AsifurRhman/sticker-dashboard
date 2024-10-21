// src/pages/NotFound/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/" style={styles.homeLink}>
        <button style={styles.button}>Go Back Home</button>
      </Link>
    </div>
  );
};

// Basic inline styles (you can replace with your own CSS or framework styles)
const styles = {
  container: {
    textAlign: 'center',
    padding: '100px 20px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '48px',
    color: '#333',
  },
  message: {
    fontSize: '24px',
    color: '#666',
    marginBottom: '20px',
  },
  homeLink: {
    textDecoration: 'none',
  },
  button: {
    backgroundColor: '#1D7151',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    fontSize: '18px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default NotFound;
