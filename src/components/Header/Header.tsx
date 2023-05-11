import { Container, LeftSide, RightSide } from "./styles";
import logo from "../../assets/logo.png";
import bell from "../../assets/bell.png";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { isConnected } from "../../utils";

interface HeaderProps {
  clickNotification?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ clickNotification }) => {
  const [lateCount, setLateCount] = useState<string>("");
  const [filterActived, setFilterActived] = useState<string>("all");

  const lateVerify = async () => {
    await api
      .get(`/task/filter/${filterActived}/${isConnected}`)
      .then((response: any) => {
        setLateCount(response.data.length);
      });
  };

  useEffect(() => {
    lateVerify();
  }, []);

  const Logout = async () => {
    localStorage.removeItem("@todo/macaddress");
    window.location.reload();
  };

  return (
    <Container>
      <LeftSide>
        <img src={logo} alt="logo" />
      </LeftSide>
      <RightSide>
        <Link to={"/"}>INÍCIO</Link>
        <span className="dividir" />
        <Link to={"/task"}>NOVA TAREFA</Link>
        <span className="dividir" />
        {!isConnected ? (
          <Link to={"/qrcode"}>SINCRONIZAR CELULAR</Link>
        ) : (
          <button type="button" onClick={Logout}>
            SAIR
          </button>
        )}
        {lateCount ? (
          <>
            <span className="dividir" />
            <button onClick={clickNotification}>
              <img src={bell} alt="Notificação" />
              <span>{lateCount}</span>
            </button>
          </>
        ) : (
          <span></span>
        )}
      </RightSide>
    </Container>
  );
};
