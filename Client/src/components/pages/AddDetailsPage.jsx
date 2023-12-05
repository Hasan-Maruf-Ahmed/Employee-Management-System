import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export const AddDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    age: "",
    position: "",
    phone: "",
    address: "",
    department: "",
    skills: "",
    education: {
      degree: "",
      university: "",
      graduationyear: "",
    },
    empid: "",
  });
  const [error, setError] = useState("");
  //   const Navigate = useNavigate();

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user"));

    const fetchUserDetails = async () => {
      try {
        if (user && userdata.detailsid) {
          const response = await fetch(
            `http://localhost:8080/api/admin/details/${userdata.detailsid}`,
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
            skills: data.skills.join(", "),
            education: {
              degree: data.education.degree,
              university: data.education.university,
              graduationyear: data.education.graduationyear,
            },
            empid: data.empid,
          });
          //   console.log(data.age);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      dispatch({ type: "LOGIN", payload: userdata });
      fetchUserDetails();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // Navigate(`adddetails/${id}`);
    try {
      const response = await fetch(`http://localhost:8080/api/addDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify(values),
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        console.log(error);
        throw new Error("Failed to Add user details");
      } else if (response.ok) {
        const updatedResponse = await fetch(`http://localhost:8080/api/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        });

        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          const updatedDetailsId = updatedData.userDetails?._id;
          console.log(updatedDetailsId);

          const storedUser = JSON.parse(localStorage.getItem('user')) || {};
          const updatedStoredUser = {
            ...storedUser,
            detailsid: updatedDetailsId,  // Update 'detailsid' field
        };
        localStorage.setItem('user', JSON.stringify(updatedStoredUser));
        navigate(`/userpage/${id}` )
          // Handle the updated details id as needed (e.g., update local storage)
        } else {
          // Handle the case where fetching updated data failed
          console.error("Failed to fetch updated data");
        }
      }

      // Optionally, handle success response here
      console.log("User details Added successfully");
    } catch (error) {
      console.error(error);
      // Optionally, handle error here
    }
  };

  return (
    <div className="user-container">
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
          <label className="updateLabel">Education:</label>
          <div className="sub-section">
            <div className="input-section">
              <label className="updateLabel">Degree:</label>
              <input
                className="sub-userInput"
                type="text"
                placeholder="Enter your Degree"
                value={values.education.degree}
                onChange={(e) =>
                  setValues({
                    ...values,
                    education: { ...values.education, degree: e.target.value },
                  })
                }
              />
            </div>
            <div className="input-section">
              <label className="updateLabel">University:</label>
              <input
                className="sub-userInput"
                type="text"
                placeholder="Enter your University name"
                value={values.education.university}
                onChange={(e) =>
                  setValues({
                    ...values,
                    education: {
                      ...values.education,
                      university: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="input-section">
              <label className="updateLabel">Graduation Year:</label>
              <input
                className="sub-userInput"
                type="text"
                placeholder="Enter your Graduation Year"
                value={values.education.graduationyear}
                onChange={(e) =>
                  setValues({
                    ...values,
                    education: {
                      ...values.education,
                      graduationyear: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <label className="updateLabel">Employee ID:</label>
          <input
            className="updateInput"
            type="text"
            placeholder="Enter your Employee ID"
            value={values.empid}
            onChange={(e) => setValues({ ...values, empid: e.target.value })}
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
          <div className={`error ${error ? "" : "hidden"}`}>{error}</div>
          <button className="update-submit-btn">Save</button>
        </form>
      </div>
    </div>
  );
};
