import ProfileInfo from "../components/ProfileInfo"
import Repos from "../components/Repos"
import Search from "../components/Search"
import SortRepos from "../components/SortRepos"


const HomePage = () => {
  return (
    <div className="m-4">
      <Search/>
      <SortRepos/>
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-center">
        <ProfileInfo/>
        <Repos/>
      </div>
    </div>
  )
}

export default HomePage