import { useQuery } from "@tanstack/react-query"
import { getLinks, LINKS_QUERY_KEY } from "../../api/links"
import { LinksTable } from "../Table/LinksTable"
import "./LoggedInView.css"

const UserLinks = () => {
  const { data: links = null, isLoading, isError } = useQuery({
    queryKey: LINKS_QUERY_KEY,
    queryFn: getLinks,
  })
  const displayLinks = isError ? [] : links ?? []

  if (isLoading) {
    return <p className="links-loading">Loading links…</p>
  }

  if (displayLinks.length === 0) {
    return (
      <p className="links-empty">
        No links yet — shorten your first URL above.
      </p>
    )
  }

  return <LinksTable links={displayLinks} />
}

export { UserLinks }
