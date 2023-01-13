function Controls({ onLogout }) {
  return (
    <div className="controls">
      <button onClick={onLogout} className="controls__logout button">Logout</button>
    </div>
  );
}

export default Controls;