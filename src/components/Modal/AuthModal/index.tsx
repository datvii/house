import { useState } from 'react'
import { Form, Props } from './interfaces';

const AuthModal = ({ login, close }: Props) => {
    const [formData, setFormData] = useState<Form>({
        email: null,
        password: null
    });

    const onChangeHandler = (e: { target: { name: any; value: string; }; }): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const logIn = (): void => {
        formData.email && formData.password ? login(formData) : console.log('Validation error');
    }

    const closeModal = (): void => {
        close(true);
    }

    return (
        <form className='modal' data-cy="modal">
            <input onChange={onChangeHandler} type="text" name="email" placeholder='Email' />
            <input onChange={onChangeHandler} type="password" name="password" placeholder='Password' />
            <button type='button' data-cy="modal-login" onClick={logIn}>Login</button>
            <button type='button' data-cy="modal-close" onClick={closeModal}>Close</button>
        </form>
    )
}

export default AuthModal
