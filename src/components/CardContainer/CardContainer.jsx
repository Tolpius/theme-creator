import Cards from "../Cards/Cards.jsx";
import ThemeCreator from "../CardCreator/ThemeCreator.jsx";
import { themes } from "../db/db.js";
import useLocalStorageState from "use-local-storage-state";
export default function CardContainer() {
  const [themesList, setThemesList] = useLocalStorageState("themes", {
    defaultValue: themes,
  });
  return (
    <div className="card-container">
      <ThemeCreator setThemesList={setThemesList} />
      <h2 className="card-container__title">Available Themes</h2>
      <div className="card-container__grid">
        <Cards themes={themesList} setThemes={setThemesList} />
      </div>
    </div>
  );
}
