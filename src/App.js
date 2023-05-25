import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import checkBox from './assets/list-check.png'
import ToDoSection from './components/ToDoSection'

import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <>
      <Container className="vh-100">
        <Row direction='horizontal' className="vh-100">
          <Col direction='vertical' style={{ backgroundColor: '#E3E3E3' }} sm={3} md={2}>
            <div style={{ maxWidth: '33px', paddingTop: '15px' }} className='m-auto'><img src={checkBox} alt="List Check" className="w-100" /></div>
          </Col>
          <ToDoSection/>
        </Row>
      </Container>
    </>
  );
}

export default App;
