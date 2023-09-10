import { useState, useEffect } from "react"
import Todo from "./components/Todo";

const todoList = [
  { id: 1, content: "10/19 24:00 預約響饗吃到飽", status: false },
  { id: 2, content: "8/10 安安生日", status: false },
  { id: 3, content: "9/9 預購中秋節禮盒", status: false },
  { id: 4, content: "週日前完成作業", status: false },
  { id: 5, content: "準備Mars的生日禮物", status: false },
  { id: 6, content: "9/14 19:30 與慈吃晚餐", status: false },
]
function App() {
  const [todos, setTodos] = useState(todoList);
  const navItems = ["全部", "待完成", "已完成"];
  const [currStatus, setCurrStatus]= useState("全部");
  const [currTodos, setCurrTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const newTodos = todos.filter(todo => currStatus === "待完成" ? !todo.status : (currStatus === "已完成" ? todo.status : todo));
      setCurrTodos(newTodos);
  }, [currStatus, todos]);


  const addTodo = (e)  => {
    e.preventDefault();
    const newTodoList = [...todos, {
      id: new Date().getTime(),
      content: newTodo,
      status: false,
    }];
    setTodos(newTodoList);
    setNewTodo("");
  }

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav style={{"justifyContent": "center"}}>
          <a href="#"><img className="logoImg" src="https://raw.githubusercontent.com/jesswu1551/react_todo/main/src/assets/logo.png" alt="logoImg" /></a>
        </nav>
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <input type="text" value={newTodo} placeholder="請輸入待辦事項"
                     onChange={(e) => { setNewTodo(e.target.value); }}
                     onKeyDown={(e) => { if (e.key === "Enter") { addTodo(e); } }} />
              <a href="#" onClick={(e) => addTodo(e)}>
                <i className="fa fa-plus"></i>
              </a>
            </div>
            {
              todos.length ? (
                <div className="todoList_list">
                  <ul className="todoList_tab">
                    {
                      navItems.map(navItem => (
                        <li key={navItem}>
                          <a href="#" className={currStatus === navItem ? "active" : ""}
                              onClick={(e) => { setCurrStatus(e.target.text); }}>{navItem}</a>
                        </li>
                      ))
                    }
                  </ul>
                  <Todo todos={todos} currTodos={currTodos} setTodos={setTodos} />
                </div>
              ) : <p className="no_item">目前尚無待辦事項</p>
            }
          </div>
        </div>
    </div>
    </>
  )
}

export default App
