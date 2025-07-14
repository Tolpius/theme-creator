export default function DeleteButton({ themeId, setThemes }) {
  const handleDelete = () => {
    setThemes((prevThemes) => prevThemes.filter((theme) => theme.id !== themeId));
  };

  return (
    <button className="delete-button" onClick={handleDelete}>
      Delete Theme
    </button>
  );
}