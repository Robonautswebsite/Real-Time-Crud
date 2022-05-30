import React, { useEffect, useState } from 'react'
import './App.css';
import CardComp from './components/CardComp';
import FormComp from './components/FormComp';
import io from 'socket.io-client'
import ImageGallery from './components/ImageGallery';
const socket = io.connect("https://realtime-crud.herokuapp.com/")

function App() {

  const [records, setRecords] = useState([]);

  useEffect(() => {
    socket.on('loadRecord', (data) => {
      setRecords(data)
    })
    console.log(records)
    // eslint-disable-next-line
  }, [socket, records])


  return (
    <>
      <div className="App">
        <FormComp />
        <div className='card-container'>
          {
            records.map((record) => {
              return (
                <CardComp key={record._id} recordId={record._id} name={record.empName} id={record.empId} pos={record.empPos} />
              )
            })
          }
        </div>
      </div>
      <ImageGallery />
    </>
  );
}

export default App;
