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
    const [archivedTasks, setArchivedTask] = useLocalStorage("archive", [])

    const priorities = ["None", "Low", "Medium", "High"]
    const statuses = ["Created", "Started", "Completed"]

    function getPriorityNumber(priority) {
        switch (priority) {
            case 'None':
                return 4
            case 'Low':
                return 3
            case 'Medium':
                return 2                
            default:
                return 1
        }
    }

    //TODO add task function
    function addTask({ title, description, due, dueDateString, priority}) {
        //All new tasks have a progress of 30
        const progress = 30
        const created = Date.now()
        const status = "Created"
        const priorityNumber = getPriorityNumber(priority)

        const values = { id: uuidV4(), title, description, due, dueDateString, priority, priorityNumber, progress, created, status }
            
        setTasks(prevTasks => {
            return [values, ...prevTasks]
        })
        
    }

    function updateTask({ id, title, description, due, dueDateString, priority, status, created, destroy }) {
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
        const priorityNumber = getPriorityNumber(priority)

        //Destroy old entry
        setTasks(prevTasks => {
            //Filter through tasks and only keep tasks that don't match the ID
            return prevTasks.filter(task => task.id !== id)
        })
        
        //Add new entry if task is not simply getting deleted
        if (!destroy) {
            setTasks(prevTasks => {
                return [...prevTasks, {id: uuidV4(), title, description, due, dueDateString, progress, priority, priorityNumber, status, created}]
            })  
        } 
    }

    function archiveTask({ id, title, description, due, dueDateString, priority, status, progress, created }) {

        //Destroy old entry
        setTasks(prevTasks => {
            //Filter through tasks and only keep tasks that don't match the ID
            return prevTasks.filter(task => task.id !== id)
        })
        
        const values = { id, title, description, due, dueDateString, priority, status, progress, created }
            
        setArchivedTask(prevTasks => {
            return [...prevTasks, values]
        })
        
    }

    return (
        <TasksContext.Provider value={{tasks, setTasks, addTask, updateTask, archiveTask, setEditTask, priorities, statuses, editTask, archivedTasks}}>
            { children }
        </TasksContext.Provider>
        
    )
}

