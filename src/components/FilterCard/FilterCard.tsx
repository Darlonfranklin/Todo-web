import { Container } from "./styles";
import bell from "../../assets/bell.png";

interface FilterCardProps {
  title: string;
  actived: boolean;
}

export const FilterCard: React.FC<FilterCardProps> = ({ title, actived }) => {
  return (
    <Container actived={actived}>
      <img src={bell} alt="Filter" />
      <span>{title}</span>
    </Container>
  );
};
