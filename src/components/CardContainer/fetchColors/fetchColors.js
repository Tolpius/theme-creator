  export default async function fetchColorNames(color) {
    const response = await fetch(`https://www.thecolorapi.com/id?hex=${color.slice(1)}`);
    const data = await response.json();
    return data.name.value;
}