import { Button, Dropdown, Form, Input, Loader, TextArea } from "semantic-ui-react"
import { Endpoint } from "./EndpointsSidebar"
import { Ref, useState } from "react"

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
  addressInputRef: Ref<Input>
}) => {

  const [isLoading, setIsLoading] = useState(false)

  const handleSendClick = (e) => {
    setIsLoading(true)
    onClickSendButton(e, () => {
      setIsLoading(false)
    })
  }

  if (!endpoint) {
    return (
      <div className="endpoint-page-container">
        Select an endpoint in the sidebar or create a new one
      </div>
    )
  }

  return (

    < div style={{ marginTop: '12px' }} className="endpoint-page-container">
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
        <Button primary onClick={handleSendClick}>Send</Button>
      </Input>
      {isLoading && <Loader active inline />}
      <Form>
        <TextArea readOnly={true} value={endpoint.lastResponse} style={{ minHeight: 300 }} />
      </Form>
    </div >
  )
}

export default EndpointPage
