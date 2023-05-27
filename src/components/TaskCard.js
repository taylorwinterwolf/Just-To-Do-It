import { Form, Card, Row, Col, ProgressBar } from 'react-bootstrap'
import flagRed from '../assets/flag-red.png'
import flagYellow from '../assets/flag-yellow.png'
import flagBlue from '../assets/flag-blue.png'
import flagGray from '../assets/flag-gray.png'
import edit from '../assets/edit.png'
import { useTasks } from '../contexts/TasksContext'
import { useRef } from 'react'

const custStyle = {
  mainTxt: {
    color: '#707070'
  },
  divider: {
    borderTop: '1px solid',
    borderColor: '#C9C9C9',
    width: '100%',
    margin: '5px 0px'
  },
}

export default function TaskCard({ id, title, description, due, created, progress, priority, status, openModal }) {

    const { priorities, statuses, updateTask, setEditTask } = useTasks()
    const statusRef = useRef("")
    const priorityRef = useRef("")
    
    const priorityImg = (() => {
        switch (priority) {
            case 'None':
                return flagGray
            case 'Low':
                return flagBlue
            case 'Medium':
                return flagYellow
            case 'High':
                return flagRed
            default:
                return flagGray
        }
    })()

    function handleChange(e) {
        e.preventDefault()
        const taskObj = { id, title, description, due, created, priority: priorityRef.current.value, status: statusRef.current.value }
        //console.log(JSON.stringify(valObj))
        updateTask(taskObj)        
    }

    function editClicked() {
        const taskObj = { id, title, description, due, created, priority: priorityRef.current.value, status: statusRef.current.value }
        setEditTask(taskObj)
        openModal()
        //setShowUpdateTaskModal(true)
    }
        
    return (
        <Card style={custStyle.mainTxt} className='mb-3'>
            <Card.Body>
            <Card.Title>
                <Row>
                    <Col sm={6} className='d-flex justify-content-start'>{title}</Col>
                    <Col sm={6} className='d-flex justify-content-end'>
                    <div style={{ maxWidth: '18px'}} onClick={editClicked}><img src={edit} alt='Red Flag' /></div>
                    </Col>
                </Row>
            </Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>Due Date: {due}</Card.Text>
            <Card.Text>Progress</Card.Text>
            <ProgressBar variant='info' min={0} max={100} now={progress} />
            <div style={custStyle.divider}></div>
            <Row>
                <Col sm={6}>
                <Row>
                    <Col className='d-flex justify-content-start'>Priority</Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-start'>
                    <div style={{ maxWidth: '14px', paddingTop: '5px' }}><img src={priorityImg} alt='Red Flag' /></div>
                    <Form onChange={handleChange}>
                        <Form.Group controlId='priority'>
                            <Form.Select className='bg-transparent border-0' name="priority" ref={priorityRef}>
                                <option key={priority} value={priority}>
                                    {priority}
                                </option>
                                {priorities.map(mapPriority => {
                                    if (mapPriority !== priority) {
                                        return(
                                            <option key={mapPriority} value={mapPriority}>
                                                {mapPriority}
                                            </option>
                                        )
                                    }
                                    return null
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    </Col>
                </Row>
                </Col>
                <Col sm={6}>
                <Row>
                    <Col className='d-flex justify-content-start'>Status</Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-start'>
                    <div style={{ maxWidth: '14px', paddingTop: '5px' }}><img src={flagRed} alt='Red Flag' /></div>
                    <Form onChange={handleChange}>
                        <Form.Group controlId='priority'>
                            <Form.Select className='bg-transparent border-0' name="status" ref={statusRef}>
                                <option key={status} value={status}>
                                    {status}
                                </option>
                                {statuses.map(mapStatus => {
                                    if (mapStatus !== status) {
                                        return(
                                            <option key={mapStatus} value={mapStatus}>
                                                {mapStatus}
                                            </option>
                                        )
                                    }
                                    return null
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                    </Col>
                </Row>
                </Col>
            </Row>
            </Card.Body>
        </Card>
    )
}