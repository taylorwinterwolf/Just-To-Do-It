import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import checkBox from './assets/list-check.png'
import addPlus from './assets/add.png'
import minusBtn from './assets/minus.png'
import generateBtn from './assets/list.png'
import TaskSections from './components/TaskSections'
import ArchiveSection from './components/ArchiveSection'
import AddTaskModal from './components/AddTaskModal'
import UpdateTaskModal from './components/UpdateTaskModal'

import { useTasks } from './contexts/TasksContext'
import { useState } from 'react'

import { Container, Row, Col, Badge } from 'react-bootstrap';

function App() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false)
  const { archivedTasks, generateDummyData, clearTasks } = useTasks()
  const taskSections = ["To Do", "In Progress", "Completed"]

  return (
    <>
      <Container className="vh-100">
        <Row direction='horizontal' className="vh-100">
          <Col direction='vertical' style={{ backgroundColor: '#E3E3E3' }} sm={3} md={2}>
            <Row className='mb-3'>
              <Col sm={12}>
                <div style={{ maxWidth: '33px', paddingTop: '15px' }} className='m-auto'><img src={checkBox} alt="List Check" className="w-100" /></div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} onClick={() => setShowAddTaskModal(true)} style={{cursor: 'pointer'}} className='navItem'>
                <div style={{ maxWidth: '33px', paddingTop: '15px' }} className='m-auto'><img src={addPlus} alt="Add Task" className="w-100" /></div>
                <p className='text-center'>Add New Task</p>
              </Col>
            </Row>
            <Row>
              <Col sm={12} onClick={generateDummyData} style={{cursor: 'pointer'}} className='navItem'>
                <div style={{ maxWidth: '33px', paddingTop: '15px' }} className='m-auto'><img src={generateBtn} alt="Add Task" className="w-100" /></div>
                <p className='text-center'>Auto Generate Tasks</p>
              </Col>
            </Row>
            <Row>
              <Col sm={12} onClick={clearTasks} style={{cursor: 'pointer'}} className='navItem'>
                <div style={{ maxWidth: '33px', paddingTop: '15px' }} className='m-auto'><img src={minusBtn} alt="Add Task" className="w-100" /></div>
                <p className='text-center'>Clear All Tasks</p>
              </Col>
            </Row>
          </Col>
          <Col direction='horizontal' sm={9} md={10}>
            <Row>
              <div className='d-flex justify-content-center'>
                <p className='headerFont p-0 me-2'>JUST TO DO IT</p>
                <div style={{ maxWidth: '33px', paddingTop: '15px' }}><img src={checkBox} alt="List Check" className="w-100" /></div>
              </div>
            </Row>
            <Row>
              {taskSections.map(mapSection => (
                <TaskSections key={mapSection} section={mapSection} openUpdateModal={() => setShowUpdateTaskModal(true)}/>
              ))}
            </Row>
            {archivedTasks.length > 0 &&
            <Row>
              <Row><Col><Badge>Archive</Badge></Col></Row>
              <Row>
                  {archivedTasks.sort((t1, t2)=> t2.created - t1.created)
                  .map(task => {
                      return (
                        <ArchiveSection
                          key={task.id}
                          id={task.id}
                          title={task.title}
                          description={task.description}
                          created={task.created}
                        />  
                      )  
                  })}
              </Row>
              </Row>
            }
          </Col>
        </Row>
      </Container>
      <AddTaskModal show={showAddTaskModal} handleClose={() => setShowAddTaskModal(false)} />
      <UpdateTaskModal show={showUpdateTaskModal} handleClose={() => setShowUpdateTaskModal(false)}/>
    </>
  );
}

export default App;
