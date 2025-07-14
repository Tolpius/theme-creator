export default function TestPage({setIsTesting, themesList, testThemeId}) {
    function handleClosePreview() {
        setIsTesting(false);
    }
    const theme = themesList.find(theme => theme.id === testThemeId);
    return (<>
<button onCLick={handleClosePreview}>close preview</button>
<h1>{theme.name}</h1>


    </>);
}