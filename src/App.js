import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Card, Button } from 'reactstrap'

function App() {
  const [data, setData] = useState([])

  useEffect(()=>{
    axios(`https://api.punkapi.com/v2/beers`).then(res => {
      console.log(res)
      setData(res.data)
    }).catch(err => console.error(err))
  }, [])

  const sortAccordingToFirstBrewed = () => {
    const dataCopy = [...data]
    dataCopy.sort((a, b) => 
    a.first_brewed.split('/')[1] == b.first_brewed.split('/')[1]?a.first_brewed.split('/')[0]-b.first_brewed.split('/')[0]:a.first_brewed.split('/')[1]-b.first_brewed.split('/')[1])
    setData([...dataCopy])
  }

  return (
    <div style={{background: '#f4f4f4'}}>
      <Container>
        <div style={{margin: '5% 0', align: 'left'}}><Button onClick={sortAccordingToFirstBrewed}>Sort by first brewed</Button></div>
        <Row>
            {data.map((item, index) => <Col lg={3} md={6} key={index} className='mb-2 p-2'>
              <Card className='p-2'>
                <img src={item.image_url} alt={item.name} style={{height: '50vh'}} />
                <h5 style={{textAlign: 'center', paddingTop: '2%', lineHeight: '1.5'}}><b>{item.name}</b></h5><br />
                <p><b>Tagline: {item.tagline}</b></p>
                <p><b>First Brewed: </b>{item.first_brewed}</p>
                <p><b>Description: </b>{item.description}</p>
              </Card>
            </Col>)}
        </Row>
      </Container>
    </div>
  );
}

export default App;
