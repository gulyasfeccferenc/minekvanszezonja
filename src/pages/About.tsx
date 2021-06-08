import React, { Component } from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const {Title} = Typography;

const About = () => {
    return <div>
    <Title>Minek van szezonja?</Title>
    <p>
      Az oldal tanulóprojektként jött létre, hogy a React keretrendszert
      minél behatóbban ismerhessem meg egy igazi projekt kapcsán.
    </p>
    <p>
      A fő cél egy olyan könnyen használható webes alkalmazás elkészítése
      volt, ami kereshető és átlátható formában mutatja be a hazai növények
      szezonalitását.
    </p>
    <h3>0.1</h3>
    <p>
      Az oldal jelenleg egy táblázatos nézettel és egy példaadatbázis
      növényeinek adataival felkerült a{" "}
      <a href="https://minekvanszezonja.hu">https://minekvanszezonja.hu</a>{" "}
      domainre
    </p>
    <h3>0.2</h3>
    <p>
      A korábbi táblázatos nézetet egy, a növények bővebb ismertetésére is
      lehetőséget nyújtó, két oszlopra bontott elrendezés váltotta. Új
      elemként megjelent a "Hónap sztárjai" sáv, ahol az adott hónap
      növényei gyorsan áttekinthetőek.
    </p>

    <h3>1.0</h3>
    <p>
      Teljes 
    </p>
    <h2>Külön köszönet:</h2>
    <p>
      <span>
        Photo by{" "}
        <a href="https://unsplash.com/@miracleday?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Elena Mozhvilo
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/s/photos/broccoli?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Unsplash
        </a>
      </span>
    </p>
    <p>
      <Link to={"/"}>🔙 Vissza</Link>
    </p>
  </div>
}

export default About;