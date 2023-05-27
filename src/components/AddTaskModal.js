import { useRef } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { useTasks } from '../contexts/TasksContext'

export default function AddTaskModal({ show, handleClose }) {
    const { addTask, priorities } = useTasks()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const dueDateRef = useRef()//Looks like this 2023-05-30
    const priorityRef = useRef()

    const currentDate = new Date().toLocaleDateString('en-CA')

    function handleSubmit(e) {
        e.preventDefault()
        const dueDateString = dueDateRef.current.value
        const splitDate = dueDateString.split("-")
        const prettyDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`
        
        addTask({
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            due: prettyDate,
            dueDateString,
            priority: priorityRef.current.value,
        })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control ref={titleRef} type='text' required/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descriptionRef} as="textarea" required maxLength={100} />
                        <Form.Text>100 character limit</Form.Text>
                    </Form.Group>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Group>
                        <Form.Control type='date' min={currentDate} name='due' ref={dueDateRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="piority">
                        <Form.Label>Set Priority</Form.Label>
                        <Form.Select ref={priorityRef}>   
                            {priorities.map(priority => (
                                <option key={priority} value={priority}>
                                    {priority}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )

}