export default function TestButton({ theme, setTestThemeId }) {
  return (
    <button
      className="test-button"
      onClick={() => {
        setTestThemeId(theme.id);
      }}
    >
      Test Theme
    </button>
  );
}
