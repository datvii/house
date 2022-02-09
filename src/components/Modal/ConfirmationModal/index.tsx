import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../db/firebase';
import { Props } from './interfaces';

const ConfirmationModal = ({ close, id, updatedData }: Props) => {
    const agree = async () => {
        // console.log(close, id, updatedData);

        if (updatedData) {
            id && await updateDoc(doc(db, "house", id), updatedData);
        } else {
            id && await deleteDoc(doc(db, "house", id));
        }

        close(true);
    }
    
    const closeModal = (): void => {
        close(true);
    }

    return (
        <div className='modal-confirmation'>
            <h1>Are you sure?</h1>
            <button type='button' onClick={agree}>Yes</button>
            <button type='button' onClick={closeModal}>No</button>
        </div>
    )
}

export default ConfirmationModal
