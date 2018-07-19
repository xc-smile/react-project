import axios from "axios";

export default function (url, data = {}, type = "GET") {
  if (type === "GET") {
    let dataString = "";
    Object.keys(data).forEach(key => dataString += key + "=" + data[key] + "&")


    if (dataString !== "") {
      dataString = dataString.substring(0, dataString.length - 1);
      url = url + "?" + dataString;
    }

    return axios.get(url);
  } else {
    return axios.post(url, data);
  }
}