import { Form, Badge, Row, Col } from 'react-bootstrap'
import TaskCard from './TaskCard'
import yellowToDo from '../assets/check-box-yellow.png'
import blueToDo from '../assets/check-box-blue.png'
import greenToDo from '../assets/check-box-green.png'
import { useTasks } from '../contexts/TasksContext'
import { useRef, useEffect } from 'react'

const custStyle = {
  mainTxt: {
    color: '#707070'
  },
  toDoImgWrap: {
    maxWidth: '20px',
    paddingTop: '8px'
  },
  toDoLable: {
    padding: '10px 5px 0px 5px',
    fontSize: '1rem',
    color: '#707070'
  },
}

export default function TaskSection({ section, openUpdateModal }) {
  const { tasks, setTasks } = useTasks()
  const prevTasksRef = useRef([])
  const sortByArray = ["High Priority", "Low Priority", "Newest", "Oldest"]
  const sortByObject = { "High Priority": "p-high", "Low Priority": "p-low", "Newest": "dec", "Oldest": "asc" }
  const sortRef = useRef()
  
  useEffect(() => {
    console.log("Inside Use Effect: ", sortRef.current.value)
    setTasks(prevTasks => {
      // Check if the current count is different from the previous count
      if (prevTasks !== prevTasksRef.current) {
        console.log('Count has changed:', tasks);
        sortTasks()
      }
      console.log("Previous Tasks: ", prevTasks)
      prevTasksRef.current = prevTasks
      return prevTasks;
    })   
  },[tasks])

  const checkImg = (() => {
        switch (section) {
            case 'To Do':
                return blueToDo
            case 'In Progress':
                return yellowToDo
            case 'Completed':
                return greenToDo
            default:
                return blueToDo
        }
  })()
  
  const taskStatus = (() => {
    switch (section) {
        case 'To Do':
            return "Created"
        case 'In Progress':
            return "Started"
        case 'Completed':
            return "Completed"
        default:
            return "Created"
    }
  })()

  function sortTasks() {
    console.log("Sort Tasks by: ", sortRef.current.value, "In the ", taskStatus, "section")
    const sortBy = sortRef.current.value
    const filteredTasks = tasks.filter(task => task.status === taskStatus)
    const unSortedTasks = tasks.filter(task => task.status !== taskStatus)

    let sortedTasks = filteredTasks

    if (sortBy === 'p-high') {
      sortedTasks = filteredTasks.sort((task1, task2) => task1.priorityNumber - task2.priorityNumber)
    } else if (sortBy === 'p-low') {
      sortedTasks = filteredTasks.sort((task1, task2) => task2.priorityNumber - task1.priorityNumber)
    } else if (sortBy === 'asc') {
      sortedTasks = filteredTasks.sort((task1, task2) => task1.created - task2.created)
    } else {
      sortedTasks = filteredTasks.sort((task1, task2) => task2.created - task1.created)
    }

    const combinedSections = [...sortedTasks, ...unSortedTasks]
    //console.log(combinedSections)
    //console.log(unSortedTasks)

    setTasks(combinedSections)   
  }

  return (
      <Col>
        <Badge className='w-100 backgroundGray mainTxt d-flex justify-content-start mb-3'>
          <Col className='d-flex justify-content-start' sm={6}>
          <div style={custStyle.toDoImgWrap}><img src={checkImg} alt="To Do Gray" className="w-100" /> </div>                  
          <p style={custStyle.toDoLable} className='mb-0'>{section}</p> 
          </Col>
          <Col className='d-flex justify-content-end' sm={6}>
            <Form className='justify-content-end'>
              <Form.Group controlId='filterID'>
              <Form.Select className='backgroundGray border-0' ref={sortRef} onChange={sortTasks}>
                  <option>Sort By</option>
                  {sortByArray.map(value => (
                    <option key={value} value={sortByObject[value]}>{value}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Badge>
        <Row>
          <Col>
          {tasks.filter(task => task.status === taskStatus).map(task => {
              return (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  due={task.due}
                  dueDateString={task.dueDateString}
                  created={task.created}
                  progress={task.progress}
                  priority={task.priority}
                  status={task.status}
                  openModal={openUpdateModal}
                />  
              )  
          })}
          </Col>
        </Row>
      </Col>
    )
}