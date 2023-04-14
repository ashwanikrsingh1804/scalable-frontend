import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { ToastContainer,toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    // const response = await axios.get("http://testenv-env.eba-e6qrxgvz.us-east-1.elasticbeanstalk.com//api/get");
    const response = await axios.get("https://opfhi0k7o6.execute-api.us-east-1.amazonaws.com/api/get");
    setData(response.data);
  }; 

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (ID) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      axios.delete(`https://opfhi0k7o6.execute-api.us-east-1.amazonaws.com/api/remove/${ID}`);
      toast.success("Contact Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/addContact">
        <button className="btn btn-contact">Add Contact</button>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            console.log(item);
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  
                  <Link to={`/update/${item.ID}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.ID)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.ID}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
