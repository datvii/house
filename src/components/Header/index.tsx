import { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../db/firebase";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Header = () => {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState<string | null>(null);
    const history = useNavigate();

    useEffect(() => {
      if (loading) {
        return;
      }

      if (!user) {
        return history("/");
      }

      user && setName(user.email);
    }, [user, loading, history]);

    const signOut = async () => {
        await auth.signOut();
    };

    return (
        <header className='header'>
            <div className="container">
                <strong className="header__logo">
                    <Link to="/">
                        Dream House
                    </Link>
                </strong>
                <div className="header__content">
                    <span>{name?.includes('anna') ? 'Anna' : 'David'}</span>
                    <a href="#/" className="header__btn" onClick={signOut}>Logout</a>
                </div>
            </div>
        </header>
    )
}

export default Header
