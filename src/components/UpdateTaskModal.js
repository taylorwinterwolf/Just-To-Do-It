import { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useTasks } from '../contexts/TasksContext'

export default function UpdateTaskModal({ show, handleClose }) {
    const { statuses, priorities, editTask, updateTask, setEditTask } = useTasks()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const dueRef = useRef()
    const priorityRef = useRef()
    const statusRef = useRef()

    function handleUpdate(e) {
        e.preventDefault()
        updateTask({
            id: editTask.id,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            due: dueRef.current.value,
            priority: priorityRef.current.value,
            status: statusRef.current.value,
            created: editTask.created
        })        
        handleClose()
        setEditTask([])
    }

    function handleDelete(e) {
        e.preventDefault()
        updateTask({
            id: editTask.id,
            destroy:true
        })        
        handleClose()
        setEditTask([])
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className='mb-3' controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control ref={titleRef} type='text' required defaultValue={editTask.title}/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descriptionRef} type='text' required maxLength={100} defaultValue={editTask.description}/>
                        <Form.Text>100 character limit</Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='due'>
                        <Form.Label>TO DO DUE DATE</Form.Label>
                        <Form.Control ref={dueRef} type='text' required defaultValue={editTask.due}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="piority" name="priority">
                        <Form.Label>Set Priority</Form.Label>
                        <Form.Select ref={priorityRef}>
                            <option value={editTask.priority}>{editTask.priority}</option>
                            {priorities.map(mapPriority => {
                                if (mapPriority !== editTask.priority) {
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
                    <Form.Group className="mb-3" controlId="status" name="status">
                        <Form.Label>Set Status</Form.Label>
                        <Form.Select ref={statusRef}>
                            <option value={editTask.status}>{editTask.status}</option>
                            {statuses.map(mapStatus => {
                                if (mapStatus !== editTask.status) {
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
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit" onClick={handleUpdate}>Update</Button>
                        <Button variant='danger' type='submit' onClick={handleDelete}>Delete</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )

}