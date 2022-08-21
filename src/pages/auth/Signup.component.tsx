import {Button, Input, Spacer} from '@nextui-org/react';
import {useState} from 'react';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

const initialFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignupComponent = () => {
    const [formFields, setFormFields] = useState(initialFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            console.error('Password not match');
            return;
        }
        try {
            // @ts-ignore
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            const userDoc = await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();
        } catch (error) {
            console.error('User creation error', error);
        }
    }

    const resetFormFields = () => {
        setFormFields({...initialFormFields});
    }

    return (<div>
        <h2>Sign up</h2>
        <h3>with email and password</h3>
        <form onSubmit={handleSubmit}>
            <Input label="Teljes név"
                   clearable
                   required
                   value={displayName}
                   onChange={handleChange}
                   name="displayName"
                   autoComplete="name"
                   placeholder="pl.: Betyár Sándor" />
            <Spacer y={0.25}/>
            <Input label="E-mail cím"
                   clearable
                   required
                   value={email}
                    onChange={handleChange}
                   name="email"
                   autoComplete="email"
                   type="email"
                   placeholder="betyarsanyi@reparetek.hu" />
            <Spacer y={0.25}/>
            <Input.Password label="Jelszó"
                   required
                    value={password}
                    onChange={handleChange}
                    name="password"
                   autoComplete="new-password"
                   placeholder="Szupertitkos" />
            <Spacer y={0.25}/>
            <Input.Password label="Jelszó mégegyszer"
                   required
                    value={confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                   autoComplete="new-password"
                   placeholder="A szupertitkos jelszó mégegyszer" />
            <Spacer y={0.25}/>
            <Button type="submit">Regisztrálok!</Button>
        </form>
    </div>);
}

export default SignupComponent;
