import { useState, useEffect } from 'react';
import "./updatePage.css";
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

export const UpdatePage = () => {
    const {id} = useParams();
    const { user } = useAuthContext();
    const [values, setValues] = useState({
        firstname:'',
        lastname:'',
        age: '',
        position: '',
        phone: '',
        address: '',
        department: '',
        salary: '',

    });


    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/admin/details/${id}`, {
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
          setValues({...values, firstname: data.firstname, lastname: data.lastname, age: data.age, position: data.position, phone: data.phone, address: data.address, department: data.department, salary: data.salary})
        //   console.log(data.age);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserDetails();
    }, [id, user.token]);
  return (
    <div className='update-container'>
      <div className="updatebox">
      <form className='updateForm' >
          <label className='updateLabel'>First name:</label>
          <input className='updateInput'
            type='text'
            placeholder='Enter your first name'
            value={values.firstname}
            
          />
          <label className='updateLabel'>Last name:</label>
          <input className='updateInput'
            type='text'
            placeholder='Enter your last name'
            value={values.lastname}
            
          />
          <label className='updateLabel'>Age:</label>
          <input className='updateInput'
            type='text'
            placeholder='Enter your Age'
            value={values.age}
            
          />
          <label className='updateLabel'>Position:</label>
          <input className='updateInput'
            type='text'
            placeholder='Enter your position'
            value={values.position}
            
          />
          <label className='updateLabel'>Phone:</label>
          <input className='updateInput'
            type='text'
            placeholder='Enter your Phone Number'
            value={values.phone}
            
          />
          <label className='updateLabel'>Address:</label>
          <input className='updateInput'
            type='text'
            placeholder='Enter your Address'
            value={values.address}
            
          />
          <label className='updateLabel'>Department:</label>
          <input className='updateInput'
            type='text'
            placeholder='Enter your department'
            value={values.department}
            
          />
          <label className='updateLabel'>Salary:</label>
          <input className='updateInput'
            type='text'
            placeholder='Enter your salary'
            value={values.salary}
            
          />
          {/* <div className={`error ${error ? '' : 'hidden'}`}>{error}</div> */}
          <button className='update-submit-btn' >Submit</button>
        </form> 
      </div>
    </div>
  )
}
