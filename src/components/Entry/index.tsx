import { useMemo, useRef, useState } from 'react'
import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from '../../db/firebase';
import { Props } from './interfaces';
import { DataType } from '../PriceList/interfaces';

const Entry = ({data, isEdit = false, onCreate, user}: Props) => {
    const [formData, setFormData] = useState<DataType | { [key: string]: string | number }>({
        count: '',
        price: '',
        product: '',
        type: '',
    });
    const formRef = useRef<HTMLFormElement>(null);
    // const [edit] = useState<boolean>(isEdit || false);
    // const formRef = doc(collection(db, "house"));
    const onChangeRadio = (e: any) => {
        setFormData({
            ...formData,
            type: e.target.value,
        });
    }

    const onChangeHandler = (e: { target: { name: string; value: string; }; }) => {
        setFormData({
            ...formData,
            date: Math.round(+new Date() / 1000),
            user: user && user.includes('anna') ? 'a' : 'd', 
            [e.target.name]: e.target.value,
        });
    }

    const isEmpty = useMemo(() => !(formData.price && formData.count && formData.type && formData.product) ? true : false, [formData]);
    
    const onClickHandler = () => {
        console.log(formData);
        if (isEmpty) return;

        setDoc(doc(collection(db, "house")), formData);
        onCreate(true);
        formRef.current && formRef.current.reset();
        setFormData({
            ...formData,
            date: Math.round(+new Date() / 1000),
            user: user && user.includes('anna') ? 'a' : 'd', 
            count: '',
            price: '',
            product: '',
        });
    }

    return (
        <form  ref={formRef} className='dashboard__form' data-cy="form">
            <div className='dashboard__form__fields'>
                <input type="radio" onChange={onChangeRadio} value="decoration" name="type" id='house-1' /> <label htmlFor="house-1">Decoration</label><br />
                <input type="radio" onChange={onChangeRadio} value="street_construction" name="type" id='house-2' /> <label htmlFor="house-2">Street construction</label><br />
                <input type="radio" onChange={onChangeRadio} value="home_construction" name="type" id='house-3' /> <label htmlFor="house-3">Home construction</label><br />
                <input type="radio" onChange={onChangeRadio} value="documents" name="type" id='house-4' /> <label htmlFor="house-4">Documents</label>
            </div>
            <input type="text" name="product" placeholder="Product" onChange={onChangeHandler}/>
            <input type="number" name="count" placeholder='Count' onChange={onChangeHandler} />
            <input type="number" name="price" placeholder='Price' onChange={onChangeHandler} />
            <button type='button' onClick={() => onClickHandler()}>{true ? 'Add new entry' : 'Update Entry'}</button>
        </form>
    )
}

export default Entry
