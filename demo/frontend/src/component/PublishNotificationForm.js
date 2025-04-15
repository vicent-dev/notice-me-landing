import {FormControlLabel, Button, Checkbox, TextField} from "@mui/material";
import {Grid} from "@mui/system";
import {api} from "../util/api";
import '../index.css';
import toast from "react-hot-toast";

export default function PublishNotificationForm({clientId, clientGroupId}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const instant = event.target.instant.checked;

    api().post('/notifications', {
      "ClientId": event.target.clientId.value,
      "ClientGroupId": event.target.clientGroupId.value ?? '',
      "Body": event.target.body.value,
      "Instant": instant,
      "OriginClientId": clientId,
    })
      .then(() => {})
      .catch((error) => {
        toast.error('Something went wrong, try again later');
      });
  }

  return (
    <Grid mt={-10} container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6}>
        <form onSubmit={handleSubmit}>
          <Grid mb={4} item spacing={2}>
            <h4>To publish to all clients/groups on this server, set the Client ID/Client Group ID input value to "*".</h4>
            <ul>
              <li>User ID: <b className={'pointerOnHover'}
                              onClick={() => navigator.clipboard.writeText(clientId)}>{clientId}</b></li>
              <li>Group ID: <b className={'pointerOnHover'}
                               onClick={() => navigator.clipboard.writeText(clientGroupId)}>{clientGroupId}</b></li>
            </ul>
          </Grid>

          <Grid mb={2} item>
            <TextField
              name="clientId"
              label="Client ID"
              variant="outlined"
              defaultValue={clientId}
              required
              fullWidth
            />
          </Grid>
          <Grid mb={2} item>
            <TextField
              name="clientGroupId"
              label="Client Group ID"
              variant="outlined"
              defaultValue={clientGroupId}
              fullWidth
            />
          </Grid>
          <Grid mb={2} item>
            <TextField
              name="body"
              label="Body"
              variant="outlined"
              placeholder={"Write your notification body"}
              defaultValue={'foo bar'}
              required
              fullWidth
            />
          </Grid>
          <Grid mb={2} item>
            <FormControlLabel control={
              <Checkbox
                name="instant"
                label="Instant"
                variant="outlined"
                defaultChecked
              />
            } 
            label="Instant" 
            />
          </Grid>
          <Grid mb={2} item spacing={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Publish Notification
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
