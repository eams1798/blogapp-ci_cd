import { INotification } from "../interfaces/notification";
import { useSelector } from "react-redux";
import { AppState } from "../interfaces/reducers";
import { useEffect } from "react";

const Notification = () => {
  const notification = useSelector<AppState, INotification>((state) => state.notification);

  const textAndBorderColor = notification.type === "error" ? "red" : "green";
  const styleNotif: object = {
    color: textAndBorderColor,
    background: "lightgrey",
    fontStyle: "italic",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  useEffect(() => {
    if (notification.message) {
      window.scrollTo(0, 0);
    }
  }, [notification]);

  return !notification.message ? (
    <></>
  ) : (
    <div id="notification" style={styleNotif}>
      {notification.message}
    </div>
  );
};

export default Notification;
