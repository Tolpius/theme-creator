import Cards from '../Cards/Cards.jsx';
export default function CardContainer() {
    return (
        <div className="card-container">
            <h2 className="card-container__title">Available Themes</h2>
            <div className="card-container__grid">
                <Cards />
            </div>
        </div>
    );
}