import { CopyToastIcon } from "../../assets";
import { useAuthLoading } from "../../contexts/AuthLoadingContext";

type ShortUrlResultProps = {
  shortUrl: string;
  onCopy: (url: string) => void;
};

const ShortUrlResult = ({ shortUrl, onCopy }: ShortUrlResultProps) => {
  const { isAuthLoading } = useAuthLoading();
  return (
    <div className="toast toast-center">
      <div className="alert alert-success">
        <div>
          <span>Your short url</span>
          <span className="font-semibold">&nbsp;{shortUrl}</span>
        </div>
        <button
          type="button"
          className="tooltip cursor-pointer"
          data-tip="Copy to clipboard"
          onClick={() => onCopy(shortUrl)}
          aria-label="Copy to clipboard"
          disabled={isAuthLoading}
        >
          <CopyToastIcon />
        </button>
      </div>
    </div>
  );
}

export { ShortUrlResult };
