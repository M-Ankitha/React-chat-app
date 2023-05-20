//importing the dummy messages
import MessageData from "../components/MessageData";

//setting the message data as initial state
const initialState = MessageData;

//main reducer...it adds the message data into the message list
export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      state = [...state, action.payload];
      return state;

    default:
      return state;
  }
};
