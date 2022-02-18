import { useCallback, useEffect, useRef, useState } from 'react';
import Entry from '../../components/Entry';
import Header from '../../components/Header';
import PriceList from '../../components/PriceList';
import { getAuth } from "firebase/auth";
import ConfirmationModal from '../../components/Modal/ConfirmationModal';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../db/firebase';

const Dashboard = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [data, setData] = useState(null);
  const idRef = useRef<string | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const getData = useCallback(async () => {
    const querySnapshot  = await getDocs(collection(db, "house"));
    const res: any = [];

    querySnapshot.forEach((doc: { id: string; data: () => any; }) => {
      res.push({...doc.data(), id: doc.id});
    });

    setData(res);
  }, []);
  
  useEffect(() => {
    if (isCreate) {
      getData()
      setIsCreate(false);
    }
  }, [getData, isModal, isCreate]);

  useEffect(() => {
    getData()
  }, [getData, isModal]);

  useEffect(() => {
    if (loading) {
      return;
    }
  }, [user, loading]);

  const onChangeHandler = (id: string) => {
    idRef.current = id;
    // setIsModal(true);
  }

  const onRemoveHandler = (id: string) => {
    idRef.current = id;
    setIsModal(true);
  }

  const onCreateHandler = (flag: boolean) => {
    setIsCreate(flag);
  }

  return (
    <>
      <Header />
      <section className='dashboard' data-cy='dashboard'>
        <div className="container">
          <Entry data={data} isEdit={false} onCreate={onCreateHandler} user={user ? user.email : ''} />
          <PriceList onRemove={onRemoveHandler} onChange={onChangeHandler} data={data} user={user ? user.email : ''} />
        </div>
      </section>
      { isModal && <ConfirmationModal close={() => setIsModal(false)} id={idRef.current} /> }
    </>
  )
}

export default Dashboard;
