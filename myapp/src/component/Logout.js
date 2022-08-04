import React, { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    localStorage.setItem("token", "");
    console.log(localStorage.getItem("token"));
  }, []);

  return <div>Logout</div>;
}
