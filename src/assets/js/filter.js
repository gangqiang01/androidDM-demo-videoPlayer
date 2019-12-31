import Vue from 'vue'
import moment from 'moment';
import {workorder} from './lwm2mMap'

function s_to_hs(s){
    let h;
    h=Math.floor(s/60);
    s= s%60;
    h+= '';
    s+= '';
    h= (h.length==1)?'0'+h:h;
    s= (s.length==1)?'0'+s:s;
    return h+':'+s;
}

export default (function () {
    Vue.filter("time", (value) => {
        if(value){
            return s_to_hs(value);
        }else{
            return "00:00";
        } 
    })

   

    Vue.filter("BSPUpdateStatus", (value) => { 
        if(value){
            switch (value){
                case 0:
                return "Building";
                case 1:
                return "Failed";
                case 2:
                return "Success";
                default:
                return "";
            }
        }else{
            return ""
        }
        
    })

    Vue.filter("BSPErrorStatus", (value) => { 
        value = _g.trim(value);
        if(value){
            switch (value){
                case "0":
                return "None";
                case "1":
                return "Network is not available";
                case "2":
                return "Can not connect to server";
                case "3":
                return "Package verify fail";
                case "4":
                return "Download/Save package error";
                case "5":
                return "Network error";
                case "6":
                return "Package install fail";
                case "7":
                return "Deploy timeout";
                case "8":
                return "Rebirth version check error";
                case "9":
                return "Rebirth status sync error"
                case "10":
                return "Check error at initial phase"
                case "11":
                return "Device is offline"
                case "12":
                return "A application is running"
                
                //server set errorcode 
                case "30":
                return "Check error at initial phase"
                case "31":
                return "A application is running"
                case "32":
                return "Device is offline"
                case "33":
                return "Download file error"
                case "34":
                return "Request agent timeout"
                case "35":
                return "Deploy timeout";
                default:
                return "";
            }
        }else{
            return "";
        }
        
    })

    Vue.filter("appErrorStatus", (value) => { 
        value = _g.trim(value);
        if(value){
            switch (value){
                case "0":
                return "None";
                case "1":
                return "Download file error";
                case "2":
                return "Unknow error";
                case "3":
                return "Apk already exists";
                case "4":
                return "Invalid apk";
                case "5":
                return "Invalid apk path";
                case "6":
                return "Not enough space";
                case "7":
                return "Apk already exists";
                case "8":
                return "User signature error"
                case "9":
                return "User signature error"
                case "10":
                return "System version too old"
                case "11":
                return "System version too new"

                case "12":
                return "Test apk not install"
                case "13":
                return "SD Card access failed"
                case "14":
                return "Invalid install url"
                case "15":
                return "SD card does not exist"
                case "16":
                return "System problem caused fail"
                case "17":
                return "Shared user does not exist"
                case "18":
                return "Shared library error"
                case "19":
                return "Shared library error"
                case "20":
                return "Optimization validation failed"
                case "21":
                return "INSTALL_FAILED_CONFLICTING_PROVIDER"
                case "22":
                return "Contains incompatible code"
                case "23":
                return "An invalid feature was used"
                case "24":
                return "The version not newer"
                //set kiosk
                case "25":
                return "Set kiosk App not found"
                case "26":
                return "Set kiosk App error"
                case "27":
                return "Start App after set kiosk error"
                case "28":
                return "Set kiosk app not in whitelist"
                case "29":
                return "Cancel kiosk Error"
                
                 //server set errorcode 
                case "30":
                return "Check error at initial phase"
                case "31":
                return "A application is running"
                case "32":
                return "Device is offline"
                case "33":
                return "Download file error"
                case "34":
                return "Request agent timeout"
                case "35":
                return "Task timeout";
                case "36":
                return "Agent not support"
                case "50":
                return "No permission to store"
                default:
                return "";
            }
        }else{
            return "";
        }
        
    })

    Vue.filter("appType", (value) => { 
        value = _g.trim(value);
        if(value){
            switch (value){
                case "system":
                return "System APP";
                case "third":
                return "Third-party APP";
                case "repo":
                return "Repo App"
                default:
                return "";
            }
        }else{
            return "";
        }
        
    })

    Vue.filter("execStatusFunction", (value) => { 
        value = _g.trim(value);
        if(value){
            switch (value){
                case "true":
                return "Enable";
                case "false":
                return "Disable";
                default:
                return "";
            }
        }else{
            return "";
        }
        
    })
    Vue.filter("wdStatusFunction", (value) => { 
        if(value){
            switch (value){
                case workorder.preInstallApp:
                return "Pre-Install App";
                case workorder.kiosk:
                return "Set Kiosk";
                case workorder.bootanimation:
                return "Set Bootanimation";
                default:
                return "";
            }
        }else{
            return ""
        }
        
    })

//appStatus function
    Vue.filter("appStatusFunction", (target) => { 
        let value = _g.trim(target);
        if(value){
            switch (value){
                case "/40004/0/27302":
                return "Enable App";
                case "/40004/0/27303":
                return "Disable App";
                case "/40004/0/27306":
                return "Start App";
                case "/40004/0/27309":
                return "Stop App";
                case "/40004/0/27308":
                return "Install App";
                case "/40004/0/27305":
                return "Uninstall App";
                case "/40004/0/27314":
                return "Set Kiosk";
                case "/40004/0/27315":
                return "Cancel Kiosk";
                case "/40004/0/27311":
                return "Add Whitelist";
                case "/40004/0/27312":
                return "Remove Whitelist"
                default:
                return "";
            }
        }else{
            return "";
        }
        
    })
   
})()

