import { useState } from "react";
import "./styles.css";

export default function App() {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);

  const eventHandler = (e) => {
    e.preventDefault();
    handleClick(value);
  };

  const handleClick = (value) => {
    fetch(`https://api.github.com/search/users?q=${value}`)
      .then((res) => res.json())
      .then((data) => setUsers(data.items));
  };

  const showUserCard = users.map((user) => {
    return (
      <div key={user.id} className="card-item">
        <img src={user.avatar_url} alt={user.login} />
        <a href={user.html_url} target="_blank">
          {user.login}
        </a>
      </div>
    );
  });

  return (
    <div className="App">
      <h1>Github User Search</h1>
      <form>
        <input onChange={(e) => setValue(e.target.value)} value={value} />
        <button onClick={eventHandler}> Search </button>
      </form>
      <div className="card">{showUserCard}</div>
    </div>
  );
}
