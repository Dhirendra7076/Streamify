import Sidebar from "./Sidebar"

const Layout = ({showSidebar = false}) => {
  return (
    <div className="flex">
      {showSidebar && <Sidebar/>}
    </div>
  )
}

export default Layout
