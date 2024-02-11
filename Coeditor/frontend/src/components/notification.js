import "./notification.css"
const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  
  return (
    <div className="container">
    <div className="row">
        <div className="alert fade alert-simple alert-success fadeIn">
          <strong className="font__weight-semibold">{message}</strong>
        </div>
      
      </div>
      </div>
  );
};

export default Notification;
