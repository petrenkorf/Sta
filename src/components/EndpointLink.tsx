import { MouseEventHandler, useState } from "react"
import { Endpoint } from "./EndpointsSidebar"
import { Button } from "semantic-ui-react"

const EndpointLink = ({
  endpoint,
  idx,
  onClick,
  onClickDeleteButton
}: {
  endpoint: Endpoint,
  idx: number,
  onClick: MouseEventHandler<HTMLDivElement>
  onClickDeleteButton: MouseEventHandler<HTMLButtonElement>
}) => {
  const [displayDeleteButton, setShowDeleteButton] = useState({ display: 'none' })

  const showDeleteButton = () => {
    setShowDeleteButton({ display: 'inline-block' })
  }

  const hideDeleteButton = () => {
    setShowDeleteButton({ display: 'none' })
  }

  const handleDeleteClick = () => {
    onClickDeleteButton(endpoint.id)
  }


  return (
    <>
      <div
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
            onClick={handleDeleteClick}
            size='mini'
            icon='delete' />}
      </div >
    </>)
}

export default EndpointLink
