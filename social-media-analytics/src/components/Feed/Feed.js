import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://20.244.56.144/test/posts');
        const sortedPosts = response.data.posts.sort((a, b) => b.id - a.id);
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Feed
        </Typography>
        <List>
          {posts.map(post => (
            <ListItem key={post.id}>
              <ListItemText primary={post.content} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Feed;