export default class FetchingApi {
  constructor() { 
    this._api = process.env.API_URL //api url
  }
  //root
  async get_root() {return await fnFetching(`${this._api}/`, get_public())}
  async post_register(body) {return await fnFetching(`${this._api}/usuario-registrarse/`, post_public(body))}
  async post_login(usuario, clave) {return await fnFetching(`${this._api}/usuario-logearse/`, login_obj(usuario, clave))}
  async get_token(access_token) {return await fnFetching(`${this._api}/token/`, get_private(access_token))}
  //clients
  async get_clients() {return await fnFetching(`${this._api}/cliente/`, get_public())}
  async get_clients_byid(id) {return await fnFetching(`${this._api}/cliente/${id}`, get_public())}
  //user
  async get_user_all() {return await fnFetching(`${this._api}/usuario/`, get_public())}
  async get_user_byid(id) {return await fnFetching(`${this._api}/usuario/${id}`, get_public())}
  //panel --------------------------------------------------------------------------------------
  //business
  async get_business_byid_user(id) {return await fnFetching(`${this._api}/negocio/por-usuario/${id}`, get_public())}
  //item-grp
  async get_items_grp_byid_business(id) {return await fnFetching(`${this._api}/item-grp/por-negocio/${id}`, get_public())}
  //item-categ
  async get_items_categ_byid_business(id) {return await fnFetching(`${this._api}/item-categ/por-negocio/${id}`, get_public())}
  //item
  async get_items_byid_business(id) {return await fnFetching(`${this._api}/item/por-negocio/${id}`, get_public())}
  //--------------------------------------------------------------------------------------------
}

//execute all fetching
async function fnFetching(api, obj) {
  try {
    const res = await fetch(api, obj)   
    return res
  } catch (err) {
    throw new Error(err)
  }
}

//pre config all object for the fetch
const login_obj = (usuario, clave) => {
  return {
    cache: "no-store",
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=&username=${usuario}&password=${clave}&scope=&client_id=&client_secret=`
  }
}

const get_public = () => {
  return {
    headers: {
      "Accept": "application/json"
    }
  }
}

const post_public = (theBody) => {
  return {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(theBody)
  }
}

const get_private = (access_token) => {
  return {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${access_token}`
    }
  }
}