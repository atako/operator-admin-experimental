import axios from "axios"
import qs from "qs"

export const getUsers = async (context) => {
  try {
    const { request } = context
    const r = await axios.post("https://dev297.vsmrk.com/v1/operator/users", qs.stringify(request))
    console.log(r)
    return r.data
  } catch (err) {
    console.error(err)
  }
}

