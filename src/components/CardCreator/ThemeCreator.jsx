export default function ThemeCreator({ setThemesList }) {
  //Random color generator made by Chatty
  function getRandomColor() {
  const randomHex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
  return `#${randomHex}`;
}
  function handleCreateTheme(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries(formData));
    const newTheme = {
      id: crypto.randomUUID(),
      name: data.name,
      colors: [
        {
          role: "primary",
          value: data.primary,
          name: "Primary Color",
        },
        {
          role: "secondary",
          value: data.secondary,
          name: "Secondary Color",
        },
        {
          role: "surface",
          value: data.surface,
          name: "Surface Color",
        },
        {
          role: "surface-on",
          value: data.surfaceOn,
          name: "Surface On Color",
        },
      ],
    };
    setThemesList((prevThemes) => [newTheme, ...prevThemes]);
    event.target.reset();
  }
  return (
    <form action="submit" onSubmit={handleCreateTheme}>
      <h2>Add a Theme</h2>
      <input type="text" name="name" required placeholder="Name" />
      <input type="color" name="primary" defaultValue={getRandomColor()} placeholder="Primary Color" />
      <input type="color" name="secondary" defaultValue={getRandomColor()} placeholder="Secondary Color" />
      <input type="color" name="surface" defaultValue={getRandomColor()} placeholder="Surface Color" />
      <input type="color" name="surfaceOn" defaultValue={getRandomColor()} placeholder="Surface On Color" />
      <button type="submit">Add Theme</button>
    </form>
  );
}
