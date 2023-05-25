import { Form, Card, Row, Col, ProgressBar } from 'react-bootstrap'
import flagRed from '../assets/flag-alt-1.png'
import edit from '../assets/edit.png'

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

export default function TaskCard() {
    return (
        <Card style={custStyle.mainTxt}>
            <Card.Body>
            <Card.Title>
                <Row>
                <Col sm={6} className='d-flex justify-content-start'>Project Title</Col>
                <Col sm={6} className='d-flex justify-content-end'>
                    <div style={{ maxWidth: '18px'}}><img src={edit} alt='Red Flag' /></div>
                    </Col>
                </Row>
            </Card.Title>
            <Card.Text>Project description… Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Card.Text>
            <Card.Text>Due Date: 12/23/2023</Card.Text>
            <Card.Text>Progress</Card.Text>
            <ProgressBar variant='info' min={0} max={100} now={30} />
            <div style={custStyle.divider}></div>
            <Row>
                <Col sm={6}>
                <Row>
                    <Col className='d-flex justify-content-start'>Priority</Col>
                </Row>
                <Row>
                    <Col className='d-flex justify-content-start'>
                    <div style={{ maxWidth: '14px', paddingTop: '5px' }}><img src={flagRed} alt='Red Flag' /></div>
                    <Form onChange="Do something">
                        <Form.Group controlId='priority'>
                        <Form.Select className='bg-transparent border-0'>
                            <option></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
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
                    <Form onChange="Do something">
                        <Form.Group controlId='priority'>
                        <Form.Select className='bg-transparent border-0'>
                            <option></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
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