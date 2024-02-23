import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import { useDebugValue, useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row } from 'react-bootstrap';

function App() {

  let [data, setdata] = useState([]);
  let [loading, setLoading] = useState(true);
  let[srch , setsrch] = useState('');
  let[all , setall] = useState([]);


  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(function (response) {
        // handle success
        console.log(response.data.results);
        setdata(response.data.results);
        setLoading(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }, [])

  const searchhendal = () => {
    setall(data);
    const search = data.filter((ele , ind) => {
      return ele.name==srch
    })
    setdata(search);
    setsrch('');
  }
  const allhendal = () => {
    setdata(all);
  }

  return (
    <div className='App'>
      <div className='head'>
        <div className='contenar'>
          <div className='nev'>
            <div className='leftnev'>Logo</div>
            <div className='rightnev d-flex'>
              <li><a>Docs</a></li>
              <li><a>About</a></li>
              <button>SUPPORT US</button>
            </div>
          </div>
          <div className='headname'>
            <h1>The Rick and Morty API</h1>
          </div>
        </div>
      </div>
      <div className='contect'>
        
        <div className='contenar'>
        <div className='searchbox w-100'>
          <input type='text' placeholder='Search name' className='searchinp px-2 py-2' value={srch} onChange={(e) =>setsrch(e.target.value)}></input>
          <input type='button' value='Search' className='searchbtn px-4 py-1 ms-2' onClick={searchhendal}></input>
          <input type='button' value='All' className='allbtn px-4 py-1 ms-2' onClick={allhendal}></input>
        </div>
          <Row>
            {
                loading ? <Spinner animation="border" style={{ margin: "auto", marginTop: "20%" }} variant="primary" /> :
              data.map((ele, ind) => {
                return (
                  <Col sm={12} lg={6} key={ind} className='p-0'>
                    <div className='cont'>
                      <div className='imgbox'>
                        <img src={ele.image}></img>
                      </div>
                      <div className='text'>
                        <div className='secion'>
                          <a><h2 className='m-0'>{ele.name}</h2></a>
                          <div className='d-flex a-center m-0'>
                            <p style={{ backgroundColor: ele.status == 'Alive' ? 'green' : ele.status == 'Dead' ? 'red' : 'gray', borderRadius: '50%', height: "10px", width: "10px" }} className='my-auto me-2'></p><p className='m-0'>{ele.status} - {ele.species}</p>
                          </div>
                        </div>
                        <div className='secion1 secion'>
                          <p className='m-0 color-grey'>Last known location:</p>
                          <p className='m-0'><a>{ele.location.name}</a></p>
                        </div>
                        <div className='secion'>
                          <p className='m-0 color-grey'>First seen in:</p>
                          <p className='m-0'><a>{ele.origin.name}</a></p>
                        </div>
                      </div>
                    </div>
                  </Col >
                )
              })
            }
          </Row>
        </div>
      </div>
      <div className='footer'>
        <div className='f-head'>
          <ul className='d-flex '>
            <li><a>CHARACTERS: 826</a></li>
            <li><a>LOCATIONS: 126</a></li>
            <li><a>EPISODES: 51</a></li>
          </ul>
          <a><span className='icon'></span><span className='ms-5'>SERVER STATUS</span></a>
          <div>
            <li><a></a></li>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App;