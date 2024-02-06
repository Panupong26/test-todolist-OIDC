import { useEffect, useState } from "react";
import axios from "../config/axios";

export default function TaskCard({ data, getList }) {
    const [isEdit, setIsEdit] = useState(false);
    const [input, setInput] = useState(data);
    const [allow, setAllow] = useState(false);

    async function update() {
        await axios({method: 'patch', url: `http://localhost:8000/list/edit`, data: {
          date: input.date,
          time: input.time,
          text: input.text,
          id: input.id
        }})
        .then(() => {
            setIsEdit(false);
            setAllow(false);
            getList();
        })
    }
       
    async function deleteList() {
        await axios({ method: 'delete', url: 'http://localhost:8000/list/delete', data: {id : data.id}})
        .then(() => {
            getList();
        })
    }

    function cancleEdit() {
        setInput({...data});
        setIsEdit(false);
    }

    useEffect(() => {
        if(input.date !== data.date || input.time !== data.time || (input.text.replaceAll(' ','') !== data.text && !!input.text.replaceAll(' ',''))) {
            setAllow(true);
        } else {
            setAllow(false);
        }

    }, [input, data.date, data.text, data.time])
    

    return <>
        <div className='taskbox bg-white'>
            <div>
                <input className='inputEdit' disabled={!isEdit} value={input?.date} type='date' onChange={e => setInput({...input, date: e.target.value})}></input>
                <input className='inputEdit' disabled={!isEdit} value={input?.time} type='time' onChange={e => setInput({...input, time: e.target.value})}></input>
            </div>
            <input className='inputEdit inputCardText' disabled={!isEdit} value={input?.text} type='text' onChange={e => setInput({...input, text: e.target.value})}></input>
            <div>
                {isEdit && allow && <button className='cardButton' onClick={update}>Done</button>}
                {isEdit && !allow && <button className='cardButton bg-gray'>Done</button>}
                {isEdit && <button className='cardButton' onClick={cancleEdit}>Cancle</button>}
                {!isEdit && <button className='cardButton bg-yellow' onClick={() => setIsEdit(true)}>Edit</button>}
                <button className='cardButton bg-red' onClick={deleteList}>Delete</button>
            </div>
        </div>
    </>
}