import { Form, Badge, Row, Col } from 'react-bootstrap'
import TaskCard from './TaskCard'
import yellowToDo from '../assets/check-box-yellow.png'
import blueToDo from '../assets/check-box-blue.png'
import greenToDo from '../assets/check-box-green.png'
import { useTasks } from '../contexts/TasksContext'
import { useRef } from 'react'

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

export default function TaskSections({ section, openUpdateModal }) {
    const { tasks, sortTasksBy, setSortBySelectedValue, sortBySelectedValue } = useTasks()
    const sortByObject = { "p-high":"High Priority", "p-low":"Low Priority", "dec":"Newest", "asc":"Oldest" }
    const sortByKey = [
        { priority: "High Priority", priorityValue: "p-high" },
        { priority: "Low Priority", priorityValue: "p-low" },
        { priority: "Newest", priorityValue: "dec" },
        { priority: "Oldest", priorityValue: "asc" }
    ]
  const sortRef = useRef()

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
  
  const taskSection = (() => {
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
    
    const sortSelected = sortBySelectedValue.find(sortItem => sortItem.section === taskSection)
    //console.log("sortSelected VAR: ", sortSelected)

  function sortTasks() {
    sortTasksBy(sortRef.current.value, taskSection)
      
    if (sortBySelectedValue.length === 0 || sortBySelectedValue[0] === null) {  
      setSortBySelectedValue([{ section: taskSection, sortBy: sortRef.current.value }])
    } else {
      setSortBySelectedValue(prevSelectedValue => {
        //Remove value for this section
          const filteredValue = prevSelectedValue.filter(item => item.section !== taskSection);
        //Replace with new value for this section
        const updatedValue = [...filteredValue, { section: taskSection, sortBy: sortRef.current.value }];
        return updatedValue;
      })  
    }    
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
                <Form.Select className='backgroundGray border-0' ref={sortRef} onChange={sortTasks} defaultValue="Top Spot">
                    {sortSelected.sortBy === 'default' ? (
                        <option value = "default">Sort By</option>
                    ) : (
                        <option value={sortByObject[sortSelected.sortBy]}>{sortByObject[sortSelected.sortBy]}</option>
                    )}
                    {sortByKey.map(item => (
                        item.priorityValue !== sortSelected.sortBy && (
                            <option key={item.priorityValue} value={item.priorityValue}>{item.priority}</option>
                        )
                    ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
        </Badge>
        <Row>
          <Col>
          {tasks.filter(task => task.status === taskSection).map(task => {
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