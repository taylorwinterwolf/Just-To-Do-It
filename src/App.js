import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import checkBox from './assets/list-check.png'
import addPlus from './assets/add.png'
import TaskSection from './components/TaskSection'
import AddTaskModal from './components/AddTaskModal'
import UpdateTaskModal from './components/UpdateTaskModal'
import { useState } from 'react'

import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(true)
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
              <Col sm={12} onClick={() => setShowAddTaskModal(true)} style={{cursor: 'pointer'}}>
                <div style={{ maxWidth: '33px', paddingTop: '15px' }} className='m-auto'><img src={addPlus} alt="Add Task" className="w-100" /></div>
                <p className='text-center'>New Task</p>
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
                <TaskSection key={mapSection} section={mapSection} openUpdateModal={() => setShowUpdateTaskModal(true)}/>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <AddTaskModal show={showAddTaskModal} handleClose={() => setShowAddTaskModal(false)} />
      <UpdateTaskModal show={showUpdateTaskModal} handleClose={() => setShowUpdateTaskModal(false)}/>
    </>
  );
}

export default App;
