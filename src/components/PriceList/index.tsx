import moment from 'moment';
import { useState, useEffect, useMemo, useCallback } from 'react'
// import Entry from '../Entry'
import { Props } from './interfaces';
import { /* getRate, */ uid } from './utils';

const List = ({ /* onChange, */ onRemove, data, user }: Props) => {
    // const [isEdit, setIsEdit] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [newData, setNewData] = useState(data || []);
    const [filteredArr, setFilteredArr] = useState<any>({});
    const [currency] = useState<string>('27');

    const getSum = useMemo(() => !!newData && newData.map((o: any) => +o.price).reduce((a: number, b: number) => Number(a) + Number(b), 0), [newData]);

    const groupBy = useCallback((arr: any, property: string) => {
        return arr.reduce((memo: Record<string, any>, x: any) => {
            if (!memo[x[property]]) { 
                memo[x[property]] = []; 
            }

            memo[x[property]].push(x);

            return memo;
        }, {});
    }, []);

    const usdRate = useCallback(() => {
        // getRate().then(data => setCurrency(data));
        const time = moment(new Date(), "DD/MM/YYYY HH:mm:ss");
        const lsCurr = localStorage.getItem('currency');
        const lsTime = localStorage.getItem('time');
        const res = lsTime && moment.utc(time.diff(moment(lsTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss").split(':')[0];
        console.log(currency, res);

        if (lsTime && res && res >= '01') {
            return;
        } else {
            if (lsCurr !== currency) {
                localStorage.clear();
                localStorage.setItem('currency', currency);
                localStorage.setItem('time', time.toString());
            }
        }
    }, [currency]);

    useEffect(() => {
        usdRate();
    }, [usdRate]);

    useEffect(() => {
        getSum && setTotal(getSum);
    }, [newData, getSum]);

    useEffect(() => {
        console.log(data, newData);
        setNewData(data);
    }, [data, newData]);
    
    useEffect(() => {
        const arr = newData && groupBy(newData, 'type');
        console.log(filteredArr && Object.keys(filteredArr).length, arr && Object.keys(arr).length);
        if (arr && Object.keys(filteredArr).length !== Object.keys(arr).length) {
            setFilteredArr(arr);
        }
        // const a = filteredArr && Object.entries(filteredArr).map((el: any, i: any) => {
        //     console.log(el, i);
        //     return el;
        // })
        // console.log(filteredArr);
        console.log(filteredArr, arr);
        
    }, [filteredArr, groupBy, newData]);
    
    const checkUser = useMemo(() => {
        return user?.includes('datvi') ? 'd' : 'a'
    }, [user]);

    const removeEntry = (id: string) => {
        onRemove(id);
    }

    // const editEntry = (id: string) => {
    //     onChange(id);
    //     setIsEdit(true);
    // }
    const getTotal = useCallback((arr: any[]) => arr.map((o: any) => +o.price).reduce((a: number, b: number) => Number(a) + Number(b), 0), []);

    return (
        user ? (<section className='dashboard__info'>
            <h1>Entries</h1>
            <h2>Total: {total}$</h2>
            <ol> 
                <li><strong>Title</strong></li>
                <li><strong>Count</strong></li>
                <li><strong>Price</strong></li>
                <li><strong>Date</strong></li>
                <li><strong>Client</strong></li>
            </ol>
          
            {/* {isEdit && <Entry data={newData} isEdit={isEdit} />} */}
            {filteredArr && Object.entries(filteredArr).map((el: any, i: number) => {
                const title = el[0].split('_').join(' ');

                return <div key={uid(i)} className='dashboard__content'>
                    <h2>{title} <span style={{color: '#b92169'}}>( {getTotal(el[1]) || 0}$ )</span></h2>
                    {el[1].map((item: any, k: number) => {
                        return <ul key={uid(k)} className={`${item.type === 'decoration' ? 'bg__violet' : item.type === 'street_construction' ? 'bg__teal' : item.type === 'documents' ? 'bg__khaki' : 'bg__blue'}`}>
                            <li><span>{item.product}</span></li>
                            <li><span>{item.count}</span></li>
                            <li><span>{item.price}$</span></li>
                            <li><span>{new Date(+item.date * 1000).toLocaleDateString()}</span></li>
                            <li>
                                <button onClick={() => removeEntry(item.id)}>Remove</button>
                                {/* <button onClick={() => editEntry(item.id)}>Edit</button> */}
                            </li>
                            <li className={checkUser}><strong>{checkUser}</strong></li>
                        </ul>
                    })}
                </div>;
            })}
        </section>
        ) : <h3 className='loading'>Loading...</h3>
    )
}

export default List