import { useState } from 'react'
import './App.css'
import EndpointsSidebar from './components/EndpointsSidebar'
import { Icon, MenuItem, Tab, TabPane } from 'semantic-ui-react'
import EndpointPage from './components/EndpointPage'

function App() {
  const [endpoints, setEndpoints] = useState([])
  const [panes, setPanes] = useState([])

  const addEndpoint = () => {
    setEndpoints([...endpoints, { title: 'New Endpoint' }])
  }

  const openEndpoint = () => {
    setPanes([...panes, {
      menuItem: () => (
        <MenuItem>
          New Endpoint<Icon name="close" />
        </MenuItem>
      ),
      render: () => (<EndpointPage />)
    }])
  }

  return (
    <>
      <EndpointsSidebar
        endpoints={endpoints}
        onAddEndpoint={addEndpoint}
        onClickEndpoint={openEndpoint} />
      <Tab panes={panes} className="content" />
    </>
  )
}

export default App
