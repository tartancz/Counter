import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./counter.css";

export default function Counter({ init, edit, handleChangeCount, handleDeleteCounter }) {
  
  return (
    <div className="counterWrapper">
      <button
        className="changeButton increase"
        onClick={() => handleChangeCount(init.count + 1)}
        disabled={!edit}
      >
        Increase
      </button>
      <button
        className="changeButton decrease"
        onClick={() => handleChangeCount(init.count - 1)}
        disabled={!edit || init.count === 0}
      >
        Decrease
      </button>
      <p className="countNumber">{init.count}</p>
      <button
        className="resetButton incerease"
        onClick={() => handleChangeCount(0)}
        disabled={!edit}
      >
        Reset
      </button>
      <button
        className="resetButton incerease"
        onClick={() => handleDeleteCounter()}
        disabled={!edit}
      >
        Delete
      </button>
      {edit ? (
        <div className="dateData">
          <span>created at: {formatDate(init.created_at)}</span>
          <span>modified at: {formatDate(init.modified_at)}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function formatDate(dateString) {
  const datefrm = new Date(dateString);
  return datefrm.toLocaleString();
}
