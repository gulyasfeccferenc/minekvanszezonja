import {signInWithGoogleRedirect, signOutUser} from '../../utils/firebase/firebase.utils';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import mvszlogo from '../../assets/mvszlogo.png';
import {Button } from '@nextui-org/react';
import { Avatar } from '@nextui-org/react';
import { Navbar } from "@nextui-org/react";
import {NavBarLogo} from './NavBar.styles';

// @ts-ignore
const NavBar = () => {
    const currentUser = useSelector(selectCurrentUser);

    return (
        <Navbar isBordered={false} variant="sticky">
            <Navbar.Brand>
                <NavBarLogo src={mvszlogo} alt="minek van szezonja logo" />
            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                <Navbar.Link href="/">kezdőoldal</Navbar.Link>
                <Navbar.Link isActive href="/favourites">
                    kedvenceid
                </Navbar.Link>
                <Navbar.Link href="/seasonal">szezonálisok</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                {currentUser ?
                    <>
                        <Avatar
                            squared
                            text={currentUser?.displayName?.split(' ')[0]}
                            src={currentUser.photoURL} />
                        <Button auto flat href="#" onClick={signOutUser}>
                            Kijelentkezés
                        </Button>
                    </> :
                    <Navbar.Link color="inherit" href="#">
                        <button onClick={signInWithGoogleRedirect}>Sign in with gógle</button>
                    </Navbar.Link>}
            </Navbar.Content>
        </Navbar>
    )
}

export default NavBar;