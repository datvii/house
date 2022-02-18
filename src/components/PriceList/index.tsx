// import moment from 'moment';
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

    const getSum = useMemo(() => !!newData && newData.map((o: any): number => +o.price).reduce((a: number, b: number) => Number(a) + Number(b), 0), [newData]);

    const groupBy = useCallback((arr: any, property: string) => {
        return arr.reduce((memo: Record<string, any>, x: any) => {
            if (!memo[x[property]]) { 
                memo[x[property]] = []; 
            }

            memo[x[property]].push(x);

            return memo;
        }, {});
    }, []);

    // const usdRate = useCallback(() => {
    //     // getRate().then(data => setCurrency(data));
    //     const time = moment(new Date(), "DD/MM/YYYY HH:mm:ss");
    //     const lsCurr = localStorage.getItem('currency');
    //     const lsTime = localStorage.getItem('time');
    //     const res = lsTime && moment.utc(time.diff(moment(lsTime,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss").split(':')[0];
    //     console.log(currency, res);

    //     if (lsTime && res && res >= '01') {
    //         return;
    //     } else {
    //         if (lsCurr !== currency) {
    //             localStorage.clear();
    //             localStorage.setItem('currency', currency);
    //             localStorage.setItem('time', time.toString());
    //         }
    //     }
    // }, [currency]);

    // useEffect(() => {
    //     usdRate();
    // }, [usdRate]);

    useEffect(() => {
        (getSum || getSum === 0) && setTotal(getSum);
    }, [newData, getSum]);

    useEffect(() => {
        setNewData(data);
    }, [data, newData]);

    useEffect(() => {
        const arr = newData && groupBy(newData, 'type');

        arr && setFilteredArr(arr);
    }, [groupBy, newData]);

    const removeEntry = (id: string) => {
        onRemove(id);
    }

    // const editEntry = (id: string) => {
    //     onChange(id);
    //     setIsEdit(true);
    // }
    const getTotal = useCallback((arr: any[]): number => arr.map((o: any) => +o.price).reduce((a: number, b: number) => Number(a) + Number(b), 0), []);
    const getConvertedMoney = useCallback((el: number): string => `${el || 0}₴ ~ ${Math.round(el / Number(currency))}$`, [currency]);
    const setBgColor = (type: string): string => type === 'decoration' ? 'bg__violet' : type === 'street_construction' ? 'bg__teal' : type === 'documents' ? 'bg__khaki' : 'bg__blue';
    
    return (
        user ? (<section className='dashboard__info'>
            <h1>Entries</h1>
            <h2 data-cy="total">Total: {getConvertedMoney(total)}</h2>
            <ol> 
                <li><strong>Title</strong></li>
                <li><strong>Count</strong></li>
                <li><strong>Price</strong></li>
                <li><strong>Date</strong></li>
                <li><strong>Client</strong></li>
            </ol>
            {!Object.keys(filteredArr).length && <h2>No entries!</h2>}
            {/* {isEdit && <Entry data={newData} isEdit={isEdit} />} */}
            {filteredArr && Object.entries(filteredArr).map((el: any, i: number) => {
                const title = el[0].split('_').join(' ');

                return <div key={uid(i)} className='dashboard__content' data-cy="dashboard-content">
                    <h2>{title} <span style={{color: '#b92169'}}>( {getConvertedMoney(getTotal(el[1]))} )</span></h2>
                    {el[1] && el[1].map((item: any, k: number) => {
                        return <ul key={uid(k)} className={setBgColor(item.type)}>
                            <li><span>{item.product}</span></li>
                            <li><span>{item.count}</span></li>
                            <li><span>{getConvertedMoney(item.price)}</span></li>
                            <li><span>{new Date(+item.date * 1000).toLocaleDateString()}</span></li>
                            <li>
                                <button onClick={() => removeEntry(item.id)}>Remove</button>
                                {/* <button onClick={() => editEntry(item.id)}>Edit</button> */}
                            </li>
                            <li className={item.user}><strong>{item.user}</strong></li>
                        </ul>
                    })}
                </div>;
            })}
        </section>
        ) : <h3 className='loading'>Loading...</h3>
    )
}

export default List