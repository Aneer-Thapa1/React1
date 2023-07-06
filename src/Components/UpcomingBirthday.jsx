import React, { useState, useEffect } from "react";
import "./Home.css";
const UpcomingBirthday = () => {
  return (
    <div>
      <ViewSavedData />
    </div>
  );
};

const ViewSavedData = () => {
  const [formDataList, setFormDataList] = useState([]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormDataList(parsedData);
    }
  }, []);

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(today.getDate() + 7);

  const birthdaysSoon = formDataList.filter((formData) => {
    const birthdayDate = new Date(formData.birthday);
    return birthdayDate >= today && birthdayDate <= oneWeekFromNow;
  });

  const todayBirthdays = birthdaysSoon.filter((formData) => {
    const birthdayDate = new Date(formData.birthday);
    return formatDate(birthdayDate) === formatDate(today);
  });

  return (
    <div className="container">
      <h2>Upcoming Birthdays:</h2>
      {birthdaysSoon.length > 0 ? (
        birthdaysSoon.map((formData, index) => (
          <div key={index} className="card">
            <p>Entry {index + 1}</p>
            <p>First Name: {formData.firstName}</p>
            <p>Last Name: {formData.lastName}</p>
            <p>Birthday: {formData.birthday}</p>
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Birthday celebrant"
                className="photo"
              />
            )}
          </div>
        ))
      ) : (
        <p>No birthdays coming up in the next week.</p>
      )}
    </div>
  );
};

export default UpcomingBirthday;
