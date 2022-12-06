import { Link, useNavigation } from "react-router-dom";

export const Welcome: React.FC = () => {
  return (
    <div>
      <h2>Welcome</h2>
      <Link to="/game">
        <button>START</button>
      </Link>
    </div>
  );
};
