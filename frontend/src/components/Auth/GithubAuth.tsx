import React from "react";
import "./GithubAuth.css"
import { GithubIcon } from "../../assets"
import { getApiBaseUrl } from "../../api/client"
import { useAuthLoading } from "../../contexts/AuthLoadingContext"

const GithubAuth = () => {
  const { isAuthLoading, setAuthLoading } = useAuthLoading()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (isAuthLoading) return
    setAuthLoading(true)
    window.location.href = `${getApiBaseUrl()}/auth/github`
  }

  return (
    <div id="loggedOut">
        <button
          type="button"
          className="btn-github"
          aria-label="Continue with GitHub"
          onClick={handleClick}
          disabled={isAuthLoading}
          aria-busy={isAuthLoading}
        >
          {isAuthLoading ? (
            <span className="loading loading-ring loading-xl" aria-hidden="true" />
          ) : (
            <>
              <GithubIcon />
              Continue with GitHub
            </>
          )}
        </button>
        <p className="helper">Sign in to save and track your links</p>
      </div>
  )
}

export { GithubAuth }
