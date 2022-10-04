import {NavLink} from 'react-router-dom';

export const AboutComponent = () => {
    return (<>
        <h1>Minek van szezonja?</h1>
        <p>
            Az oldal tanulóprojektként jött létre, hogy a React keretrendszert
            minél behatóbban ismerhessem meg egy igazi projekt kapcsán.
        </p>
        <p>
            A fő cél egy olyan könnyen használható webes alkalmazás elkészítése
            volt, ami kereshető és átlátható formában mutatja be a hazai növények
            szezonalitását.
        </p>
        <h3>0.1</h3>
        <p>
            Az oldal jelenleg egy táblázatos nézettel és egy példaadatbázis
            növényeinek adataival felkerült a{" "}
            <a href="https://minekvanszezonja.hu">https://minekvanszezonja.hu</a>{" "}
            domainre
        </p>
        <h3>0.2</h3>
        <p>
            A korábbi táblázatos nézetet egy, a növények bővebb ismertetésére is
            lehetőséget nyújtó, két oszlopra bontott elrendezés váltotta. Új
            elemként megjelent a "Hónap sztárjai" sáv, ahol az adott hónap
            növényei gyorsan áttekinthetőek.
        </p>
        
        <h3>0.3</h3>
        <p>
            Alapjaiban újraírtam az egész oldalt egy sokkal frissebb, funkciógazdagabb oldal reményében.
            Az adatok adatbázisból érkeznek, bejelentkezés után kedvencek összeállítására is van lehetőség.
        </p>

        <h2>Külön köszönet:</h2>
        <ul>
          <li>
            Photo by{" "}
              <a href="https://unsplash.com/@miracleday?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Elena Mozhvilo
            </a>{" "}
              on{" "}
              <a href="https://unsplash.com/s/photos/broccoli?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
              Unsplash
            </a>
          </li>
          <li>
            Photo by <a href="https://unsplash.com/@randyfath?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Randy Fath</a> on <a href="https://unsplash.com/s/photos/vegetables?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </li>
          <li>
            Photo by <a href="https://unsplash.com/@louishansel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Louis Hansel</a> on <a href="https://unsplash.com/s/photos/apple?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
          </li>
            <li>
                Photo by <a href="https://unsplash.com/@m_samson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Monkgogi Samson</a> on <a href="https://unsplash.com/s/photos/bean?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            </li>
            <li>
                Photo by <a href="https://unsplash.com/@unarchive?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jeremy Bezanger</a> on <a href="https://unsplash.com/s/photos/basil?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            </li>
            <li>
                Photo by <a href="https://unsplash.com/@mockupgraphics?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mockup Graphics</a> on <a href="https://unsplash.com/s/photos/nut?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            </li>
            <li>
                Photo by <a href="https://unsplash.com/@davidholifield?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">David Holifield</a> on <a href="https://unsplash.com/s/photos/carrot?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            </li>
            <li>
                Photo by <a href="https://unsplash.com/@jo_lanta?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jo Lanta</a> on <a href="https://unsplash.com/s/photos/radish?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            </li>
        </ul>
        <p>
            Icon by <span><a href="https://www.flaticon.com/free-icons/vegetable" title="vegetable icons">Vegetable icons created by Freepik - Flaticon</a></span>
        </p>
        <p>
            <NavLink to={"/"}>🔙 Vissza</NavLink>
        </p>
    </>)
}
