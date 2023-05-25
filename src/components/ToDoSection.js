import { Form, Badge, Row, Col } from 'react-bootstrap'
import TaskCard from './TaskCard'
import checkBox from '../assets/list-check.png'
import grayToDo from '../assets/box-check.png'

const custStyle = {
  mainTxt: {
    color: '#707070'
  },
  toDoImgWrap: {
    maxWidth: '20px',
    paddingTop: '8px'
  },
  toDoLable: {
    padding: '10px 5px 0px 5px',
    fontSize: '1rem',
    color: '#707070'
  },
}

export default function ToDoSection(){
    return (
        <Col direction='horizontal' sm={9} md={10}>
            <Row>
              <div className='d-flex justify-content-center'>
                <p className='headerFont p-0 me-2'>JUST TO DO IT</p>
                <div style={{ maxWidth: '33px', paddingTop: '15px' }}><img src={checkBox} alt="List Check" className="w-100" /></div>
              </div>
            </Row>
            <Row>
              <Col>
                <Badge className='w-100 backgroundGray mainTxt d-flex justify-content-start mb-3'>
                  <Col className='d-flex justify-content-start' sm={6}>
                  <div style={custStyle.toDoImgWrap}><img src={grayToDo} alt="To Do Gray" className="w-100" /> </div>                  
                  <p style={custStyle.toDoLable} className='mb-0'>To Do</p> 
                  </Col>
                  <Col className='d-flex justify-content-end' sm={6}>
                    <Form onChange="Do something" className='justify-content-end'>
                      <Form.Group controlId='filterID'>
                        <Form.Select className='backgroundGray border-0'>
                          <option>Sort By</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </Form.Group>
                    </Form>
                  </Col>
                </Badge>
                <Row>
                  <Col>
                    <TaskCard/>  
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
    )
}