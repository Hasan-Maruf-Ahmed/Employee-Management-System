import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchAll = () => {
    const [userData, setUserData] = useState([]);
    const { user } = useAuthContext();

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      });
      const data = await response.json();
      if (data.length > 0) {
        setUserData(data);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return { userData, fetchUsers };
}