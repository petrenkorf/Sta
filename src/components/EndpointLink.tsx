import { MouseEventHandler, useState } from "react"
import { Endpoint } from "./EndpointsSidebar"
import { Button, Divider } from "semantic-ui-react"

const EndpointLink = ({
  endpoint,
  idx,
  onClick }: {
    endpoint: Endpoint,
    idx: number,
    onClick: MouseEventHandler<HTMLDivElement>
  }) => {
  const [displayDeleteButton, setShowDeleteButton] = useState({ display: 'none' })

  const showDeleteButton = () => {
    setShowDeleteButton({ display: 'inline-block' })
  }

  const hideDeleteButton = () => {
    setShowDeleteButton({ display: 'none' })
  }

  return (<div
    className="endpoint-item"
    key={idx}
    onClick={onClick}
    onMouseEnter={showDeleteButton}
    onMouseLeave={hideDeleteButton} >
    {endpoint.method} - {endpoint.title} {displayDeleteButton &&
      <Button
        style={displayDeleteButton}
        onMouseEnter={showDeleteButton}
        onMouseLeave={showDeleteButton}
        size='mini'
        icon='delete' />}
    <Divider></Divider>
  </div >)
}

export default EndpointLink
