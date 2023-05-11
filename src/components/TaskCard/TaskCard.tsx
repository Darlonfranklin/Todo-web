import { BottomCard, Container, Imagem, TopCard } from "./styles";
import { format } from "date-fns";
import typeIcons from "../../utils/typeIcons";

interface TaskCardProps {
  type: number;
  title: string;
  when: Date;
  done: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ type, title, when, done }) => {
  const date = format(new Date(when), "dd/MM/yyyy");
  const hour = format(new Date(when), "HH:mm");

  return (
    <Container done={done}>
      <TopCard>
        <Imagem src={typeIcons[type]} alt="Icone da Tarefa" />
        <h3>{title}</h3>
      </TopCard>
      <BottomCard>
        <strong>{date}</strong>
        <span>{hour}</span>
      </BottomCard>
    </Container>
  );
};
