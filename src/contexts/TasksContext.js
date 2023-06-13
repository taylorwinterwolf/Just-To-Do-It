import { createContext, useContext, useEffect, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/UseLocalStorage"
import dummyData from '../components/dummyData'

const TasksContext = createContext()

export function useTasks() {
    return useContext(TasksContext)
}

export const TasksProvider = ({ children }) => {    
    const [flagUpdate, setFlagUpdate] = useState(false)
    const [tasks, setTasks] = useLocalStorage("tasks", [])
    const [editTask, setEditTask] = useLocalStorage("edit", [])
    const [archivedTasks, setArchivedTask] = useLocalStorage("archive", [])
    const [sortBySelectedValue, setSortBySelectedValue] = useLocalStorage("sorting", [
                { section: "Completed", sortBy: "default" },
                { section: "Started", sortBy: "default" },
                { section: "Created", sortBy: "default" }
            ])
            
    useEffect(() => {
        if (flagUpdate) {
            //console.log("USE EFFECT TRIGGERED")
            sortBySelectedValue.forEach(item => {                
                sortTasksBy(item.sortBy, item.section)
            })
            setFlagUpdate(false)    
        }
    }, [flagUpdate])

    //console.log("VALUE OF flagUpdate: ", flagUpdate)
    //console.log("VALUE OF seletedValue: ", sortBySelectedValue)

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
    function addTask({ title, description, due, dueDateString, priority }) {

        //All new tasks have a progress of 30
        const progress = 30
        const created = Date.now()
        const status = "Created"
        const priorityNumber = getPriorityNumber(priority)

        const values = { id: uuidV4(), title, description, due, dueDateString, priority, priorityNumber, progress, created, status }
            
        setTasks(prevTasks => {
            return [values, ...prevTasks]
        })

        setFlagUpdate(true)
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

        setFlagUpdate(true)
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

    function sortTasksBy(sortBy, taskSection) {
        setTasks(prevTasks => {
            //console.log("SORTING TASKS BY: ", sortBy, "IN THE the ", taskSection, "SECTION")
            //console.log("TASKS INSIDE SORT FUNCTION", prevTasks)  
            const filteredTasks = prevTasks.filter(task => task.status === taskSection)
            const unSortedTasks = prevTasks.filter(task => task.status !== taskSection)

            let sortedTasks = filteredTasks

            if (sortBy === 'p-high') {
            sortedTasks = [...filteredTasks].sort((task1, task2) => task1.priorityNumber - task2.priorityNumber)
            } else if (sortBy === 'p-low') {
            sortedTasks = [...filteredTasks].sort((task1, task2) => task2.priorityNumber - task1.priorityNumber)
            } else if (sortBy === 'asc') {
            sortedTasks = [...filteredTasks].sort((task1, task2) => task1.created - task2.created)
            } else {
            sortedTasks = [...filteredTasks].sort((task1, task2) => task2.created - task1.created)
            }

            const combinedSections = [...sortedTasks, ...unSortedTasks]
            //console.log("SORTED TASKS: ", combinedSections)

            return combinedSections;
        });                     
    }

    function generateDummyData() {
        //console.log("GENERATING DUMMY DATA")
        const dumData = dummyData()
        setTasks(prevTasks => {
            return [...prevTasks, ...dumData]
        }) 
        
        setFlagUpdate(true)
    }

    function clearTasks() {
        setTasks([])
        //TO DO!! SET THIS TO SOMETHING DEFAULT
        setSortBySelectedValue([
            { section: "Completed", sortBy: "default" },
            { section: "Started", sortBy: "default" },
            { section: "Created", sortBy: "default" }
        ])
    }

    return (
        <TasksContext.Provider value={{addTask, updateTask, archiveTask, sortTasksBy, generateDummyData, clearTasks, tasks, setTasks, setEditTask, priorities, statuses, editTask, archivedTasks, setArchivedTask, sortBySelectedValue, setSortBySelectedValue}}>
            { children }
        </TasksContext.Provider>
        
    )
}

