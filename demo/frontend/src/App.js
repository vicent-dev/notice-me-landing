import './App.css';
import {Grid} from "@mui/system";
import {Box, Divider} from "@mui/joy";
import NoticeMe from "./component/NoticeMe";
import PublishNotificationForm from "./component/PublishNotificationForm";
import NotificationsList from './component/NotificationsList';
import {useState} from "react";

const clientId = crypto.randomUUID();

const groupIds = [
  'group_1',
  'group_2',
  'group_3',
  'group_4',
  'group_5',
  'group_6',
  'group_7',
  'group_8',
];

const clientGroupId = groupIds[Math.floor(Math.random() * groupIds.length)];

function App() {

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
      >
        <Box textAlign="center">
          <h1 style={{ fontSize: '3rem', color: '#3f51b5' }}>Notice-me</h1>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>
            A powerful notification system for your applications.
          </p>
        </Box>
        <PublishNotificationForm
          clientId={clientId}
          clientGroupId={clientGroupId}
        />
        <NotificationsList />
      </Grid>
      <NoticeMe
        clientId={clientId}
        clientGroupId={clientGroupId}
      />
    </>
  );
}

export default App;
