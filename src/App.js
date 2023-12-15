// import logo from './logo.svg';
// import './App.css';
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import {useState} from "react";
import {nanoid} from "nanoid";


function App(props) {
    const [tasks, setTasks] = useState(props.tasks)

    function addTask(name) {
        alert(name)
        const newTask = {id: `todo-${nanoid()}`, name, completed: false}
        setTasks([...tasks, newTask])
    }

    function toggleTaskCompleted(id) {
        console.log(tasks[0]);
        const updatedTasks = tasks.map((task) => {
            if (id === task.id) {
                return {...task, completed: !task.completed}
            }
            return task
        })
        setTasks(updatedTasks)
    }

    function deleteTask(id) {
        console.log(id);
        const remainingTasks = tasks.filter((task) => id !== task.id)
        setTasks(remainingTasks)
    }

    function editTask(id, newName) {
        const editedTaskList = tasks.map((task) => {
            if (id === task.id) {
                return {...task, name: newName}
            }
            return task
        });
        setTasks(editedTaskList)
    }

    const taskList = props.tasks?.map((task) => <Todo id={task.id} name={task.name} completed={task.completed}
                                                      key={task.id} toggleTaskCompleted={toggleTaskCompleted}
                                                      deleteTask={deleteTask}
                                                      editTask={editTask}/>)

    const tasksNoun = taskList.length === 1 ? "task" : "tasks";
    const headingText = `${taskList.length} ${tasksNoun} remaining`;
    // console.log("taskList: ", taskList)
    return (<div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form addTask={addTask}/>
        <div className="filters btn-group stack-exception">
            <FilterButton/>
            <FilterButton/>
            <FilterButton/>
        </div>
        <h2 id="list-heading">
            {headingText}
        </h2>
        <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
        >
            {taskList}
        </ul>
    </div>);
}

export default App;
