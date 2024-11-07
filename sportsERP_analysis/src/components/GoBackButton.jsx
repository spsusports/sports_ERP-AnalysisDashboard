import { useNavigate } from "react-router-dom";

function GoBackButton() {
  const navigate = useNavigate();

  return (
    <li className="nav-item p-1 bg-secondary bg-opacity-25 rounded">
      <span
        className="nav-link text-dark"
        onClick={() => navigate(-1)} // Goes back one step in the history stack
        style={{ cursor: 'pointer' }}
      >
        <i className="bi bi-arrow-left-square me-2"></i>Go back
      </span>
    </li>
  );
}

export default GoBackButton;
