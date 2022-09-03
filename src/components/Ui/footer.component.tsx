import {NavLink} from 'react-router-dom';
import {FooterGround, StyledFooter} from './footer.styles';
import carrot from '../../assets/carrot.png';

export const FooterComponent = () => {
    return (<>
        <StyledFooter>
            <FooterGround>
                <img src={carrot} alt="" />
                <img src={carrot} alt="" />
                <img src={carrot} alt="" />
                <img src={carrot} alt="" />
                <img src={carrot} alt="" />
            </FooterGround>
            <br />
            <p>
                <NavLink to={"/about"}>🤔🙄👨‍🌾 Mi is ez az oldal?</NavLink>
            </p>
            <p>
                Kérdés, ötlet, javaslat:{" "}
                <a href="mailto:ferenckoppany+minekvanszezonja@gmail.com">
                    ferenckoppany+minekvanszezonja🐛gmail.com
                </a>
            </p>
            <p>
                Made with{" "}
                <span role="img" aria-label="radis icon">
        🌱
      </span>{" "}
                by <a href="https://gulyasfeccferenc.github.io">gulyasfeccferenc</a>
            </p>
        </StyledFooter>
    </>);
}
