import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FilterCard, Footer, Header, TaskCard } from "../../components";
import api from "../../services/api";
import { isConnected } from "../../utils";
import { Container, Content, FilterArea, Title } from "./styles";

export function Home() {
  const [filterActived, setFilterActived] = useState<string>("all");
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const loadTasks = async () => {
    await api
      .get(`/task/filter/${filterActived}/${isConnected}`)
      .then((response: any) => {
        setTasks(response.data);
      });
  };

  const Notification = () => {
    setFilterActived("late");
  };

  useEffect(() => {
    loadTasks();

    if (!isConnected) {
      navigate("/qrcode");
    }
  }, [filterActived, loadTasks]);

  return (
    <Container>
      <Header clickNotification={Notification} />
      <FilterArea>
        <button type="button" onClick={() => setFilterActived("all")}>
          <FilterCard title="Todos" actived={filterActived === "all"} />
        </button>

        <button type="button" onClick={() => setFilterActived("today")}>
          <FilterCard title="Hoje" actived={filterActived === "today"} />
        </button>

        <button type="button" onClick={() => setFilterActived("week")}>
          <FilterCard title="Semana" actived={filterActived === "week"} />
        </button>

        <button type="button" onClick={() => setFilterActived("month")}>
          <FilterCard title="Mês" actived={filterActived === "month"} />
        </button>

        <button type="button" onClick={() => setFilterActived("year")}>
          <FilterCard title="Ano" actived={filterActived === "year"} />
        </button>
      </FilterArea>

      <Title>
        <h3>{filterActived == "late" ? "TAREFAS ATRASADAS" : "TAREFAS"}</h3>
      </Title>

      <Content>
        {tasks.map((t: any) => (
          <Link to={`/task/${t._id}`}>
            <TaskCard
              type={t.type}
              title={t.title}
              when={t.when}
              done={t.done}
            />
          </Link>
        ))}
      </Content>

      <Footer />
    </Container>
  );
}
