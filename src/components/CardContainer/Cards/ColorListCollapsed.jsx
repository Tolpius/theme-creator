export default function ColorListCollapsed({ colors }) {
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
