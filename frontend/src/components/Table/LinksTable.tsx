import "./LinksTable.css"
import { getApiBaseUrl } from "../../api/client"
import type { LinkRow } from "../../api/links"
import { CopyTableIcon } from "../../assets"
import { buildShortUrl } from "../UrlShortener/url.utils"

interface LinksTableProps {
  links: LinkRow[]
}

const LinksTable = ({ links }: LinksTableProps) => {
  const copyLink = (slug: string) => {
    const link = links.find((link) => link.slug === slug);
    if (link) {
      const redirectLink = buildShortUrl(slug)
      navigator.clipboard.writeText(redirectLink);
    }
  }
  return (
  <div className="links-table-wrap">
    <table className="links-table">
      <thead>
        <tr>
          <th>Short link</th>
          <th>Original</th>
          <th>Clicks</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {links.map((link) => (
          <tr key={link.id}>
            <td>
              <a
                href={`${getApiBaseUrl()}/${link.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                {import.meta.env.VITE_BACKEND_URL}/{link.slug}
              </a>
            </td>
            <td>
              <a
                href={link.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate block max-w-50"
                title={link.targetUrl}
              >
                {link.targetUrl}
              </a>
            </td>
            <td>
              <span className="badge">{link.clickCount ?? 0}</span>
            </td>
            <td>
          <button className="copy-btn" onClick={() => copyLink(link.slug)} title="Copy">
            <CopyTableIcon />
          </button>
        </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

export { LinksTable }
