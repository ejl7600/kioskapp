import React, { useState, useEffect } from "react";
import "./Register.css"; 

//Should eventually only use process.env
const API_PORT = process.env.API_PORT || 5000;

const Register = () => {
    const [formData, setFormData] = useState({
      date: "",
      startTime: "",
      destination: "",
      phoneNumber: "",
      partySize: 1,
      tripDuration: 1,
    });
    const [sessionKey, setSessionKey] = useState("");
  
    const destinations = ["Destination 1", "Destination 2", "Destination 3"];
  
    useEffect(() => {
      const newSessionKey = Math.random().toString(36).substring(2, 15);
      setSessionKey(newSessionKey);
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;

      if (name === "phoneNumber") {
        setFormData({ ...formData, [name]: formatPhoneNumber(value) });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
  
    const formatPhoneNumber = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '');

    if (cleaned.length > 10) {
      cleaned = cleaned.substring(0, 10);
    }


    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      let formatted = '';
      if (match[1]) formatted += match[1];
      if (match[2]) formatted += '-' + match[2];
      if (match[3]) formatted += '-' + match[3];
      return formatted;
    }

    return value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formData, sessionKey };

    fetch(`${window.location.protocol}//${window.location.hostname}:${API_PORT}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form submitted successfully:", data);

        setFormData({
          date: "",
          startTime: "",
          destination: "",
          phoneNumber: "",
          partySize: 1,
          tripDuration: 1,
        });

        const newSessionKey = Math.random().toString(36).substring(2, 15);
        setSessionKey(newSessionKey);
      })
      .catch((error) => console.error("Error submitting form:", error));
  };

  return (
    <form className="kiosk-form" onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="date"
          name="date"
          min={new Date().toISOString().split("T")[0]}
          value={formData.date}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Start Time:
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Destination:
        <select
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
        >
          <option value="">Select a destination</option>
          {destinations.map((dest, index) => (
            <option key={index} value={dest}>
              {dest}
            </option>
          ))}
        </select>
      </label>

      <label>
        Phone Number:
        <input
          type="tel"
          name="phoneNumber"
          placeholder="XXX-XXX-XXXX"
          value={formData.phoneNumber}
          onChange={handleChange}
          maxLength="12" 
          required
        />
      </label>

      <label>
        Party Size:
        <input
          type="number"
          name="partySize"
          min="1"
          value={formData.partySize}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Trip Duration (Days):
        <input
          type="number"
          name="tripDuration"
          min="1"
          value={formData.tripDuration}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default Register;
