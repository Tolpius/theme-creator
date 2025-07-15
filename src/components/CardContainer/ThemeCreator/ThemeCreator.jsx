import { useState } from "react";
import fetchColorNames from "../fetchColors/fetchColors.js";
import "./ThemeCreator.css";

export default function ThemeCreator({ setThemesList }) {
  const [name, setName] = useState("");
  const [colors, setColors] = useState({
    primary: getRandomColor(),
    secondary: getRandomColor(),
    surface: getRandomColor(),
    "surface-on": getRandomColor(),
  });
  //function getRandomColor written by ChatGPT
  function getRandomColor() {
    const randomHex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
    return `#${randomHex}`;
  }
  //function handleColorChange written by ChatGPT
  // Handles color input changes and validates hex format
  function handleColorChange(role, value) {
    if (!/^#?[0-9A-Fa-f]{0,6}$/.test(value)) return;
    const hex = value.startsWith("#") ? value : `#${value}`;
    setColors((prev) => ({ ...prev, [role]: hex }));
  }

  async function handleCreateTheme(event) {
    event.preventDefault();

    const newTheme = {
      id: crypto.randomUUID(),
      name: name,
      colors: await Promise.all(
        Object.entries(colors).map(async ([role, value]) => ({
          role,
          value,
          name: await fetchColorNames(value),
        }))
      ),
    };

    setThemesList((prevThemes) => [newTheme, ...prevThemes]);
    setName("");
    setColors({
      primary: getRandomColor(),
      secondary: getRandomColor(),
      surface: getRandomColor(),
      "surface-on": getRandomColor(),
    });
  }
  return (
    <form onSubmit={handleCreateTheme} className="theme-creator">
      <h2>Add a Theme</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          placeholder="Your Theme Name"
        />
      </label>

      {["primary", "secondary", "surface", "surface-on"].map((role) => (
        <div key={role} className="color-input-group">
          <input
            type="color"
            value={colors[role]}
            onChange={(event) => handleColorChange(role, event.target.value)}
          />
          <input
            type="text"
            value={colors[role]}
            onChange={(event) => handleColorChange(role, event.target.value)}
            maxLength={7}
          />
          <label>{role}</label>
        </div>
      ))}

      <button type="submit">Add Theme</button>
    </form>
  );
}
