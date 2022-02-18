import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInEmailAndPassword } from "../../db/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "../../components/Modal/AuthModal";

const Login = () => {
    const [isModal, setIsModal] = useState<boolean>(false);
    const [user, error] = useAuthState(auth);
    const history = useNavigate();
    const arr: number[] = Array.from(Array(40).keys());

    useEffect(() => {
      if (user) history("/dashboard");
      if (error) console.error(error); 
    }, [error, history, user]);

    const onClickHandler = () => {
      setIsModal(true);
    }

    const logIn = (res: { email: string; password: string }): void => {
      const { email, password } = res;

      res && signInEmailAndPassword(email, password);
      setIsModal(false);
    }

    const closeModal = () => {
      setIsModal(false);
    }

    return (
      !user ? <div className="login" data-cy='login' onDoubleClick={onClickHandler}>
        <ul className="login__animation">
          {arr.map((i: number) => {
            return <li key={i} className="login__animation__text">Dream House</li>
          })}
        </ul>
        {isModal && <Modal login={logIn} close={closeModal} />}
      </div> : <></>
    )
}

export default Login;
