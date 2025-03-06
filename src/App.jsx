import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }

  }, [])
  

  const saveToLS = (params) =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowfinished(!showFinished)
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item =>{
      return item.id !== id;
    })
    settodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item =>{
      return item.id !== id;
    })
    settodos(newTodos)
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    console.log(todos)
    saveToLS()
  }
  const handleChange = (e) => {
    settodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item =>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-200 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-4xl text-center'>Task Manager - Manage Your Day with Efficiency</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a To-do</h2>
          <div className="flex gap-4">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-slate-700 hover:bg-slate-900 text-white disabled:bg-slate-700 p-2 py-1 text-sm font-bold rounded-md '>Save</button>
          </div>
        </div>
        <input className='mx-2 my-2' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2 ' ></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Tasks to Display</div>}
          {todos.map(item => {
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e) =>{handleEdit(e, item.id)}} className='bg-slate-700 hover:bg-slate-900 text-white p-2 py-1  rounded-md mx-1'><CiEdit /></button>
              <button onClick={ (e) => {handleDelete(e, item.id)}} className='bg-slate-700 hover:bg-slate-900 text-white p-2 py-1 text-xl rounded-md m-1'><MdDeleteForever /></button>
            </div>
          </div>
        })}
        </div>
      </div>
    </>
  )
}

export default App
