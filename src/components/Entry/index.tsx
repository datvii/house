import { useRef, useState } from 'react'
import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from '../../db/firebase';
import { Props } from './interfaces';
import { DataType } from '../PriceList/interfaces';

const Entry = ({data, isEdit = false, onCreate}: Props) => {
    const [formData, setFormData] = useState<DataType | { [key: string]: string | number }>({});
    const formRef = useRef<HTMLFormElement>(null);
    // const [edit] = useState<boolean>(isEdit || false);
    // const formRef = doc(collection(db, "house"));

    const onChangeHandler = (e: any) => {
        setFormData((formData) => ({
            ...formData,
            date: Math.round(+new Date() / 1000),
            [e.target.name]: e.target.value
        }));
    }

    const onClickHandler = () => {
        setDoc(doc(collection(db, "house")), formData);
        onCreate(true);
        
        setFormData({});
        formRef.current && formRef.current.reset();
    }

    return (
        <form  ref={formRef} className='dashboard__form'>
            <div className='dashboard__form__fields' onChange={onChangeHandler}>
                <input type="radio" value="decoration" name="type" id='house-1' /> <label htmlFor="house-1">Decoration</label><br />
                <input type="radio" value="street_construction" name="type" id='house-2' /> <label htmlFor="house-2">Street construction</label><br />
                <input type="radio" value="home_construction" name="type" id='house-3' /> <label htmlFor="house-3">Home construction</label><br />
                <input type="radio" value="documents" name="type" id='house-4' /> <label htmlFor="house-4">Documents</label>
            </div>
            <input type="text" required name="product" placeholder="Product" onChange={onChangeHandler}/>
            <input type="number" required name="count" placeholder='Count' onChange={onChangeHandler} />
            <input type="number" required name="price" placeholder='Price' onChange={onChangeHandler} />
            <button type='button' onClick={() => onClickHandler()} disabled={formData.type ? false : true}>{true ? 'Add new entry' : 'Update Entry'}</button>
        </form>
    )
}

export default Entry
