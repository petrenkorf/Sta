import { Dropdown, Input, Select } from "semantic-ui-react"

const options = [
  { key: 'get', text: 'GET', value: 'GET' },
  { key: 'post', text: 'POST', value: 'POST' },
  { key: 'patch', text: 'PATCH', value: 'PATCH' },
]

const EndpointPage = () => {
  return (
    <div style={{ marginTop: '12px' }}>
      <Input
        action={
          <Dropdown button basic floating options={options} defaultValue='GET'></Dropdown>
        }
        actionPosition='left'
        placeholder='http://yourendpoint.here'
        fluid />
    </div >
  )
}

export default EndpointPage
