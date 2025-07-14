import fetchColorNames from "../fetchColors/fetchColors.js";

export default function ThemeEditor({ theme, setThemes, handleEditToggle }) {
  async function handleEditTheme(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const updatedTheme = {
      ...theme,
      name: data.name,
      colors: [
        {
          role: "primary",
          value: data.primary,
          name: await fetchColorNames(data.primary),
        },
        {
          role: "secondary",
          value: data.secondary,
          name: await fetchColorNames(data.secondary),
        },
        {
          role: "surface",
          value: data.surface,
          name: await fetchColorNames(data.surface),
        },
        {
          role: "surface-on",
          value: data.surfaceOn,
          name: await fetchColorNames(data.surfaceOn),
        },
      ],
    };

    setThemes((prevThemes) =>
      prevThemes.map((t) => (t.id === theme.id ? updatedTheme : t))
    );
    handleEditToggle(theme.id);
  }
  return (
    <form action="submit" onSubmit={handleEditTheme}>
      <h3>Edit Theme: {theme.name}</h3>
      <label>
        New name:
        <input type="text" name="name" defaultValue={theme.name} />
      </label>
      <input
        type="color"
        name="primary"
        defaultValue={theme.colors[0].value}
        placeholder="Primary Color"
      />
      <input
        type="color"
        name="secondary"
        defaultValue={theme.colors[1].value}
        placeholder="Secondary Color"
      />
      <input
        type="color"
        name="surface"
        defaultValue={theme.colors[2].value}
        placeholder="Surface Color"
      />
      <input
        type="color"
        name="surfaceOn"
        defaultValue={theme.colors[3].value}
        placeholder="Surface On Color"
      />
      <button type="submit">Save Theme</button>
    </form>
  );
}
