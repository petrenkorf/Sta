import { Button, Dropdown, Input, Select } from "semantic-ui-react"
import { Endpoint } from "./EndpointsSidebar"
import { useEffect, useRef } from "react"

const options = [
  { key: 'GET', text: 'GET', value: 'GET' },
  { key: 'POSt', text: 'POST', value: 'POST' },
  { key: 'PATCH', text: 'PATCH', value: 'PATCH' },
]

const EndpointPage = ({
  endpoint,
  onAddressChange,
  onHttpMethodChange,
  onClickSendButton,
  addressInputRef
}: {
  endpoint?: Endpoint,
  onAddressChange: React.FC,
  onHttpMethodChange: React.FC,
  onClickSendButton: React.FC,
  addressInputRef: HTMLInputElement
}) => {

  if (!endpoint) {
    return (
      <div>
        Select an endpoint
      </div>
    )
  }

  return (

    < div style={{ marginTop: '12px' }
    }>
      {endpoint.title}
      < Input
        action
        value={endpoint.address}
        onChange={onAddressChange}
        actionPosition='left'
        placeholder='http://yourendpoint.here'
        ref={addressInputRef}
        fluid>
        < Dropdown
          button
          basic
          floating
          options={options}
          value={endpoint.method}
          onChange={onHttpMethodChange}></Dropdown >
        <input />
        <Button primary onClick={onClickSendButton}>Send</Button>
      </Input>
    </div >
  )
}

export default EndpointPage
