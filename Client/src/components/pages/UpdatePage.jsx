import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./updatePage.css";

export const UpdatePage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    age: "",
    position: "",
    phone: "",
    address: "",
    department: "",
    salary: "",
    skills: "",
  });
  // const history = useHistory();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/admin/details/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: user.token,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
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
        });
        //   console.log(data.age);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserDetails();
  }, [id, user.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to the user details page or another appropriate page
          // history.back();
          navigate("/adminpage/employees");
        } else {
          console.log("Update operation failed.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="update-container">
      <div className="updatebox">
        <form className="updateForm" onSubmit={handleSubmit}>
          <div className="section">
            <div className="input-section">
              <label className="updateLabel">First name:</label>
              <input
                className="updateInput"
                type="text"
                placeholder="Enter your first name"
                value={values.firstname}
                onChange={(e) =>
                  setValues({ ...values, firstname: e.target.value })
                }
              />
            </div>
            <div className="input-section">
              <label className="updateLabel">Last name:</label>
              <input
                className="updateInput"
                type="text"
                placeholder="Enter your last name"
                value={values.lastname}
                onChange={(e) =>
                  setValues({ ...values, lastname: e.target.value })
                }
              />
            </div>
          </div>
          <label className="updateLabel">Age:</label>
          <input
            className="updateInput"
            type="text"
            placeholder="Enter your Age"
            value={values.age}
            onChange={(e) => setValues({ ...values, age: e.target.value })}
          />
          <div className="section">
            <div className="input-section">
              <label className="updateLabel">Department:</label>
              <input
                className="updateInput"
                type="text"
                placeholder="Enter your department"
                value={values.department}
                onChange={(e) =>
                  setValues({ ...values, department: e.target.value })
                }
              />
            </div>
            <div className="input-section">
              <label className="updateLabel">Position:</label>
              <input
                className="updateInput"
                type="text"
                placeholder="Enter your position"
                value={values.position}
                onChange={(e) =>
                  setValues({ ...values, position: e.target.value })
                }
              />
            </div>
          </div>
          <div className="section">
            <div className="input-section">
              <label className="updateLabel">Address:</label>
              <input
                className="updateInput"
                type="text"
                placeholder="Enter your Address"
                value={values.address}
                onChange={(e) =>
                  setValues({ ...values, address: e.target.value })
                }
              />
            </div>
            <div className="input-section">
              <label className="updateLabel">Phone:</label>
              <input
                className="updateInput"
                type="text"
                placeholder="Enter your Phone Number"
                value={values.phone}
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
              />
            </div>
          </div>
          <label className="updateLabel">Salary:</label>
          <input
            className="updateInput"
            type="text"
            placeholder="Enter your salary"
            value={values.salary}
            onChange={(e) => setValues({ ...values, salary: e.target.value })}
          />
          <label className="updateLabel">Skills:</label>
          <input
            className="updateInput"
            type="text"
            placeholder="Enter your skills"
            value={values.skills}
            onChange={(e) => {
              const skillsArray = e.target.value
                .split(",")
                .map((skill) => skill.trim());
              setValues({ ...values, skills: skillsArray });
            }}
          />
          {/* <div className={`error ${error ? '' : 'hidden'}`}>{error}</div> */}
          <button className="update-submit-btn">Save</button>
        </form>
      </div>
    </div>
  );
};
