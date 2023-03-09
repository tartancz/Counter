const API_URL = "http://127.0.0.1:8000";

export async function loadUsers(search) {
  const token = localStorage.getItem("token");
  let res;
  try {
    res = await fetch(`${API_URL}/all_users/${search ? '?search=' + search : ''}`, {
      headers: {
        Authorization: token ? `Token ${token}` : "",
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    throw new Response(e, { status: 500 });
  }
  return await res.json();
}

export function signup(data) {
    try {
      return fetch(`${API_URL}/auth/registration/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (e) {
      throw new Response(e, { status: 500 });
    }
}

export async function login(data) {
  let res;
  try {
    res = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (e) {
    throw new Response(e, { status: 500 });
  }
  return await res;
}

export async function verifyEmail(key) {
  let res;
  try {
    res = await fetch(`${API_URL}/auth/registration/verify-email/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
  } catch (e) {
    throw new Response(e, { status: 500 });
  }
  if (res.status === 404) {
    throw new Response("Key was not found.", { status: 404 });
  }
}
export async function getMyCounters() {
  const token = localStorage.getItem("token");
  let res;
  try {
    res = await fetch(`${API_URL}/counter/my_counters/`, {
      method: "GET",
      headers: {
        Authorization: token ? `Token ${token}` : "",
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    throw new Response(e, { status: 500 });
  }
  return await res.json();
}

export async function getForeignCounters(user) {
  let res;
  try {
    res = await fetch(`${API_URL}/foreign_counter/${user}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    throw new Response(e, { status: 500 });
  }
  return await res.json();
}

export async function updateCounter({ id, count }) {
  const token = localStorage.getItem("token");
  let res;
  try {
    res = await fetch(`${API_URL}/counter/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: token ? `Token ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    });
  } catch (e) {
    throw new Response(e, { status: 500 });
  }
  return await res.json();
}

export async function deleteCounter(id) {
  const token = localStorage.getItem("token");
  let res;
  try {
    res = await fetch(`${API_URL}/counter/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Token ${token}` : "",
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    throw new Response(e, { status: 500 });
  }
}

export async function createCounter(id) {
  const token = localStorage.getItem("token");
  let res;
  try {
    res = await fetch(`${API_URL}/counter/`, {
      method: "POST",
      headers: {
        Authorization: token ? `Token ${token}` : "",
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    throw new Response(e, { status: 500 });
  }
  return await res.json()
}

