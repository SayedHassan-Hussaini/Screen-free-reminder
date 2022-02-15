import { configureStore } from "@reduxjs/toolkit";
import screenReminderSclice from "./screenReminderSclice";

export default configureStore({
  reducer: {
    screen: screenReminderSclice
  },
});
