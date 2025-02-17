import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NewLog.css";

function NewLog() {
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState({
    post: "",
    captainName: "",
    title: "",
    daysSinceLastCrisis: 0,
    mistakesWereMadeToday: false,
  });
  const navigate = useNavigate();
  const handleCheckBox = (e) => {
    setChecked(e.target.checked);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = { ...state, mistakesWereMadeToday: checked };
    console.log(newLog);
    console.log(`${process.env.REACT_APP_API_URL}/logs`);
    axios
      .post(`${process.env.REACT_APP_API_URL}/logs`, newLog)
      .then(() => navigate("/logs"))
      .catch(() => navigate("/not_found"));
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const { post, captainName, title, daysSinceLastCrisis } = state;
  return (
    <form onSubmit={handleSubmit} className="new-form">
      <label htmlFor="captainName">
        <strong>Captain's Name: </strong>
      </label>
      <br />
      <input
        id="captainName"
        type="text"
        name="captainName"
        value={captainName}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="title">
        <strong>Title</strong>
      </label>
      <br />
      <input
        id="title"
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="post">
        <strong>Post:</strong>
      </label>
      <textarea
        id="post"
        name="post"
        value={post}
        onChange={handleChange}
        placeholder="What happened today?"
      />
      <br />
      <label htmlFor="daysSinceLastCrisis">
        <strong>Days Since Last Crisis</strong>
      </label>
      <br />
      <input
        id="daysSinceLastCrisis"
        type="number"
        name="daysSinceLastCrisis"
        value={daysSinceLastCrisis}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="mistakesWereMadeToday">
        <strong>Mistakes were made today: </strong>
      </label>
      <br />
      <input
        id="mistakesWereMadeToday"
        type="checkbox"
        checked={checked}
        onChange={handleCheckBox}
      />
      <br />
      <button id="new-form-submit" type="submit">
        <strong>Submit</strong>
      </button>
    </form>
  );
}

export default NewLog;
