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

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onClickDeleteButton(endpoint.id)
  }

  const HttpMethod = ({
    method
  }: {
    method: string
  }) => {
    return (
      <label className={method}>{method}</label>
    )
  }

  return (
    <>
      <div
        className="endpoint-item"
        key={idx}
        onClick={onClick}
        onMouseEnter={showDeleteButton}
        onMouseLeave={hideDeleteButton} >
        <HttpMethod method={endpoint.method} /> - {endpoint.title} {displayDeleteButton &&
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
