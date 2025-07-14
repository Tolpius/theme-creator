import "./Cards.css";
import { useState } from "react";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";
import ThemeEditor from "../ThemeEditor/ThemeEditor.jsx";

export default function Cards({ themes, setThemes }) {
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [toEditIds, setToEditIDs] = useState(new Set());

  function handleEditToggle(themeId) {
    setToEditIDs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(themeId)) {
        newSet.delete(themeId);
      } else {
        newSet.add(themeId);
      }
      return newSet;
    });
  }

  function handleHideToggle(themeId) {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(themeId)) {
        newSet.delete(themeId);
      } else {
        newSet.add(themeId);
      }
      return newSet;
    });
  }

  return (
    <ul className="cards">
      {themes.map((theme) => {
        const isExpanded = expandedIds.has(theme.id);
        const isEditing = toEditIds.has(theme.id);
        return (
          <li key={theme.id} className="card">
            <button
              className="card__title"
              onClick={() => handleHideToggle(theme.id)}
            >
              <h3>{theme.name}</h3>
              <i
                className={isExpanded ? "ph ph-caret-up" : "ph ph-caret-down"}
              ></i>
            </button>
            {isExpanded ? (
              <>
              <button className="card__edit-button" onClick={() => handleEditToggle(theme.id)}>
                <i className="ph ph-pencil-simple"></i></button>
                <DeleteButton themeId={theme.id} setThemes={setThemes} />
              {isEditing ? (<ThemeEditor theme={theme} setThemes={setThemes} handleEditToggle={handleEditToggle}/>
              ):(
                <ColorListExpanded colors={theme.colors} />)}
              </>
            ) : (
              <ColorListCollapsed colors={theme.colors} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

function ColorListExpanded({ colors }) {
  return (
    <ul className="card__colors">
      {colors.map((color) => (
        <li
          key={color.role}
          className={`card__color card__color--${color.role}`}
          style={{ backgroundColor: color.value }}
        >
          <div className={"card__color--info"}>
            <h3 className={"card__color--role"}>{color.role}</h3>
            <span className={"card__color--name"}>{color.name}</span>
            <span className={"card__color--value"}>{color.value}</span>
          </div>
          <div className={"card__color--preview"}></div>
        </li>
      ))}
    </ul>
  );
}

function ColorListCollapsed({ colors }) {
  return (
    <ul className="card__colors--collapsed">
      {colors.map((color) => (
        <li
          key={color.role}
          className={`card__color card__color--collapsed card__color--${color.role}`}
          style={{ backgroundColor: color.value }}
        >
          <div
            className={"card__color--preview card__color--preview--collapsed"}
          ></div>
        </li>
      ))}
    </ul>
  );
}

