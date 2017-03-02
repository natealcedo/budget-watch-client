import axios from "axios";

export default function setJwtToken(token){
  if(token){
    axios.default.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    delete axios.default.headers.common["authorization"];
  }
}
