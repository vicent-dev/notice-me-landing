import './App.css';
import {Grid} from "@mui/system";
import {Box} from "@mui/joy";
import NoticeMe from "./component/NoticeMe";
import PublishNotificationForm from "./component/PublishNotificationForm";
import NotificationsList from './component/NotificationsList';
import {Button} from "@mui/material";

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

  let host = process.env.REACT_APP_NOTICEME_API_HOST;

  if (!host) {
    host = window.location.hostname;
  }

  const protocol = window.location.protocol;

  return (
    <>
      <Box
        component="nav"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="1rem"
        bgcolor="#f5f5f5"
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#3f51b5' }}>Notice-Me</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.open(
            `${protocol}//${host}:${process.env.REACT_APP_NOTICEME_API_PORT}/api/docs`,
            '_blank')}
        >
          API Docs
        </Button>
      </Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
      >
        <Box textAlign="center">
          <h1 style={{fontSize: '3rem', color: '#3f51b5'}}>Notice-Me</h1>
          <p style={{fontSize: '1.2rem', color: '#555'}}>
            A powerful notification system for your applications.
          </p>
        </Box>
        <PublishNotificationForm
          clientId={clientId}
          clientGroupId={clientGroupId}
        />
        <NotificationsList/>
      </Grid>
      <NoticeMe
        clientId={clientId}
        clientGroupId={clientGroupId}
      />
    </>
  );
}

export default App;
