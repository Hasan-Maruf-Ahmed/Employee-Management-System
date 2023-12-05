import { useParams, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import './userpage.css';

export const UserPage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const {dispatch} = useAuthContext();
  const [error, setError] = useState('');
  const [isDetailsExist, setIsDetailsExist] = useState(false);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    age: "",
    position: "",
    phone: "",
    address: "",
    department: "",
    skills: "",
    salary: "",
    education: {
      degree: "",
      university: "",
      graduationyear: "",
    },
    empid: "",
  });
  const Navigate = useNavigate();
  
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('user'));

  const fetchUserDetails = async () => {
    try {
      if (user && userdata.detailsid) {
        const response = await fetch(
          `http://localhost:8080/api/details/${userdata.detailsid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: user.token,
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          setIsDetailsExist(false);
          console.log(error);
          throw new Error("Failed to fetch user details");
        } else {
            setIsDetailsExist(true);
          }
        
        setValues({
          ...values,
          firstname: data.firstname,
          lastname: data.lastname,
          age: data.age,
          position: data.position,
          phone: data.phone,
          address: data.address,
          department: data.department,
          salary: data.salary,
          skills: data.skills.join(", "),
          education: {
            degree: data.education.degree,
            university: data.education.university,
            graduationyear: data.education.graduationyear,
          },
          empid: data.empid,
        });
          console.log(data.age);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    dispatch({ type: 'LOGIN', payload: userdata });
    fetchUserDetails();
  }
  }, [id]);

  const handleClick = (e) => {
    e.preventDefault();
    Navigate(`adddetails/${id}`);
  }
  const { logout } = useLogout();
  // const { user }= useAuthContext();
  const handleLogout = () => {
    logout();
  }

  return (
    <div className="container">
      <button className="user-logout-btn" onClick={handleLogout}>Logout</button>
    <div className="user-container">
      <div className="userbox">
        <form className="userForm" onSubmit={handleClick}>
          <div className="section">
            <div className="user-section">
              <label className="userLabel">First name:</label>
              <input
                className="userInput"
                type="text"
                // placeholder="Enter your first name"
                defaultValue={values.firstname}
                
              />
            </div>
            <div className="user-section">
              <label className="userLabel">Last name:</label>
              <input
                className="userInput"
                type="text"
                readOnly
                // placeholder="Enter your last name"
                defaultValue={values.lastname}
                
              />
            </div>
          </div>
          <label className="userLabel">Age:</label>
          <input
            className="userInput"
            type="text"
            // placeholder="Enter your Age"
            readOnly
            defaultValue={values.age}
            
          />
          <div className="section">
            <div className="user-section">
              <label className="userLabel">Department:</label>
              <input
                className="userInput"
                type="text"
                // placeholder="Enter your department"
                readOnly
                defaultValue={values.department}
                
              />
            </div>
            <div className="user-section">
              <label className="userLabel">Position:</label>
              <input
                className="userInput"
                type="text"
                // placeholder="Enter your position"
                readOnly
                defaultValue={values.position}
               
              />
            </div>
          </div>
          <div className="section">
            <div className="user-section">
              <label className="userLabel">Address:</label>
              <input
                className="userInput"
                type="text"
                // placeholder="Enter your Address"
                readOnly
                defaultValue={values.address}
                
              />
            </div>
            <div className="user-section">
              <label className="userLabel">Phone:</label>
              <input
                className="userInput"
                type="text"
                // placeholder="Enter your Phone Number"
                readOnly
                defaultValue={values.phone}
                
              />
            </div>
          </div>
          <label className="userLabel">Education:</label>
          <div className="sub-section">
            <div className="user-section">
              <label className="userLabel">Degree:</label>
              <input
                className="sub-userInput"
                type="text"
                // placeholder="Enter your Degree"
                readOnly
                value={values.education.degree}
              />
            </div>
            <div className="user-section">
              <label className="userLabel">University:</label>
              <input
                className="sub-userInput"
                type="text"
                // placeholder="Enter your University name"
                readOnly
                value={values.education.university}
              />
            </div>
            <div className="user-section">
              <label className="userLabel">Graduation Year:</label>
              <input
                className="sub-userInput"
                type="text"
                readOnly
                // placeholder="Enter your Graduation Year"
                value={values.education.graduationyear}
              />
            </div>
          </div>
          <label className="userLabel">Salary:</label>
          <input
            className="userInput"
            type="text"
            // placeholder="Enter your salary"
            readOnly
            defaultValue={values.salary}
           
          />
          <label className="userLabel">Skills:</label>
          <input
            className="userInput"
            type="text"
            // placeholder="Enter your skills"
            readOnly
            defaultValue={values.skills}
            
          />
          <div className={`error ${error ? '' : 'hidden'}`}>{error}</div>
          <button className={`user-submit-btn ${!isDetailsExist ? '' : 'btn-hidden'}`} disabled={isDetailsExist}>Add Details</button>
        </form>
      </div>
    </div>
    </div>
  )
}
