import Cards from "../Cards/Cards.jsx";
import ThemeCreator from "../ThemeCreator/ThemeCreator.jsx";
import { themes } from "../db/db.js";
import useLocalStorageState from "use-local-storage-state";
import TestPage from "../TestPage/TestPage.jsx";
import { useState } from "react";
export default function CardContainer() {
  const [themesList, setThemesList] = useLocalStorageState("themes", {
    defaultValue: themes,
  });
  const [testThemeId, setTestThemeId] = useState(null);

  return (
    <div className="card-container">
      {!testThemeId ? (
        <>
          <ThemeCreator setThemesList={setThemesList} />
          <h2 className="card-container__title">Available Themes</h2>
          <div className="card-container__grid">
            <Cards
              themes={themesList}
              setThemes={setThemesList}
              setTestThemeId={setTestThemeId}
            />
          </div>
        </>
      ) : (
        <TestPage
          themesList={themesList}
          testThemeId={testThemeId}
          setTestThemeId={setTestThemeId}
        />
      )}
    </div>
  );
}
