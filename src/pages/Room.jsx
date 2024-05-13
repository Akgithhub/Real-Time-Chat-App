import React, { useEffect, useState } from "react";
import client, {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";
import { ID, Query } from "appwrite";
import Header from "../components/Header";
import { Trash2 } from "react-feather";

function Room() {
  const [messages, setmessages] = useState([]);
  const [messageBody, setmessageBody] = useState("");

  useEffect(() => {
    getMessages();
    // Websocket (Real time)
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("A message was created");
          setmessages((prevState) => [response.payload, ...messages]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A message was deleted");
          setmessages((prevState) =>
            messages.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [
        Query.orderDesc("$createdAt"), // making the messages at the top accroding to the time created
        Query.limit(20), //Limitimg the nummber of messages
      ]
    );
    console.log("RESPONSE : ", response);
    setmessages(response.documents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body: messageBody,
    };

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );

    console.log("Created:!!", response);
    // setmessages((prevState) => [response, ...messages]);
    setmessageBody("");
  };

  const deleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);
    // setmessages((prevState) =>
    //   messages.filter((message) => message.$id !== message_id)
    // );
  };

  return (
    <>
      <main className="container">
        <Header></Header>
        <div className="room--container">
          <form onSubmit={handleSubmit} id="message--form" action="">
            <div>
              <textarea
                required
                maxLength="1000"
                placeholder="Say Something..."
                onChange={(e) => {
                  setmessageBody(e.target.value);
                }}
                value={messageBody}
              ></textarea>
            </div>
            <div className="send-btn--wrapper">
              <input
                type="submit"
                value="Send"
                className="btn btn--secondary"
              />
            </div>
            <div>
              {messages.map((message) => (
                <div key={message.$id} className="message--wrapper">
                  <div className="message--header">
                    <small className="message-timestamp">
                      {new Date(message.$createdAt).toLocaleString()}
                    </small>
                    <Trash2
                      className="delete--btn"
                      onClick={() => {
                        deleteMessage(message.$id);
                      }}
                    ></Trash2>
                  </div>
                  <div className="message--body">
                    <span>{message.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Room;
