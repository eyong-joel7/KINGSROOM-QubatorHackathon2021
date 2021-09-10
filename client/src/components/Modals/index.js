
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const  NotificationModal  =  ({action, actionText, rejectText, message, show, handleClose}) => {

    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {rejectText ? rejectText : "Close"}
            </Button>
            {action && (
              <Button variant="primary" onClick={action}>
                {actionText}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default NotificationModal;