import React, { useState, useEffect } from "react";
import "./display-birthday.css";

export function Birthday() {
  const ViewSavedData = () => {
    const [formDataList, setFormDataList] = useState([]);

    useEffect(() => {
      const savedData = localStorage.getItem("formData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormDataList(parsedData);
      }
    }, []);

    return (
      <div className="container">
        <div>
          <h2>All Registered Birthdays:</h2>
          {formDataList.length > 0 ? (
            formDataList.map((formData, index) => (
              <div key={index} className="card">
                <p>Entry {index + 1}</p>
                <p>First Name: {formData.firstName}</p>
                <p>Last Name: {formData.lastName}</p>
                <p>Birthday: {formData.birthday}</p>
                {formData.photo && (
                  <img
                    src={formData.photo}
                    alt="Birthday celebrant"
                    style={{ height: "10em", width: "20em" }}
                  />
                )}
              </div>
            ))
          ) : (
            <p>No birthdays registered.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <ViewSavedData />
    </>
  );
}

function DisplayBirthday() {
  return (
    <>
      <Birthday />
    </>
  );
}

export default DisplayBirthday;
