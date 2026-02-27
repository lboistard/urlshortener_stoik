import { useEffect, useState } from "react"
import { GithubAuth } from "./GithubAuth"
import { LoggedInView } from "./LoggedInView"
import { useAuthLoading } from "../../contexts/AuthLoadingContext"
import { getMe, type User } from "../../api/auth"

const AuthSection = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const { setAuthLoading } = useAuthLoading()

  useEffect(() => {
    getMe().then(setUser)
  }, [])

  useEffect(() => {
    if (user != null) {
      setAuthLoading(false)
    }
  }, [user, setAuthLoading])

  if (user === undefined) {
    return <p className="text-secondary">Checking sign-in…</p>
  }

  if (user === null) {
    return <GithubAuth />
  }

  return <LoggedInView user={user} onLogout={() => setUser(null)} />
}

export { AuthSection }
