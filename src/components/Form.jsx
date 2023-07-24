// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import styles from "./Form.module.css";
import Button from "./Button";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import { useCities } from "../context/CitiesContext";

const baseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [lat, lng] = useUrlPosition();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [emoji, setEmoji] = useState("");
  const { createCity } = useCities();

  useEffect(() => {
    const fetchData = async () => {
      if (!lat || !lng) return;
      try {
        const res = await fetch(`${baseUrl}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        setCity(data.city);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
        setNotes(data.notes);
        setCityName(data.city);
      } catch (error) {
        alert("we have problme");
      }
    };
    fetchData();
  }, [lat, lng]);

  function handelSubmit(e) {
    e.preventDefault();

    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };

    createCity(newCity);
  }

  if (!lat || !lng) return <Message message={"start by clicking on map"} />;

  return (
    <form className={styles.form} onSubmit={handelSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={city}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <ReactDatePicker
          onChange={(data) => setDate(data)}
          selected={date}
          dateFormat="dd,MM,yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>add</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type={"back"}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
