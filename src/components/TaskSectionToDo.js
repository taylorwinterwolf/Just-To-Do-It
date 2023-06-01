import { Form, Badge, Row, Col } from 'react-bootstrap'
import TaskCard from './TaskCard'
import blueToDo from '../assets/check-box-blue.png'
import { useTasks } from '../contexts/TasksContext'
import { useEffect, useRef } from 'react'

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

export default function TaskSectionToDo({ section, openUpdateModal }) {
  const { tasks, sortTasksBy } = useTasks()
  const sortByArray = ["High Priority", "Low Priority", "Newest", "Oldest"]
  const sortByObject = { "High Priority": "p-high", "Low Priority": "p-low", "Newest": "dec", "Oldest": "asc" }
  const sortRef = useRef()

  function sortTasks() {
    sortTasksBy(sortRef.current.value, section)
  }
  
  return (
      <Col>
        <Badge className='w-100 backgroundGray mainTxt d-flex justify-content-start mb-3'>
          <Col className='d-flex justify-content-start' sm={6}>
          <div style={custStyle.toDoImgWrap}><img src={blueToDo} alt="To Do Gray" className="w-100" /> </div>                  
          <p style={custStyle.toDoLable} className='mb-0'>To Do</p> 
          </Col>
          <Col className='d-flex justify-content-end' sm={6}>
            <Form className='justify-content-end'>
              <Form.Group controlId='filterID'>
              <Form.Select className='backgroundGray border-0' ref={sortRef} onChange={sortTasks}>
                  <option value="sortBy">Sort By</option>
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
          {tasks.filter(task => task.status === section).map(task => {
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