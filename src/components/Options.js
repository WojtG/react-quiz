function Options({ options }) {
  return (
    <div className="options">
      {options.map((curr) => (
        <button key={curr} className="btn btn-option">
          {curr}
        </button>
      ))}
    </div>
  );
}

export default Options;
