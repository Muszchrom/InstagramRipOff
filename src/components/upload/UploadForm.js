import { useState } from 'react';

import UploadFormComponent from './UploadFormComponent';


export default function UploadForm(props) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [place, setPlace] = useState();
  const [date, setDate] = useState();
  const [category, setCategory] = useState();
  const options = [
    {
      normal: "greece",
      polish: "Grecja 2021"
    }
  ];

  const execFunc = (e) => {
    e.preventDefault();
    if (!category) {
      return;
    }
    const data = {
      title,
      description,
      country,
      city,
      place,
      date,
      category
    }
    props.postData(data);
    props.setNextStep(props.step);
  }

  return (
    <form className="UploadForm">
      <UploadFormComponent labelText="Tytuł" placeholder="Podaj tytuł" setValue={setTitle} hFor="title"  type="text" />
      <UploadFormComponent labelText="Opis" placeholder="Opisz zdjęcia" setValue={setDescription} hFor="description"  type="textarea" />
      <UploadFormComponent labelText="Kraj" placeholder="Podaj kraj" setValue={setCountry} hFor="country"  type="text" />
      <UploadFormComponent labelText="Miasto" placeholder="Podaj miasto" setValue={setCity} hFor="city"  type="text" />
      <UploadFormComponent labelText="Miejsce" placeholder="Podaj miejsce" setValue={setPlace} hFor="place"  type="text" />
      <UploadFormComponent labelText="Data" placeholder="Podaj datę" setValue={setDate} hFor="date"  type="date" />
      <UploadFormComponent labelText="Grupa" placeholder="Wybierz grupę" setValue={setCategory} type="select" options={options} />
      <div style={{display: "flex", flexDirection: "column", width: "fit-content", margin: "0 auto"}}>
        <button type="submit" onClick={(e) => execFunc(e)} className="NextButton" htmlFor="inputFileInput">
          Wyślij
        </button>
      </div>
    </form>
  );
}
