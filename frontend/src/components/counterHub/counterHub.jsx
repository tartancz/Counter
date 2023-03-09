import Counter from "../Counter/counter";
import {
  createCounter,
  deleteCounter,
  getForeignCounters,
  getMyCounters,
  updateCounter,
} from "../../utils/api";
import { useLoaderData, useParams } from "react-router-dom";
import "./counterHub.css";
import { useEffect, useState } from "react";

export async function Myloader() {
  if (localStorage.getItem("token") === null) {
    return null;
  }
  const counters = await getMyCounters();
  return counters;
}

export async function foreignLoader({ params }) {
  const { user } = params;
  const counters = await getForeignCounters(user);
  return counters;
}

export default function CounterHub({ edit }) {
  const [counters, setCounters] = useState(useLoaderData());
  const data = useLoaderData();
  useEffect(() => {
    setCounters(data);
  }, [useParams()]);

  async function handleChangeCount(id, count) {
    let tempCounters = [...counters];
    for (const [index, counter] of tempCounters.entries()) {
      if (id != counter.id) {
        continue;
      }
      tempCounters[index].count = count;
      tempCounters[index].modified_at = Date.now();
      break;
    }
    setCounters(tempCounters);
    const resp = await updateCounter({ id, count });
  }

  async function handleDeleteCounter(id) {
    let tempCounters = [...counters];
    for (const [index, counter] of tempCounters.entries()) {
      if (id != counter.id) {
        continue;
      }
      tempCounters.splice(index, 1);
      break;
    }

    setCounters(tempCounters);
    deleteCounter(id);
  }

  async function handleCreatecounter() {
    let tempCounters = [...counters];
    const newCounter = await createCounter();
    tempCounters.push(newCounter);
    setCounters(tempCounters);
  }

  function formatCounter(counters, edit) {
    return counters.length ? (
      counters.map((data) => {
        return (
          <Counter
            key={data.id}
            init={data}
            edit={edit}
            handleChangeCount={(count) => handleChangeCount(data.id, count)}
            handleDeleteCounter={() => handleDeleteCounter(data.id)}
          />
        );
      })
    ) : (
      <h1>Dont have created any counter</h1>
    );
  }

  return (
    <div className="countersWrapper">
      {counters !== null ? (
        <>
          {formatCounter(counters, edit)}
          {edit ? (
            <button onClick={handleCreatecounter}>Add counter</button>
          ) : (
            ""
          )}
        </>
      ) : (
        <h1>You must log in to get your own counter</h1>
      )}
    </div>
  );
}
