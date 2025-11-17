import "./index.css"

export default function Spinner() {
  return (
    <div className="spinner">
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          style={{
            background: "linear-gradient(90deg, #FFC300, #DFD747)",
          }}
        ></span>
      ))}
    </div>
  )
}
