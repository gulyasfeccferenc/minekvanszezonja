import React from "react";

const PlantType = (props) => {
  let emoji = "🙄";
  let name = "Ismeretlen";
  switch (props.type) {
    case "vegetable":
      emoji = "🥕";
      name = "Zöldség";
      break;
    case "fruit":
      emoji = "🍎";
      name = "Gyümölcs";
      break;
    case "herb":
      emoji = "🌿";
      name = "Fűszernövény";
      break;
    case "plant":
      emoji = "🍃";
      name = "Növény";
      break;
    default:
      break;
  }
  return <strong>{emoji + " - " + name}</strong>;
};

export default PlantType;
