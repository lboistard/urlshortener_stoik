import "./HomePage.css"
import { Divider } from "../components/commons/Divider"
import { Title } from "../components/commons/Title"
import { UrlShortener } from "../components/UrlShortener"
import { AuthSection } from "../components/Auth/AuthSection"

const HomePage = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center container">
      <Title />
      <UrlShortener />
      <Divider />
      <AuthSection />
    </div>
  )
}


export { HomePage }
