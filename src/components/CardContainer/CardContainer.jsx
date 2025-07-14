import Cards from "../Cards/Cards.jsx";
import ThemeCreator from "../ThemeCreator/ThemeCreator.jsx";
import { themes } from "../db/db.js";
import useLocalStorageState from "use-local-storage-state";
import TestPage from "../TestPage/TestPage.jsx";
export default function CardContainer() {
  const [themesList, setThemesList] = useLocalStorageState("themes", {
    defaultValue: themes,
  });
  const [isTesting, setIsTesting] = useLocalStorageState("isTesting", {
    defaultValue: false,
  });
  const [testThemeId, setTestThemeId] = useLocalStorageState("testThemeId", {
    defaultValue: null,
  });

  return (
    <div className="card-container">
      {isTesting ? (
        <>
          <ThemeCreator setThemesList={setThemesList} />
          <h2 className="card-container__title">Available Themes</h2>
          <div className="card-container__grid">
            <Cards
              themes={themesList}
              setThemes={setThemesList}
              setIsTesting={setIsTesting}
              setTestThemeId={setTestThemeId}
            />
          </div>
        </>
      ) : (
        <TestPage
          setIsTesting={setIsTesting}
          themesList={themesList}
          testThemeId={testThemeId}
        />
      )}
    </div>
  );
}
