import { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useTasks } from '../contexts/TasksContext'

export default function AddTaskModal({ show, handleClose }) {
    const { addTask, priorities } = useTasks()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const dueRef = useRef()
    const priorityRef = useRef()

    

    function handleSubmit(e) {
        e.preventDefault()
        addTask({
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            due: dueRef.current.value,
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
                        <Form.Control ref={descriptionRef} type='text' required maxLength={100} />
                        <Form.Text>100 character limit</Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='due'>
                        <Form.Label>TO DO DUE DATE</Form.Label>
                        <Form.Control ref={dueRef} type='text' required/>
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