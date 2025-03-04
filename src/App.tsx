import { useEffect, useRef, useState } from 'react'
import './App.css'
import EndpointsSidebar, { Endpoint } from './components/EndpointsSidebar'
import EndpointPage from './components/EndpointPage'
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'semantic-ui-react';
import { useIndexedDB } from 'react-indexed-db-hook';

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const {
    add: addEndpointEvent,
    getAll,
    deleteRecord
  } = useIndexedDB('events')

  const [endpoints, setEndpoints] = useState<Endpoint[]>([])
  const [currentEndpoint, setCurrentEndpoint] = useState<Endpoint | null>(null)

  const addressInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getAll().then((eventsFromDB) => {
      setEndpoints(eventsFromDB)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    addressInputRef.current?.focus()
  }, [currentEndpoint])

  const addEndpoint = () => {
    const newEndpoint = {
      id: uuidv4(),
      title: `New Endpoint ${endpoints.length + 1}`,
      fixed: false,
      method: 'GET',
      address: ''
    }
    addEndpointEvent(newEndpoint).then((_) => {
      setEndpoints((prevEndpoints) => ([...prevEndpoints, newEndpoint]))
    })
  }

  const deleteEndpoint = (id: string) => {
    deleteRecord(id).then((_) => {
      setEndpoints(endpoints.filter(item => item.id !== id))
    });
  }

  const openEndpoint = (endpoint: Endpoint) => {
    setCurrentEndpoint(endpoint)
    addressInputRef.current?.focus()
  }

  const updateCurrentEndpoint = (tempEndpoint: Endpoint) => {
    const tempEndpoints = [...endpoints]
    const currentEndpointIndex = endpoints.findIndex((item) => item.id == currentEndpoint?.id)
    tempEndpoints[currentEndpointIndex] = tempEndpoint

    setEndpoints(tempEndpoints)
    setCurrentEndpoint(() => (tempEndpoint))
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempEndpoint: Endpoint = currentEndpoint;
    tempEndpoint.address = e?.target?.value

    updateCurrentEndpoint(tempEndpoint)
  }

  const handleHttpMethodChange = (_, { value }) => {
    const tempEndpoint = currentEndpoint;
    tempEndpoint.method = value

    updateCurrentEndpoint(tempEndpoint)
  }

  const sendRequest = (e, callback) => {
    fetch(currentEndpoint?.address)
      .then(res => res.json())
      .then(data => {
        const tempEndpoint: Endpoint = currentEndpoint;
        tempEndpoint.lastResponse = JSON
          .stringify(data)
          .replaceAll("{", "{\r\n")
          .replaceAll("\",", "\",\r\n")
          .replaceAll("\"}", "\"\r\n}")

        updateCurrentEndpoint(tempEndpoint)
      })
      .then(() => { callback() })
      .catch(error => {
        alert(error)
        callback()
      })
    // http://cataas.com/cat?json=true
  }

  const endpointsProps = {
    endpoints,
    onAddEndpoint: addEndpoint,
    onRemoveEndpoint: deleteEndpoint,
    onClickEndpoint: openEndpoint
  }
  const endpointPageProps = {
    endpoint: currentEndpoint,
    onAddressChange: handleAddressChange,
    onHttpMethodChange: handleHttpMethodChange,
    onClickSendButton: sendRequest,
    addressInputRef: addressInputRef
  }

  if (isLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  return (
    <>
      <EndpointsSidebar {...endpointsProps} />
      <div className='top-bar'>
        <Button primary >Share</Button>
      </div>
      <EndpointPage {...endpointPageProps} />
    </>
  )
}

export default App

