import axios from "axios";
import React, { useEffect, useState } from "react";

export default function List() {
  const [list, setList] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/loadall", {
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("token"),
        },
      });
      console.log(data);
      setList(data);
    } catch (e) {
      setErr(true);
      console.log(e);
    }
  };

  return (
    <div>
      {/* {JSON.stringify(list)} */}
      <ol>
        {list.length > 0 &&
          list.map((element) => (
            <li key={element._id}>
              {element.name} -- {element.email}
            </li>
          ))}
      </ol>
      {err && <h2>Access denied</h2>}
    </div>
  );
}
