export default function ColorListExpanded({ colors }) {
  return (
    <ul className="card__colors">
      {colors.map((color) => (
        <li
          key={color.role}
          className={`card__color card__color--${color.role}`}
          style={{ backgroundColor: color.value }}
        >
          <div className={"card__color--info"}>
            <h3 className={"card__color--role"}>{color.role}</h3>
            <span className={"card__color--name"}>{color.name}</span>
            <span className={"card__color--value"}>{color.value}</span>
          </div>
          <div className={"card__color--preview"}></div>
        </li>
      ))}
    </ul>
  );
}
