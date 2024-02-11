import "./errorMessage.css"
const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div className="container1">
    <div className="row">
        <div className="alert fade1 alert-simple1 alert-success1">
          <strong className="font__weight-semibold1">{message}</strong>
        </div>
      
      </div>
      </div>
  );
};

export default ErrorMessage;
