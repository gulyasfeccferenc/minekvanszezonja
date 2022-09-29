import NavBar from '../Navigation/NavBar.component';
import {Outlet} from 'react-router';
import {FooterComponent} from './footer.component';
import {MainComponent} from './pageshell.styles';

export const PageshellComponent = () => {
    return (<>
        <NavBar />
        <MainComponent>
            <Outlet />
        </MainComponent>
        <FooterComponent />
        </>)
}
