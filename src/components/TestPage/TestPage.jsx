import "./TestPage.css";

export default function TestPage({ setIsTesting, themesList, testThemeId }) {
  const theme = themesList.find((theme) => theme.id === testThemeId);

  if (!theme) {
    setIsTesting(false);
    return null;
  }

  const getColor = (role) =>
    theme.colors.find((color) => color.role === role)?.value || "#ccc";

  return (
    <div
      className="test-page-single"
      style={{
        backgroundColor: getColor("surface"),
        color: getColor("surface-on"),
      }}
    >
      <button className="close-button" onClick={() => setIsTesting(false)}>
        Close Preview
      </button>

      <h1 className="theme-name" style={{ color: getColor("primary") }}>
        {theme.name}
      </h1>

      <h2 className="headline">A Headline</h2>
      <p className="paragraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut
        hendrerit justo. Aliquam erat volutpat. Donec et sapien nec lorem
        finibus egestas.
      </p>

      <div
        className="highlight-box"
        style={{ backgroundColor: getColor("secondary") }}
      >
        <h3>A Highlight Box</h3>
        <p>
          Vivamus fermentum, sem et feugiat dictum, tellus velit mattis ligula,
          vitae fringilla orci nulla ut nulla. Sed tincidunt nisi nec tellus
          blandit cursus.
        </p>
      </div>

      <div className="button-group">
        <button className="button contained">Contained</button>
        <button className="button outline">Outline</button>
        <button
          className="button primary"
          style={{ backgroundColor: getColor("primary") }}
        >
          Primary
        </button>
        <button
          className="button secondary"
          style={{ backgroundColor: getColor("secondary") }}
        >
          Secondary
        </button>
      </div>
    </div>
  );
}
