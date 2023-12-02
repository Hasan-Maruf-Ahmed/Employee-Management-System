import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./userDetails.css";

export const UserDetails = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/${id}`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Authorization: user.token,
            },
          });

          if (!response.ok){
            throw new Error("Failed to fetch user details");
          }

          const data = await response.json();
          setUserDetails(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserDetails();
    }, [id, user.token]);

    if(!userDetails){
      return <p>Loading...</p>
    }

  return (
    <div className="user-details">
      <h2>Personal Details :</h2>
        <p><span>User name: </span> {userDetails.username}</p>
        <p><span>First name: </span> {userDetails.userDetails.firstname}</p>
        <p><span>Last name: </span> {userDetails.userDetails.lastname}</p>
        <p><span>Age: </span> {userDetails.userDetails.age}</p>
        <h2>Education :</h2>
        <p><span>Degree: </span> {userDetails.userDetails.education.degree}</p>
        <p><span>University: </span> {userDetails.userDetails.education.university}</p>
        <p><span>Graduation Year: </span> {userDetails.userDetails.education.graduationyear}</p>
        <h2>Workplace Details :</h2>
        <p><span>Employee ID: </span> {userDetails.userDetails.id}</p>
        <p><span>Role: </span> {userDetails.role}</p>
        <p><span>Position: </span> {userDetails.userDetails.position}</p>
        <p><span>Department: </span> {userDetails.userDetails.department}</p>
        <p><span>Skills: </span> {userDetails.userDetails.skills.join(", ")}</p>
        <p><span>Salary: </span> {userDetails.userDetails.salary}</p>
        <p><span>Joining Date: </span> {userDetails.userDetails.joiningdate}</p>
        <h2>Contact :</h2>
        <p><span>Email: </span> {userDetails.email}</p>
        <p><span>Address: </span> {userDetails.userDetails.address}</p>
        <p><span>Phone: </span> {userDetails.userDetails.phone}</p>
    </div>
  )
}
