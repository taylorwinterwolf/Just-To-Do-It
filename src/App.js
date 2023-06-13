import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import checkBox from './assets/list-check.png'
import addPlus from './assets/add.png'
import minusBtn from './assets/minus.png'
import generateBtn from './assets/list.png'
import githubBtn from './assets/github.png'
import TaskSections from './components/TaskSections'
import ArchiveSection from './components/ArchiveSection'
import AddTaskModal from './components/AddTaskModal'
import UpdateTaskModal from './components/UpdateTaskModal'

import { useTasks } from './contexts/TasksContext'
import { useState } from 'react'

import { Container, Row, Col, Badge, Navbar, Nav, NavItem } from 'react-bootstrap';

function App() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false)
  const { archivedTasks, generateDummyData, clearTasks, setArchivedTask } = useTasks()
  const taskSections = ["To Do", "In Progress", "Completed"]

  function clearArchive(){
    setArchivedTask([])
  }

  return (
    <>
      <Container className="vh-100">
        <Row direction='horizontal' id="navSideBar">
          <Col direction='vertical' style={{ backgroundColor: '#E3E3E3' }} sm={12} md={2}>
            <Navbar expand="md" className='container-fluid justify-content-center' collapseOnSelect>
              <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
                <Nav className="flex-column">
                  <NavItem>
                    <div style={{ maxWidth: '33px', paddingTop: '15px' }} className='m-auto'><img src={checkBox} alt="List Check" className="w-100" /></div>
                  </NavItem>
                  <Nav.Link onClick={() => setShowAddTaskModal(true)} style={{cursor: 'pointer'}} className='navItem' eventKey="/AddTask">
                    <div style={{ maxWidth: '33px', paddingTop: '15px' }} className='m-auto'><img src={addPlus} alt="Add Task" className="w-100" /></div>
                    <p className='text-center'>Add New Task</p>
                  </Nav.Link>
                  <Nav.Link onClick={generateDummyData} style={{cursor: 'pointer'}} className='navItem' eventKey="/AutoGenerate">
                    <div style={{ maxWidth: '33px', paddingTop: '15px' }} className='m-auto'><img src={generateBtn} alt="Auto generate tasks" className="w-100" /></div>
                    <p className='text-center'>Auto Generate Tasks</p>
                  </Nav.Link>
                  <Nav.Link onClick={clearTasks} style={{cursor: 'pointer'}} className='navItem' eventKey="/ClearTasks">
                    <div style={{ maxWidth: '33px', paddingTop: '15px' }} className='m-auto'><img src={minusBtn} alt="Clear Tasks" className="w-100" /></div>
                    <p className='text-center'>Clear All Tasks</p>
                  </Nav.Link>
                  <Nav.Link style={{cursor: 'pointer'}} className='navItem' eventKey="/GitHub" href="https://github.com/taylorwinterwolf/justtodoit" target="_blank">
                    <div style={{ maxWidth: '33px', paddingTop: '15px' }} className='m-auto'><img src={githubBtn} alt="GitHub Repo" className="w-100" /></div>
                    <p className='text-center'>GitHub Repo</p>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
          <Col direction='horizontal' sm={12} md={10}>
            <Row>
              <div className='d-flex justify-content-center'>
                <p className='headerFont p-0 mb-0 me-2'>JUST TO DO IT</p>
                <div style={{ maxWidth: '33px'}} className='mt-auto mb-auto'><img src={checkBox} alt="List Check" className="w-100" /></div>
              </div>
            </Row>
            <Row>
              {taskSections.map(mapSection => (
                <TaskSections key={mapSection} section={mapSection} openUpdateModal={() => setShowUpdateTaskModal(true)}/>
              ))}
            </Row>
            {archivedTasks.length > 0 &&
            <Row>
                <Row>
                  <Col lg={1}><Badge>Archive</Badge></Col>
                  <Col lg={2}><Badge bg="secondary" onClick={clearArchive} style={{cursor: 'pointer'}}>Clear Archive</Badge></Col>
                </Row>
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
