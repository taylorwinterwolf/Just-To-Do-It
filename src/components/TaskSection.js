import { Form, Badge, Row, Col } from 'react-bootstrap'
import TaskCard from './TaskCard'
import grayToDo from '../assets/check-box-gray.png'
import blueToDo from '../assets/check-box-blue.png'
import greenToDo from '../assets/check-box-green.png'
import { useTasks } from '../contexts/TasksContext'

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
   const { tasks } = useTasks()
  const sortBy = ["Priority", "Date"]

  const checkImg = (() => {
        switch (section) {
            case 'To Do':
                return grayToDo
            case 'In Progress':
                return blueToDo
            case 'Completed':
                return greenToDo
            default:
                return grayToDo
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

  function sortTasks(tasks, by="dateDEC") {
    let sortedTasks = tasks

    if (by === 'dateASC') {
      sortedTasks = tasks.sort((t1, t2) => t1.created - t2.created)
    } else if(by === 'dateDEC') {
      sortedTasks = tasks.sort((t1, t2) => t2.created - t1.created)
    }
        
    return sortedTasks
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
                <Form.Select className='backgroundGray border-0'>
                  <option>Sort By</option>
                  {sortBy.map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Badge>
        <Row>
          <Col>
          {sortTasks(tasks)
            .map(task => {
              if (task.status === taskStatus) {
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
              }
              return null
            })}
          </Col>
        </Row>
      </Col>
    )
}