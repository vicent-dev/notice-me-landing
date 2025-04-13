import {getWebsocketBaseURL} from "../util/api";
import toast, { Toaster } from 'react-hot-toast';
import React, {useEffect, useState, useRef} from "react";

export default function NoticeMe({clientId, clientGroupId}) {
  const clientRef = useRef(null);
  const [waitingToReconnect, setWaitingToReconnect] = useState(null);

  useEffect(() => {
    if (waitingToReconnect) {
      return;
    }

    // Only set up the websocket once
    if (!clientRef.current) {
      const client = new WebSocket(`${getWebsocketBaseURL()}/ws?id=${clientId}&groupId=${clientGroupId}`);
      clientRef.current = client;

      window.client = client;

      client.onclose = () => {
        if (waitingToReconnect) {
          return;
        }

        setWaitingToReconnect(true);
        setTimeout(() => setWaitingToReconnect(null), 1000);
      };

      client.onmessage = message => {
        //check errors
        try {
          let jsonMessage = JSON.parse(message.data);

          if(jsonMessage && jsonMessage['error']) {
            toast.error(() => <span dangerouslySetInnerHTML={{__html: jsonMessage['error']}}></span>);
            return;
          }
        } catch(e) { }

        toast.success(() => <>
          <span dangerouslySetInnerHTML={{__html: message.data}}></span>
        </>);
      };


      return () => {
        clientRef.current = null;
        client.close();
      }
    }
  }, [clientGroupId, clientId, waitingToReconnect]);

  return <>
    <Toaster
        position="top-right"
        reverseOrder={false}
    />
  </>;
}