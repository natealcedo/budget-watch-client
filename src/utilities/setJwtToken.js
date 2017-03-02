import axios from "axios";

export default function setJwtToken(token){
  if(token){
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
}
