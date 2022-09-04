import vegabowl from '../assets/vegetable-bowl.jpg';
export const NotFoundComponent = () => {
    return (<><h1>Nézd mennyi zöldség...</h1><h3>és amit keresel mégsincs köztük :(</h3>
        <img src={vegabowl} alt="A bunch of nice vegetables by Randy Fath" />
    </>)
}
