import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./display-birthday.css";

const ViewSavedData = () => {
  const [formDataList, setFormDataList] = useState([]);
  const [editedIndex, setEditedIndex] = useState(-1);
  const [editedFormData, setEditedFormData] = useState({
    firstName: "",
    lastName: "",
    birthDay: "",
    message: "",
    photo: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormDataList(parsedData);
    }
  }, []);

  const handleEdit = (index) => {
    const formData = formDataList[index];
    setEditedIndex(index);
    setEditedFormData(formData);
  };

  const handleDelete = (index) => {
    const updatedFormDataList = formDataList.filter(
      (formData, idx) => idx !== index
    );

    setFormDataList(updatedFormDataList);
    localStorage.setItem("formData", JSON.stringify(updatedFormDataList));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const updatedFormDataList = formDataList.map((formData, index) => {
      if (index === editedIndex) {
        return editedFormData;
      }
      return formData;
    });

    setFormDataList(updatedFormDataList);
    localStorage.setItem("formData", JSON.stringify(updatedFormDataList));
    setEditedIndex(-1);
    setEditedFormData({
      firstName: "",
      lastName: "",
      birthDay: "",
      message: "",
      photo: "",
    });
  };

  return (
    <>
      <div>
        <h2>Saved Form Data:</h2>
        {formDataList.length > 0 ? (
          formDataList.map((formData, index) => (
            <div key={index}>
              <p>Entry {index + 1}</p>
              <p>First Name: {formData.firstName}</p>
              <p>Last Name: {formData.lastName}</p>
              <p>Birthday: {formData.birthDay}</p>
              <p>Message: {formData.message}</p>
              {formData.photo && (
                <img
                  src={formData.photo}
                  alt="Birthday celebrant"
                  style={{ width: "30em", height: "30em" }}
                />
              )}

              {index === editedIndex ? (
                <>
                  <div>
                    <label htmlFor="editedFirstName">First Name:</label>
                    <input
                      name="firstName"
                      id="editedFirstName"
                      type="text"
                      value={editedFormData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="editedLastName">Last Name:</label>
                    <input
                      name="lastName"
                      id="editedLastName"
                      type="text"
                      value={editedFormData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="editedBirthDay">Birthday:</label>
                    <input
                      name="birthDay"
                      id="editedBirthDay"
                      type="date"
                      value={editedFormData.birthDay}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="editedMessage">Message:</label>
                    <textarea
                      name="message"
                      id="editedMessage"
                      value={editedFormData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="editedPhoto">Photo:</label>
                    <input
                      name="photo"
                      id="editedPhoto"
                      type="text"
                      value={editedFormData.photo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <button onClick={handleSave}>Save</button>
                  </div>
                </>
              ) : (
                <div>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No saved data found.</p>
        )}
      </div>
      <div>
        <MyButton />
      </div>
    </>
  );
};

const MyButton = () => {
  return (
    <Link to="/Add" target="_blank">
      <button>Add New</button>
    </Link>
  );
};

export default ViewSavedData;
