import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Header } from "../../components";
import api from "../../services/api";
import Qr from "qrcode.react";
import { Container, Content, QrCodeArea, ValidationCode } from "./styles";
import { isConnected } from "../../utils";

export const QR: React.FC = () => {
  const [filterActived, setFilterActived] = useState<string>("all");
  const [lateCount, setLateCount] = useState<string>("");
  const [mac, setMac] = useState<any>();
  const [redirect, setRedirect] = useState<boolean>();

  const navigate = useNavigate();

  const lateVerify = async () => {
    await api
      .get(`/task/filter/${filterActived}/${isConnected}`)
      .then((response: any) => {
        setLateCount(response.data.length);
      });
  };

  const SaveMac = async () => {
    if (!mac) {
      alert("Você dever informar o MAC!");
    } else {
      await localStorage.setItem("@todo/macaddress", mac);
      setRedirect(true);
      window.location.reload();
    }
  };

  const Notification = () => {
    setFilterActived("late");
  };

  useEffect(() => {
    lateVerify();
  }, [filterActived]);

  return (
    <Container>
      <Header clickNotification={Notification} />
      {redirect && navigate("/")}
      <Content>
        <h1>CAPTURE O QRCODE PELO APP</h1>
        <p>suas atividades serão sincronizadas com a do seu celular.</p>
        <QrCodeArea>
          <Qr value="getmacaddress" size={350} />
        </QrCodeArea>
        <ValidationCode>
          <span>Digite a numeração que apareceu no celular</span>
          <input
            type="text"
            onChange={(e) => setMac(e.target.value)}
            value={mac}
          />
          <button type="button" onClick={SaveMac}>
            Sincronizar
          </button>
        </ValidationCode>
      </Content>
      <Footer />
    </Container>
  );
};
