import React from 'react';
import TopUsers from './components/TopUsers/TopUsers';
import TrendingPosts from './components/TrendingPosts/TrendingPosts';
import Feed from './components/Feed/Feed';
import { AppBar, Toolbar, Typography, Container, Grid } from '@mui/material';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Social Media Analytics
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <TopUsers />
          </Grid>
          <Grid item xs={12} md={4}>
            <TrendingPosts />
          </Grid>
          <Grid item xs={12} md={4}>
            <Feed />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;