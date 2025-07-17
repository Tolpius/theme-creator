import { useState } from "react";
import fetchColorNames from "../fetchColors/fetchColors.js";
import "./ThemeEditor.css";

export default function ThemeEditor({ theme, setThemes, handleEditToggle }) {
  const [name, setName] = useState(theme.name);

  //Beispiel Aufbau des colors-Objekts
  // colors = {primary: "#57886C", secondary: "#F8C7CC", surface: "#FDEDEE", "surface-on": "#0E0F19"}
  //Wird beim ersten Rendern aus dem theme-Objekt generiert
  //theme.colors ist ein Array von Objekten. Siehe ../db/db.js
  const [colors, setColors] = useState(() =>
    theme.colors.reduce((acc, color) => {
      acc[color.role] = color.value;
      return acc;
    }, {})
  );

  //function handleColorChange written by ChatGPT
  function handleColorChange(role, value) {
    if (!/^#?[0-9A-Fa-f]{0,6}$/.test(value)) return;
    const hex = value.startsWith("#") ? value : `#${value}`;
    setColors((prev) => ({ ...prev, [role]: hex }));
  }

  async function handleEditTheme(event) {
    event.preventDefault();

    const updatedTheme = {
      ...theme,
      name,
      colors: await Promise.all(
        Object.entries(colors).map(async ([role, value]) => ({
          role,
          value,
          name: await fetchColorNames(value),
        }))
      ),
    };

    setThemes((prevThemes) =>
      prevThemes.map((t) => (t.id === theme.id ? updatedTheme : t))
    );
    handleEditToggle(theme.id);
  }

  return (
    <form onSubmit={handleEditTheme} className="theme-editor">
      <h3>Edit Theme: {theme.name}</h3>

      <label>
        New name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="theme-editor__name-input"
        />
      </label>
      <div className="theme-editor__color-grid">
        {["primary", "secondary", "surface", "surface-on"].map((role) => (
          <div key={role} className="theme-editor__color-group">
            <input
              type="color"
              value={colors[role]}
              onChange={(event) => handleColorChange(role, event.target.value)}
              className="theme-editor__color-input"
            />
            <input
              type="text"
              value={colors[role]}
              onChange={(event) => handleColorChange(role, event.target.value)}
              maxLength={7}
              className="theme-editor__hex-input"
            />
            <label>{role}</label>
          </div>
        ))}
      </div>

      <button type="submit" className="theme-editor__submit-button">
        Save Theme
      </button>
    </form>
  );
}
