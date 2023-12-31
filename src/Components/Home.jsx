import React, { useState, useEffect } from "react";
import UpcomingBirthday from "./UpcomingBirthday";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <ViewSavedData />
      <UpcomingBirthday />
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
  const todayBirthdays = formDataList.filter(
    (formData) => formData.birthday === formatDate(today)
  );

  return (
    <div className="container">
      <h2>Today's Birthdays:</h2>
      {todayBirthdays?.length > 0 ? (
        todayBirthdays.map((formData, index) => (
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
        <p>No birthdays today.</p>
      )}
    </div>
  );
};

export default Home;
