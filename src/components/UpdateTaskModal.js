import { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useTasks } from '../contexts/TasksContext'

export default function UpdateTaskModal({ show, handleClose }) {
    const { statuses, priorities, editTask, updateTask, setEditTask} = useTasks()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const dueDateRef = useRef()
    const priorityRef = useRef()
    const statusRef = useRef()
    const currentDate = new Date().toLocaleDateString('en-CA')

    function handleUpdate(e) {
        e.preventDefault()
        const dueDateString = dueDateRef.current.value
        const splitDate = dueDateString.split("-")
        const prettyDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`

        updateTask({
            id: editTask.id,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            due: prettyDate,
            dueDateString,
            priority: priorityRef.current.value,
            status: statusRef.current.value,
            created: editTask.created
        })        
        handleClose()
        setEditTask([])
    }

    function confirmDelete() {
        return new Promise((resolve) => {
            const confirmed = window.confirm("Are you sure you want to delete this task?");
            resolve(confirmed);
        })
    }

    async function handleDelete(e) {
        e.preventDefault()
        const confirmed = await confirmDelete()
        if (confirmed) {
            updateTask({
                id: editTask.id,
                destroy:true
            })        
            handleClose()
            setEditTask([])
        } else {            
            return; // Stop the function execution, if desired
        }          
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
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control type='date' min={currentDate} defaultValue={editTask.dueDateString} name='due' ref={dueDateRef} required/>
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
                        <Button variant='danger' type='submit' onClick={handleDelete} className='ms-2'>Delete</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )

}