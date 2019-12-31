import { repoApiPost} from '@/assets/js/baseApi'
import {getRepoServerApi} from "../restfulapi/serverConfigApi"
import {checkSession, getSession} from "../../assets/js/storage"
import utils from "../../assets/js/utils"

let getToken = function(){
    let name, passwd;
    return new Promise((resolve, reject) => {
        if(checkSession("aimlinkData")){
            try{
                let aimlinkData = JSON.parse(getSession("aimlinkData"))
                name = aimlinkData.username;
                passwd = utils.decrypt(aimlinkData.password);
            }catch(e){
                console.error(e);
                return;
            }
            
        }else{
            console.error("pwd and user name is not in sessionStorage")
            return;
        }
        let formData = {name, passwd};
        let infoData;
        getRepoServerApi().then((repoUrl) => {
            let getRepoTokenUrl = repoUrl + "/login";
            repoApiPost(getRepoTokenUrl, formData).then((tokenData) =>{
                if(!tokenData){
                    resolve("");
                }
                let token = tokenData.data.data.token;
                resolve(token);
            }).catch((error) => {
                resolve("");
            })
        });
        
    })
}
export {
    getToken
}