import './App.css'
import TaskList from "./components/TaskList.tsx";
import AddTask from "./components/AddTask.tsx";

function App() {

  return (
    <div className="container mx-auto w-5xl shadow-xl p-5 mt-10">
        <AddTask/>
        <TaskList/>
    </div>
  )
}

export default App
