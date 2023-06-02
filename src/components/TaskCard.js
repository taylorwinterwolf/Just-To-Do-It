import { Form, Card, Row, Col, ProgressBar, Button } from 'react-bootstrap'
import flagRed from '../assets/flag-red.png'
import flagYellow from '../assets/flag-yellow.png'
import flagBlue from '../assets/flag-blue.png'
import flagGreen from '../assets/flag-green.png'
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
  dates: {
      fontSize: ".7rem"    
  }
}

export default function TaskCard({ id, title, description, due, created, progress, priority, status, dueDateString
, openModal }) {

    const { priorities, statuses, updateTask, setEditTask, archiveTask } = useTasks()
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

    const statusImg = (() => {
        switch (status) {
        case 'Created':
            return flagBlue
        case 'Started':
            return flagYellow
        case 'Completed':
            return flagGreen
        default:
            return flagBlue
    }
    })()

    const progressVariant = (() => {
        switch (progress) {
        case 30:
            return "info"
        case 60:
            return "warning"
        case 100:
            return "success"
        default:
            return "info"
    }
    })()

    function handleChange() {
        const taskObj = { id, title, description, due, created, priority: priorityRef.current.value, status: statusRef.current.value }
        updateTask(taskObj)        
    }

    function editClicked() {
        const taskObj = { id, title, description, due, dueDateString, created, priority: priorityRef.current.value, status: statusRef.current.value }
        setEditTask(taskObj)
        openModal()
    }

    function archivedClicked() {
        const taskObj = { id, title, description, due, dueDateString, created, priority, status, progress }
        archiveTask(taskObj)    
    }

    function convertDate(epoch){
        const date = new Date(epoch)
        const hour = date.getHours()
        const twelveHour = hour > 12 ? hour - 12 : hour
        //Add leading 0 using padStart() if the minutes returns 0
        const minutes = date.getMinutes() !== 0 ? date.getMinutes() : `${date.getMinutes()}`.padStart(2, '0')
        const convertedDate = `${twelveHour}:${minutes} ${date.toLocaleDateString('en-US')}`
        return convertedDate
    }
        
    return (
        <Card style={custStyle.mainTxt} className='mb-3'>
            <Card.Body>
            <Card.Title>
                <Row>
                    <Col sm={10} className='d-flex justify-content-start'>{title}</Col>
                    <Col sm={2} className='d-flex justify-content-end'>
                    <div style={{ maxWidth: '18px'}} onClick={editClicked}><img src={edit} alt='Red Flag' /></div>
                    </Col>
                </Row>
            </Card.Title>
                <Card.Text className='mb-1'>{description}</Card.Text>
                <Row className='mb-2 mt-2'>
                    <Col sm={6}><Card.Text style={custStyle.dates}>Created: {convertDate(created)}</Card.Text></Col>
                    <Col sm={6}><Card.Text style={custStyle.dates}>Due: {due}</Card.Text></Col>
                </Row>
            <Card.Text className='mb-1'>Progress</Card.Text>
            <ProgressBar striped variant={progressVariant} min={0} max={100} now={progress} />
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
                        <div style={{ maxWidth: '14px', paddingTop: '5px' }}><img src={statusImg} alt='Status Flag' /></div>
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
                {status === 'Completed' &&
                    <Row>
                        <Col className='d-flex justify-content-start'>
                            <Button variant='outline-primary' size="sm" onClick={archivedClicked}>Archive</Button>
                        </Col>
                    </Row>
                    }
            </Card.Body>
        </Card>
    )
}