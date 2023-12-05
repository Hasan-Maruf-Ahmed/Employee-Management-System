import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchAll } from "../hooks/useFetchAll";
import { Link } from "react-router-dom";
import "./userTable.css";

export const UserTable = () => {
  const { user } = useAuthContext();
  const { userData, fetchUsers } = useFetchAll();
  // const [userData, setUserData] = useState([]);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/api/getAll", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: user.token,
  //       },
  //     });
  //     const data = await response.json();
  //     if (data.length > 0) {
  //       setUserData(data);
  //     }
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      const deleteResponse = await fetch(`http://localhost:8080/api/admin/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      });

      if (deleteResponse.ok){
        fetchUsers();
      }else {
        console.log("Delete operation failed.")
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
    console.log("useEffect in UserTable");
  }, []);

  return (
    <div className="table-container">
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
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user) => {
          return (
            <tr key={user._id}>
              <td><Link to={`/adminpage/employees/users/${user._id}`}>{user.userDetails?.empid}</Link></td>
              <td>{`${user.userDetails?.firstname ? user.userDetails?.firstname : ''} ${user.userDetails?.lastname ? user.userDetails?.lastname : ''}`}</td>
              <td>{user.email}</td>
              <td>{user.userDetails?.age}</td>
              <td>{user.role}</td>
              <td>{user.userDetails?.department}</td>
              <td>{user.userDetails?.position}</td>
              <td>{user.userDetails?.salary}</td>
              <td>{user.userDetails?.address}</td>
              <td>{user.userDetails?.phone}</td>
              <td>{user.userDetails?.skills?.join(", ")}</td>
              <td><button className="del-btn" onClick={() => handleDelete(user._id)}>Delete</button></td>
              <td>{user.userDetails?.empid ? <div className="edit-btn"><Link to={`/adminpage/employees/update/${user.userDetails?._id}`}>Edit</Link></div> : ''}</td>
              
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};
