import { logout, type User } from "../../api/auth"
import { UserLinks } from "./UserLinks"
import { useAuthLoading } from "../../contexts/AuthLoadingContext"
import "./LoggedInView.css"

interface LoggedInViewProps {
  user: User
  onLogout: () => void
}

const LoggedInView = ({ user, onLogout }: LoggedInViewProps) => {
  const { isAuthLoading } = useAuthLoading()
  const handleSignOut = () => {
    logout().then(onLogout)
  }

  const initial = (user.username ?? user.githubId).slice(0, 1).toUpperCase()

  return (
    <div id="loggedIn" className="flex flex-col items-center w-full">
      <div className="logged-in-header">
        <div className="logged-in-user">
          <div className="logged-in-avatar">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="" />
            ) : (
              initial
            )}
          </div>
          <span className="logged-in-username" id="uname">
            {user.username ?? user.githubId}
          </span>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="logged-in-signout"
          aria-label="Sign out"
          disabled={isAuthLoading}
        >
          Sign out
        </button>
      </div>

      <div className="links-section">
        <UserLinks />
      </div>
    </div>
  )
}

export { LoggedInView }
