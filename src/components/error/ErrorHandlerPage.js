import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const ErrorHandlerPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Žao nam je, stranica koju ste posjetili ne postoji"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("/EvidentionOfBooks");
          }}
        >
          Idite nazad
        </Button>
      }
    />
  );
};

export default ErrorHandlerPage;
