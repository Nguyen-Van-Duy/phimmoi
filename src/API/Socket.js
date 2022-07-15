import io from "socket.io-client";
import apiConfig from "./configApi";
export default io(apiConfig.urlConnectSocketIO);