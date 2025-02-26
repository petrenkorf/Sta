import { useEffect, useRef, useState } from 'react'
import './App.css'
import EndpointsSidebar, { Endpoint } from './components/EndpointsSidebar'
import EndpointPage from './components/EndpointPage'
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'semantic-ui-react';

function App() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([])
  const [currentEndpoint, setCurrentEndpoint] = useState<Endpoint | null>(null)

  const addressInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    addressInputRef.current?.focus()
  }, [currentEndpoint])

  const addEndpoint = () => {
    setEndpoints((prevEndpoints) => (
      [...prevEndpoints, {
        id: uuidv4(),
        title: `New Endpoint ${prevEndpoints.length}`,
        fixed: false,
        method: 'GET',
        address: ''
      }]
    ))
  }

  const openEndpoint = (endpoint: Endpoint) => {
    setCurrentEndpoint(endpoint)
    addressInputRef.current?.focus()
  }


  const updateCurrentEndpoint = (tempEndpoint) => {
    const tempEndpoints = [...endpoints]
    const currentEndpointIndex = endpoints.findIndex((item) => item.id == currentEndpoint.id)
    tempEndpoints[currentEndpointIndex] = tempEndpoint

    setEndpoints(tempEndpoints)
    setCurrentEndpoint(() => (tempEndpoint))
  }

  const handleAddressChange = (e) => {
    const tempEndpoint = currentEndpoint;
    tempEndpoint.address = e.target.value

    updateCurrentEndpoint(tempEndpoint)
  }

  const handleHttpMethodChange = (e, { value }) => {
    const tempEndpoint = currentEndpoint;
    tempEndpoint.method = value

    updateCurrentEndpoint(tempEndpoint)
  }

  const sendRequest = () => {
    fetch(currentEndpoint?.address)
      .then(res => res.json())
      .then(data => console.log)
    // https://http.cat/404
  }

  return (
    <>
      <EndpointsSidebar
        endpoints={endpoints}
        onAddEndpoint={addEndpoint}
        onClickEndpoint={openEndpoint} />
      <div className='top-bar'>
        <Button primary >Share</Button>
      </div>
      <div className='endpoint-page-container'>
        <EndpointPage
          endpoint={currentEndpoint}
          onAddressChange={handleAddressChange}
          onHttpMethodChange={handleHttpMethodChange}
          onClickSendButton={sendRequest}
          addressInputRef={addressInputRef} />
      </div>
    </>
  )
}

export default App

