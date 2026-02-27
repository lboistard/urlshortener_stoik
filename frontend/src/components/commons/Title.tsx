import "./Title.css";

const Title = () => {
  return (
      <div className="text-center">
        <p className="punchline ">
          Sometimes, the <span className="accent">shorter</span>
          <br />
          the better.
        </p>

        <p className="subtitle">
          Paste a long URL and get something clean.
        </p>
      </div>
    )
}

export { Title }
