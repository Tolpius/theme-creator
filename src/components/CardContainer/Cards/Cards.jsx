import "./Cards.css";
import { useState } from "react";
import DeleteButton from "./DeleteButton.jsx";
import ThemeEditor from "../ThemeEditor/ThemeEditor.jsx";
import useLocalStorageState from "use-local-storage-state";
import ColorListCollapsed from "./ColorListCollapsed.jsx";
import ColorListExpanded from "./ColorListExpanded.jsx"; 
import TestButton from "./TestButton.jsx";

export default function Cards({ themes, setThemes, setTestThemeId }) {
  const [expandedIdArray, setExpandedIdArray] = useLocalStorageState(
    "ExpandedIdSet",
    {
      defaultValue: [],
    }
  );
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

  const expandedIds = new Set(expandedIdArray);
  function handleHideToggle(themeId) {
    const newSet = new Set(expandedIds);
    if (newSet.has(themeId)) {
      newSet.delete(themeId);
    } else {
      newSet.add(themeId);
    }
    setExpandedIdArray(Array.from(newSet));
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
                <button
                  className="card__edit-button"
                  onClick={() => handleEditToggle(theme.id)}
                >
                  <i className="ph ph-pencil-simple"></i>
                </button>
                <DeleteButton themeId={theme.id} setThemes={setThemes} />
                {isEditing ? (
                  <ThemeEditor
                    theme={theme}
                    setThemes={setThemes}
                    handleEditToggle={handleEditToggle}
                  />
                ) : (
                  <>
                    <TestButton theme={theme} setTestThemeId={setTestThemeId} />
                    <ColorListExpanded colors={theme.colors} />
                  </>
                )}
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



