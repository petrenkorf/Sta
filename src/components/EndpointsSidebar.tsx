import { FC } from "react"
import { Sidebar, Button, Divider } from "semantic-ui-react"

type Endpoint = {
  title: string
}

type EndpointsSidebarProps = {
  endpoints: Endpoint[],
  onAddEndpoint: (event: React.MouseEvent<HTMLButtonElement>) => void
  onClickEndpoint: (event: React.MouseEvent<HTMLDivElement>) => void
}

const EndpointsSidebar: FC<EndpointsSidebarProps> = ({ endpoints, onAddEndpoint, onClickEndpoint }) => {
  return (
    <Sidebar visible style={{
      paddingTop: '12px'
    }}>
      {
        endpoints.map((endpoint, idx) => (
          <div className="endpoint-item" key="idx" onClick={onClickEndpoint}>
            {endpoint.title}
            <Divider></Divider>
          </div>
        ))
      }
      < Button onClick={onAddEndpoint} > Add Endpoint</Button >
    </Sidebar >
  )
}

export default EndpointsSidebar
