import {useEffect, useState} from 'react';
import '../../src/App.css';
import axios from '../config/axios';
import TaskCard from '../component/TaskCard';
 
const defaultInput = {
    date: '',
    time: '',
    text: ''
}


function ListPage() {  
  const [input, setInput] = useState(defaultInput);
  const [list,setList] = useState();
  const [sortedList, setSortedList] = useState();
  const [allow, setAllow] = useState(false);

  async function getList() {
    const res =  await axios({method: 'get', url: 'http://localhost:8000/list/getlist'});
    setList([...res.data]); 
  }  

  async function add() {
    await axios({method: 'post', url: 'http://localhost:8000/list/add', data: {
      date: input.date,
      time: input.time,
      text: input.text
    }})
    .then(() => {
      getList();
      setInput(defaultInput);
    })
  }

  
  
  useEffect(() => {
    getList();
  }, []);


  useEffect(() => {
    if(!!input.date && !!input.time && !!input.text.replaceAll(' ','')){
      setAllow(true);
    } else {
      setAllow(false);
    }
  }, [input]);

  useEffect(() => {
    async function sort() {
      const sortedList = {};
      const listArr = [...list];
      
      listArr.sort((a, b) => b.date.replaceAll('-','') - a.date.replaceAll('-',''));
      
      for(let el of listArr) {
          if(!sortedList[el.date]) {
            sortedList[el.date] = [];
            sortedList[el.date].push(el);
          } else {
            sortedList[el.date].push(el);
          }
      }

     const sortedArr = [];
     for(let el in sortedList) {
        const ob = {};
        ob.date = el;
        ob.task = sortedList[el].sort((a, b) => b.time.replaceAll(':','') - a.time.replaceAll(':',''));
        sortedArr.push(ob);
     }

     sortedArr.sort((a, b) => b.date.replaceAll('-','') - a.date.replaceAll('-',''));

     setSortedList([...sortedArr]);
  }

    if(list){
      sort();
    }
  }, [list]);




    

  return (
    <div> 
      <div className='inputBox'>
        <input className='inputDate' type='date' id='date' name='date' value={input.date} onChange = {(e) => setInput({...input, date : e.target.value})}></input>
        <input className='inputTime' type='time' id='time' name='time' value={input.time} onChange = {(e) => setInput({...input, time : e.target.value})}></input>
        <input className='inputText' type='text' id='text' name='text' placeholder='add todo' value={input.text} onChange = {(e) => setInput({...input, text : e.target.value})} ></input>
        {allow && <button className='pageButton bg-green' onClick={add}>Add</button>}
        {!allow && <button className='pageButton bg-gray'>Add</button>}
        <button className='profileButton pageButton' onClick={() => {
          window.location.replace('http://localhost:3000/profile');
        }}>Profile</button>

      </div>
     <div className='mainbox'>
        {sortedList?.map(el => 
          <div key={el.date} className='daybox bg-blue'><p>{el.date}</p>
            <div>
              {el.task.map(e =>  <div key={e.id}><TaskCard data = {e} getList = {getList} /></div>)}
            </div>
          </div>
        )}
     </div>
    </div>    
  )

}

  

export default ListPage ;