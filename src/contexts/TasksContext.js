import { createContext, useContext } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/UseLocalStorage"

const TasksContext = createContext()

export function useTasks() {
    return useContext(TasksContext)
}

export const TasksProvider = ({ children }) => {    
    const [tasks, setTasks] = useLocalStorage("tasks", [])
    const [editTask, setEditTask] = useLocalStorage("edit", [])

    const priorities = ["None", "Low", "Medium", "High"]
    const statuses = ["Created", "Started", "Completed"]

    //TODO add task function
    function addTask({ title, description, due, priority}) {
        //All new tasks have a progress of 30
        const progress = 30
        const created = Date.now()
        const status = "Created"

        const values = { id: uuidV4(), title, description, due, priority, progress, created, status }
        
        //console.log(values)
            
        setTasks(prevTasks => {
            return [...prevTasks, values]
        })
        
    }

    //TO DO update task function
    function updateTask({ id, title, description, due, priority, status, created, destroy }) {
        const progress = (() => {
            switch (status) {
                case 'Started':
                    return 60
                case 'Completed':
                    return 100                
                default:
                    return 30
            }
        })()

        //Destroy old entry
        setTasks(prevTasks => {
            //Filter through tasks and only keep tasks that don't match the ID
            return prevTasks.filter(task => task.id !== id)
        })
        
        //Add new entry if task is not simply getting deleted
        if (!destroy) {
            setTasks(prevTasks => {
                return [...prevTasks, {id: uuidV4(), title, description, due, progress, priority, status, created}]
            })  
        } 
    }

    return (
        <TasksContext.Provider value={{tasks, addTask, updateTask, setEditTask, priorities, statuses, editTask}}>
            { children }
        </TasksContext.Provider>
    )
}

