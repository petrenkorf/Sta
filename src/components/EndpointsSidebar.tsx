import { FC } from "react"
import { Sidebar, Button, Divider } from "semantic-ui-react"

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
          <div className="endpoint-item" key={idx} onClick={() => (onClickEndpoint(endpoint, idx))}>
            {endpoint.method} - {endpoint.title}
            <Divider></Divider>
          </div>
        ))
      }
      < Button onClick={onAddEndpoint} > Add Endpoint</Button >
    </Sidebar >
  )
}

export default EndpointsSidebar
export type { Endpoint }
