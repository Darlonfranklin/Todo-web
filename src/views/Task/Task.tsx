import { useEffect, useState } from "react";
import { Footer, Header } from "../../components";
import typeIcons from "../../utils/typeIcons";
import api from "../../services/api";
import {
  Container,
  Form,
  Input,
  Options,
  Save,
  TextArea,
  TypeIcons,
} from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { isConnected } from "../../utils";

export const Task: React.FC = () => {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [type, setType] = useState<any>();
  const [done, setDone] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<any>();
  const [hour, setHour] = useState<any>();

  const params = useParams<any>();
  const navigate = useNavigate();

  const LoadTaskDetails = async () => {
    await api.get(`/task/${params.id}`).then((response: any) => {
      setType(response.data.type);
      setDone(response.data.done);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setDate(format(new Date(response.data.when), "yyyy-MM-dd"));
      setHour(format(new Date(response.data.when), "HH:mm"));
    });
  };

  const Saving = async () => {
    if (!title) {
      return alert("Você precisa informar título da tarefa");
    } else if (!description) {
      return alert("Você precisa informar a descrição da tarefa");
    } else if (!type) {
      return alert("Você precisa selecionar o tipo da tarefa");
    } else if (!date) {
      return alert("Você precisa selecionar o tipo de tarefa");
    }

    if (params.id) {
      await api
        .put(`/task/${params.id}`, {
          macddress: isConnected,
          type,
          done,
          title,
          description,
          when: `${date}T${hour}:00.000`,
        })
        .then(() => setRedirect(true));
    } else {
      await api
        .post("/task", {
          macddress: isConnected,
          type,
          title,
          description,
          when: `${date}T${hour}:00.000`,
        })
        .then(() => setRedirect(true))
        .catch((response: any) => {
          alert(response.data.error);
        });
    }
  };

  const Remove = async () => {
    const res = window.confirm("Deseja Realmente remover a tarefa?");
    if (res === true) {
      await api.delete(`task/${params.id}`).then(() => setRedirect(true));
    } else {
      alert("tudo bem, vamos manter");
    }
  };

  useEffect(() => {
    if (!isConnected) {
      setRedirect(true);
    }
    LoadTaskDetails();
  }, []);

  return (
    <Container>
      {redirect && navigate("/")}
      <Header />
      <Form>
        <TypeIcons>
          {typeIcons.map(
            (icon, index) =>
              index > 0 && (
                <button type="button" onClick={() => setType(index)}>
                  <img
                    src={icon}
                    alt="Tipo da Tarefa"
                    className={type && type != index && "inative"}
                  />
                </button>
              )
          )}
        </TypeIcons>

        <Input>
          <span>Título</span>
          <input
            type="text"
            placeholder="Título da tarefa..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </Input>

        <TextArea>
          <span>Descrição</span>
          <textarea
            rows={5}
            placeholder="Detalhes da tarefa..."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </TextArea>

        <Input>
          <span>Data</span>
          <input
            type="date"
            placeholder="Título da tarefa..."
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </Input>

        <Input>
          <span>Hora</span>
          <input
            type="time"
            placeholder="Título da tarefa..."
            onChange={(e) => setHour(e.target.value)}
            value={hour}
          />
        </Input>

        <Options>
          <div>
            <input
              type="checkbox"
              checked={done}
              onChange={() => setDone(!done)}
            />
            <span>CONCLUÍDO</span>
          </div>
          {params.id && (
            <button type="button" onClick={Remove}>
              EXCLUIR
            </button>
          )}
        </Options>

        <Save>
          <button type="button" onClick={Saving}>
            SALVAR
          </button>
        </Save>
      </Form>
      <Footer />
    </Container>
  );
};
