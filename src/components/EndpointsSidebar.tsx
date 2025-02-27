import { FC, MouseEventHandler, useState } from "react"
import { Sidebar, Button } from "semantic-ui-react"
import EndpointLink from "./EndpointLink"
type Endpoint = {
  title: string,
  fixed: Boolean,
  method: string,
  address: string,
  id: string
}

type EndpointsSidebarProps = {
  endpoints: Endpoint[],
  onAddEndpoint: (event: React.MouseEvent<HTMLButtonElement>) => void
  onClickEndpoint: (endpoint: Endpoint, idx: string) => void
}

const EndpointsSidebar: FC<EndpointsSidebarProps> = ({ endpoints, onAddEndpoint, onClickEndpoint }) => {
  return (
    <Sidebar visible style={{ paddingTop: '12px' }}>
      {
        endpoints.map((endpoint, idx) => (
          < EndpointLink
            endpoint={endpoint}
            key={idx}
            idx={idx}
            onClick={() => (onClickEndpoint(endpoint, idx))}
          />
        ))
      }
      < Button onClick={onAddEndpoint} > Add Endpoint</Button >
    </Sidebar >
  )
}

export default EndpointsSidebar
export type { Endpoint }
