import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import ProfileInfo from "../components/ProfileInfo"
import Repos from "../components/Repos"
import Search from "../components/Search"
import SortRepos from "../components/SortRepos"
import Spinner from "../components/Spinner"

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortType, setSortType] = useState("recent")

  const getUserProfileAndRepos = useCallback(async (username = "diegovilhalva") => {
    setLoading(true)
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`)
      const userProfile = await userRes.json()
      setUserProfile(userProfile)
      const reposRes = await fetch(userProfile.repos_url)
      const repos = await reposRes.json()
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))  
  
      setRepos(repos)
      return { userProfile, repos }

    } catch (error) {
      toast.error(error.message,{position:"top-center"})
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getUserProfileAndRepos()
  }, [getUserProfileAndRepos])
  const onSearch = async (e, username) => {
    e.preventDefault()
    setLoading(true)
    setRepos([])
    setUserProfile(null)
    const { userProfile, repos } = await getUserProfileAndRepos(username)
    setUserProfile(userProfile)
    setRepos(repos)
    setLoading(false)
  }

  const onSort = (sortType) => {
    if (sortType === 'recent') {
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
    }else if(sortType === 'stars'){
      repos.sort((a,b) => b.stargazers_count - a.stargazers_count);
    }else if (sortType === 'forks') {
      repos.sort((a,b) =>b.forks_count - a.forks_count)
    }
    setSortType(sortType)
    setRepos([...repos])
  }
  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      { repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        { !loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  )
}

export default HomePage