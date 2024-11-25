import './App.css'
import LookerDashboard from './LookerDashboard'

function App() {

  return (
    <>
      <LookerDashboard
        dashboardId="15"
        embedUrl="https://beyondmediaagency.cloud.looker.com/embed/dashboards/15"
        accessToken="token"
      />
    </>
  )
}

export default App
