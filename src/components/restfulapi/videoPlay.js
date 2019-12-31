import {apiGet, apiPut} from "../../assets/js/baseApi";

let getDeviceVideoStatus = function(agentId, sensorId, param){
    return new Promise((resolve, reject) => {
        let url = "/api/solutionApp/"+ agentId+ sensorId
        apiGet(url, param).then((data) => {
            resolve(data);
        }).catch((error) => {
            resolve(error.response);
        })
    })
}

let setDeviceVideoStatus = function(agentId, sensorId, val=""){
    return new Promise((resolve, reject) => {
        let url = "/api/solutionApp/"+ agentId+ sensorId; 
        let resourceId = parseInt(sensorId.substring(sensorId.lastIndexOf("\/")+1, sensorId.length));
        
        var obj = {
            id: resourceId,
            value: JSON.stringify(val)
        }
        apiPut(url, obj).then((data) => {
            resolve(data);
        }).catch((error) => {
            resolve(error.response);
        })
    })
}

export{
    getDeviceVideoStatus,
    setDeviceVideoStatus
}