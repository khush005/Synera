import React, { useEffect, useState } from 'react'
import "./adminhome.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function AdminHome() {
  const [data, setData] = useState([]);

  // Fetching all user
  const getAllUser = () => {
    console.log("Fetching all users");
    fetch("http://localhost:5000/api/user/getAllUser", {
      method: "GET",
    })
    .then((res) => res.json())
    .then((responseData) => {
      console.log("User data recieved", responseData);
      // setData(data.data);

      // Check if responseData has the expected structure
      if (responseData && responseData.data) {
        setData(responseData.data);
      } else {
        console.error("Invalid data structure received");
        setData([]); // Set data to an empty array to handle potential issues
      }
    })
    .catch((error) => {
      console.error("Error Fetching users:",error);
      setData([]);
    });
  }

  useEffect(() => {
    getAllUser();
  },[]);


  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)){
      fetch("http://localhost:5000/api/user/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ userid: id }),
      })
      .then((res) => res.json())
      .then((data) => {
        alert(data.data);
        getAllUser();
      });
    } else {

    }
  };


  const logout = () => {
    window.localStorage.clear();
    window.location.href = "./login"
  };

  return (
    <div className='mainAdmin'>

    <div className='auth-wrapper' style={{height: "auto", width:"auto"}}>
        <div className='auth-inner' style={{width: "auto", height:"auto"}}>
          <div style={{display:"flex"}}>
            <h1>Welcome Admin</h1>
            <button onClick={logout} className='btn btn-primary' style={{marginLeft:"1000px", marginBottom:"10px", fontSize:20, borderRadius:5, cursor:"pointer"}}>Logout</button>
          </div>
            <button style={{fontSize:20, borderRadius:5, cursor:"pointer"}}>Reports</button>

            <table style={{width:500}}>
              <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>PhoneNumber</th>
                    <th>UserType</th>
                    <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              {data?.length > 0 ? (
              data.map((i) => (
                <tr key={i._id}>
                  <td>{i.username}</td>
                  <td>{i.email}</td>
                  <td>{i.password}</td>
                  <td>{i.phonenumber}</td>
                  <td>{i.userType}</td>
                  <td>
                    <FontAwesomeIcon icon={faTrash} 
                      onClick={() => deleteUser(i._id, i.username)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No data available</td>
              </tr>
            )}
              </tbody>
            </table>
            {/* <button onClick={logout} className='btn btn-primary' style={{marginLeft: "1200px", marginBottom: "500px", }}>Logout</button> */}
        </div>
    </div>
    </div>
  )
}
