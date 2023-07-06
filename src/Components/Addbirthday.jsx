import React, { useState } from "react";
import "./Add.css";

const Addbirthday = () => {
  const style = {
    width: "25%",
    backgroundColor: "black",
    color: "white",
    border: "none",
    padding: "5px",
    borderRadius: "5px",
    margin: "10px",
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    message: "",
    photo: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const existingData = JSON.parse(localStorage.getItem("formData")) || [];
    console.log(JSON.parse(localStorage.getItem("formData")));

    const newData = [...existingData, formData];
    console.log(JSON.stringify(newData));

    localStorage.setItem("formData", JSON.stringify(newData));
    console.log(JSON.parse(localStorage.getItem("formData")));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const photoURL = reader.result;
      setFormData((prevData) => ({ ...prevData, photo: photoURL }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div class="container">
        <form onSubmit={handleFormSubmit} className="card">
          <label>First Name</label>
          <br />
          <input
            name="firstName"
            type="text"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <br />
          <label>Last Name</label>
          <br />
          <input
            name="lastName"
            type="text"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <br />
          <label>Birthday Date</label>
          <br />
          <input
            name="birthday"
            type="date"
            value={formData.birthday}
            onChange={handleInputChange}
          />
          <br />
          <label>Message</label>
          <br />
          <textarea
            name="message"
            placeholder="Enter Message"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          <br />
          <label>Upload Image</label>
          <br />
          <input
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <br />
          <button>ADD</button>
          <button>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default Addbirthday;
