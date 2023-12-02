import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import "./userTable.css";

export const UserTable = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState([]);
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

  useEffect(() => {
    fetchUsers();
    console.log("useEffect in UserTable");
  }, []);

  return (
    <table className="content-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Role</th>
          <th>Department</th>
          <th>Position</th>
          <th>Salary</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Skills</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user) => {
          return (
            <tr key={user._id}>
              <td><Link to={`/adminpage/employees/users/${user._id}`}>{user.userDetails?.id}</Link></td>
              <td>{`${user.userDetails?.firstname} ${user.userDetails?.lastname}`}</td>
              <td>{user.email}</td>
              <td>{user.userDetails?.age}</td>
              <td>{user.role}</td>
              <td>{user.userDetails?.department}</td>
              <td>{user.userDetails?.position}</td>
              <td>{user.userDetails?.salary}</td>
              <td>{user.userDetails?.address}</td>
              <td>{user.userDetails?.phone}</td>
              <td>{user.userDetails?.skills?.join(", ")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
