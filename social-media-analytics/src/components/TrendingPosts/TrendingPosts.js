import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import './TrendingPosts.css';

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get('http://20.244.56.144/test/posts');
        const postsData = postsResponse.data.posts;

        const postsWithCommentCount = await Promise.all(
          postsData.map(async post => {
            const commentsResponse = await axios.get(`http://20.244.56.144/test/posts/${post.id}/comments`);
            return { ...post, commentCount: commentsResponse.data.comments.length };
          })
        );

        const maxComments = Math.max(...postsWithCommentCount.map(p => p.commentCount));
        const trendingPosts = postsWithCommentCount.filter(p => p.commentCount === maxComments);
        setPosts(trendingPosts);
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
          Trending Posts
        </Typography>
        <List>
          {posts.map(post => (
            <ListItem key={post.id}>
              <ListItemText primary={post.content} secondary={`Comments: ${post.commentCount}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TrendingPosts;