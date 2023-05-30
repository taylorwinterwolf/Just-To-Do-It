import { Col } from 'react-bootstrap'

export default function ArchiveSection({ id, title, description, created }) {
    function dueDate(epoch){
        const date = new Date(epoch)
        const convertedDate = date.toLocaleDateString('en-US')
        return convertedDate
    }
    return (
        <Col sm={12} className=''>
            <p className='archiveItem mb-0'><span className='archiveSection'>Created:</span> {dueDate(created)} <span className='archiveSection'>Title:</span> {title} <span className='archiveSection'>Description:</span> {description}</p>
        </Col>
    )
}
    
