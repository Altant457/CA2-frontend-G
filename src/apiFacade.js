const URL = "http://localhost:8080/sec_demo/api";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a later step (d) here (REMEMBER to uncomment in the returned object when you do)*/
  const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
  const getToken = () => {
    return localStorage.getItem('jwtToken')
  }
  const loggedIn = () => {
    return getToken() != null;
  }
  const logout = () => {
    localStorage.removeItem("jwtToken");
  }


  const login = (user, password) => {
    const opts = makeOptions("POST", true, {username: user, password: password})
    return fetch(URL + "/login", opts)
      .then(handleHttpErrors)
      .then(res => setToken(res.token))
  }

  const fetchData = () => {
    const opts = makeOptions("GET", true)
    return fetch(URL + "/info/user", opts).then(handleHttpErrors)
  }
  const makeOptions= (method, addToken, body) => {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    }
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData
  }
}
const facade = apiFacade();
export default facade;
