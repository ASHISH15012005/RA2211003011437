import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Avatar, ListItemAvatar } from '@mui/material';
import './TopUsers.css';

const TopUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://20.244.56.144/test/users');
        const usersData = usersResponse.data.users;

        const usersWithPostCount = await Promise.all(
          Object.entries(usersData).map(async ([userId, userName]) => {
            const postsResponse = await axios.get(`http://20.244.56.144/test/users/${userId}/posts`);
            return { id: userId, name: userName, postCount: postsResponse.data.posts.length };
          })
        );

        const sortedUsers = usersWithPostCount.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        setUsers(sortedUsers);
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
          Top Users
        </Typography>
        <List>
          {users.map(user => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar>{user.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={`Posts: ${user.postCount}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TopUsers;