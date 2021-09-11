import { useState } from "react";
import NotificationModal from "./Modals";

const Notifications = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <NotificationModal
      show={show}
      handleClose={handleClose}
      actionText={`Accept`}
      rejectText={`Reject`}
    />
  );
};

export default Notifications;
