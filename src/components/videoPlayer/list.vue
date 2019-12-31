<template>
    <div class="cf m-t-30">
        <el-row >
            <el-col :lg="4" :md="5" :offset="3">
                <select-group 
                @select-getDeviceOptions="getGroupOption" 
                @select-getGroupName="getGroupName" 
                :isSingleMode="isSingleMode">
                </select-group>
                <select-device 
                @select-device="getDeviceOption" 
                :isSingleMode="isSingleMode"
                :isDisabledOffDev="isDisabledOffDev">
                </select-device>

                <div class="text-center">
                    <el-button type="success" size="mini" @click="startVideoApp" class="m-t-30">
                        <i class="fa fa-hourglass-start m-r-5" aria-hidden="true"></i>
                        Start Video Player APP
                    </el-button>
                    
                </div>
                <div class="text-center">
                    <el-button type="info" size="mini" @click="stopVideoApp" class="m-t-30">
                        <i class="fa fa-hourglass-end m-r-5" aria-hidden="true"></i>
                        Stop Video Player App
                    </el-button>
                </div>

            </el-col>

            <el-col :lg="12" :md="14" class="m-t-50" :offset="2">
                <el-transfer 
                v-model="playList" 
                :data="allVideoList" 
                :titles="[videoResource, videoTarget]">
                </el-transfer>
                <div class="action-area">
                    <div class="left-area">
                        <img src="static/imgs/player.png" :class="{imgRotate: isPlay}" alt="" style="width:40px">
                        <el-tooltip :content="palyVideoName" placement="top">
                            <p class="m-t-5 c-primary">{{palyVideoName}}</p>
                        </el-tooltip>
                    </div>

                    <div class="right-area">
                        <div class="progress-module">
                            <span>{{curposition|time}}</span>
                            <div class="progress">
                                <el-progress :percentage="percentage" :show-text="false"></el-progress>
                            </div>
                            
                            <span>{{duration|time}}</span>
                        </div>
                    
                        <div class="volume-module">
                            <i class="fa fa-2x fa-volume-up c-primary m-r-15 icon" aria-hidden="true"></i>
                            <div class="slider">
                                <vue-slider
                                v-model="curVolume"
                                :max="maxVolume"
                                :tooltip="'active'" 
                                @change="setDeviceVideoVolume()">
                                </vue-slider>
                            
                            </div>
                            <div class="fr action">
                                <i class="fa fa-2x fa-stop-circle c-primary" aria-hidden="true"  v-if="isPlay" @click="pauseDeviceVideo()"></i>
                                <i class="fa fa-2x fa-play-circle c-primary" aria-hidden="true" v-else @click="startDeviceVideo()"></i>
                                <i class="fa fa-reply reply" aria-hidden="true" @click="restartDeviceVideo()"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row> 
    </div>
</template>
<style lang="scss">
     @import "../../assets/css/colors";
    

    @-webkit-keyframes rotation{
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
    }

    .imgRotate{
        -webkit-transform: rotate(360deg);
        animation: rotation 4s linear infinite;
        -moz-animation: rotation 4s linear infinite;
        -webkit-animation: rotation 4s linear infinite;
        -o-animation: rotation 4s linear infinite;
    }
    .action-area{
        width: 500px;
        margin-top: 30px;
        display: flex;
        .left-area{
            text-align: center;
            width: 110px;
            flex: 0 0 110px;
            p{
                word-break:break-all;
                overflow: hidden;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                -webkit-text-overflow: ellipsis;
                -moz-text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .right-area{
            flex: 1 1 200px;
            .volume-module{
                display: flex;
                flex-direction: row;
                margin-top: 5px;
                i{
                    flex: 0 0 10px;
                    position: relative;
                    top: 8px;
                }

                .slider{
                    flex: 1 1 auto;
                    position: relative;
                    top: 13px;
                }

                .action{
                    flex: 0 0 80px;
                    i{
                        margin-left: 5px;
                        cursor: pointer;
                    }
                    .reply{
                        
                        display: inline-block;
                        color: #fff;
                        padding: 5px;
                        background: $primary-color;
                        border-radius: 50%;
                        position: relative;
                        top:2px;
                    }
                }


            }

            .progress-module{
                display: flex;
                flex-direction: row;
                margin-top: 5px;
                span{
                    flex: 0 0 15px;
                    position: relative;
                    top:-5px;
                }

                .progress{
                    flex: 1 1 auto;
                    padding: 0px 5px;
                    display: inline-block;
                }

            }
        }
       

        
    }
    .el-transfer-panel__header{
        background: #eee !important;
        span{
            font-weight: 900;
        }

    }

    .is-disabled.el-transfer__button{
        border-color: #ddd !important;
        background:  #eee !important;
    }
    

    .el-transfer-panel{
        border: 1px solid #ddd;
    }

    

</style>


<script>
    import selectDevice from '../../common/select-device'
    import modeSwitch from "../../common/mode-switch"
    import selectGroup from "../../common/select-group"
    import VueSlider from 'vue-slider-component'
    import {
        getDeviceStatus,
        setDeviceStatus,
        execDeviceStatus,
        batchExecDeviceStatus,
        reExecDeviceStatus
    } from "../restfulapi/deviceStatusApi"
    import {
        getDeviceVideoStatus,
        setDeviceVideoStatus,
    } from "../restfulapi/videoPlay.js"
    import 'vue-slider-component/theme/antd.css'
    import handleResponse from '@/components/restfulapi/handleResponse';
    import {appControl} from "../../assets/js/lwm2mMap"
import { clearInterval } from 'timers';



    export default{
        name: "appSecurity",
        data(){
            return {
                selectedAgentId: '',
                selectedAgentsData: [],
                isSingleMode: true,
                groupname: '',
                //offline device is disabled
                isDisabledOffDev: true,
                //selectedAgent is offline
                isOffline: false,
                videoIconColor: "#303133",


                allVideoList: [],
                playList: [],
                isPlay: false,
                percentage: 0,
                maxVolume: 42, 
                curVolume: 0,
                //120s/0s play duration
                curposition:0,
                duration: 0,
                palyVideoName: "",
                videoResource: "Video Resource",
                videoTarget: "Ready Play",

                getTarget: "/40007/0/27600",
                setTarget: "/40007/0/27601",
                
                //solution app pkg name
                pkgname: "com.adv.videoplayer",
                funcIds: {
                    getVolume: "get_volume",
                    getLocalVideoList: "get_local_video_list",
                    getPlayListStatus: "get_playlist_status",
                    getVideoInfo: "get_video_info",
                    setStart: "set_start",
                    setRestart: "set_restart",
                    setPause: "set_pause",
                    setVolume: "set_volume"
                },

                timer: null
            }
        },
        components:{
            selectDevice,
            selectGroup,
            modeSwitch,
            VueSlider

        },
        methods:{
            getDeviceOption(selectedAgentId){ 
                this.selectedAgentId = selectedAgentId;
            },

            getGroupOption(selectedAgentsData){
                this.selectedAgentsData = selectedAgentsData;
            },

            initData(){
                this.selectedAgentId = "";
                this.groupname = "";
                this.selectedAgentsData = [];
                
               
            },

            initVideoData(){
                window.clearInterval(this.timer);
                this.timer = null;
                this.allVideoList= [];
                this.playList= [];
                this.isPlay= false;
                this.percentage= 0;
                this.maxVolume= 42;
                this.curVolume= 0;
                //120s/0s play duration
                this.curposition= 0;
                this.duration= 120;
                this.palyVideoName= "";
            },

            changeMode(val){
                this.initData();
                this.isSingleMode = val
            },

            getGroupName(groupname){
                this.groupname = groupname;
            },

            isDisabled(value){
                this.isDisabledOffDev = value;
            },
            isOfflineDev(value){
                this.isOffline = value
            },

            getDeviceVideoStatus(funcid){
                if(this.selectedAgentId == ""){
                    console.error("selectAgentId is empty");
                    return;
                }

                let data= {
                    appname: this.pkgname,
                    funcid: funcid,
                    param: "test"
                }
                getDeviceVideoStatus(this.selectedAgentId, this.getTarget, data).then((obj) => {
                    handleResponse(obj, (res) => {
                        console.log(res);
                        if(res.status === "CONTENT"){
                            let videoObj = JSON.parse(res.content.value);
                            if(videoObj.errcode == 0){
                                 switch(funcid){
                                    case this.funcIds.getLocalVideoList:
                                        let videoArray = videoObj.data.videolist;
                                        if(_g.isArray(videoArray)){
                                            this.allVideoList = [];
                                            videoArray.forEach((val) => {
                                                this.allVideoList.push({
                                                    key: val,
                                                    label: val
                                                });
                                            })
                                        }

                                        break;
                                    case this.funcIds.getPlayListStatus:
                                        this.playList = videoObj.data.playlist;
                                        let playStatus = videoObj.data.playstatus;
                                        playStatus = parseInt(playStatus);
                                        if(playStatus === 3){
                                            this.getVideoVolume();
                                            this.videoTarget = "Playing";
                                            this.isPlay = true;
                                            if(this.timer == null){
                                                this.timer = window.setInterval(() => {
                                                    this.getVideoInfo();
                                                }, 1000)
                                            }
                                            
                                        }else{
                                            this.videoTarget = "Ready Play"
                                            this.isPlay = false;
                                            window.clearInterval(this.timer);
                                            this.timer = null;
                                        }
                                        break;
                                    case this.funcIds.getVolume:
                                        this.maxVolume = videoObj.data.maxvol;
                                        this.curVolume = videoObj.data.curvol;
                                        break;
                                    case this.funcIds.getVideoInfo:
                                        let curposition = videoObj.data.curposition;
                                        let duration = videoObj.data.duration;
                                        this.percentage = (curposition/duration)*100;
                                        this.curposition = Math.round(curposition/1000);
                                        this.duration = Math.round(duration/1000);
                                        
                                        this.palyVideoName = videoObj.data.videoname;
                                        break;
                                    default:
                                        console.error("funcId not support")
                                }
                            }else{
                                console.error("[getDeviceVideoStatus]"+this.funcIds+"#errcode:"+videoObj.errcode);
                            }
                           
                        }
                        
                    })
                })
            },


            getVideoList(videoObj){
                this.getDeviceVideoStatus(this.funcIds.getLocalVideoList)

            },

            getVideoStatus(videoObj){
                this.getDeviceVideoStatus(this.funcIds.getPlayListStatus); 
            },

            getVideoVolume(videoObj){
                this.getDeviceVideoStatus(this.funcIds.getVolume);
            },

            getVideoInfo(videoObj){
                this.getDeviceVideoStatus(this.funcIds.getVideoInfo);
                
            },

            setDeviceVideoStatus(data, funcId){
                if(this.selectedAgentId == ""){
                    console.error("selectAgentId is empty");
                    return;
                }

                setDeviceVideoStatus(this.selectedAgentId, this.setTarget, data).then((obj) => {

                    handleResponse(obj, (res) => {

                        if(res.status === "CHANGED"){
                            if(funcId === this.funcIds.setPause){
                                window.clearInterval(this.timer);
                                this.timer = null;
                                this.getVideoStatus();
                            }else if(funcId === this.funcIds.setVolume){
                                this.getVideoVolume();
                            }else{
                                this.getVideoStatus();
                            }
                        }else{
                            _g.handleError(res); 
                        }
                        
                    })
                })
            },

            pauseDeviceVideo(){
                let data = {
                    appname: this.pkgname,
                    funcid: this.funcIds.setPause,
                    param: ""
                }
                this.setDeviceVideoStatus(data, this.funcIds.setPause);
            },


            startDeviceVideo(){
                if(this.playList.length=== 0){
                    this.$swal("", "Please add the video you want to play to the playlist", 'info');
                    return;
                }

                let playlistString = this.playList.join(",");
                let data = {
                    appname: this.pkgname,
                    funcid: this.funcIds.setStart,
                    param: playlistString
                }
                this.setDeviceVideoStatus(data, this.funcIds.setStart);
            },

            restartDeviceVideo(){
                if(this.playList.length=== 0){
                    this.$swal("", "Please add the video you want to play to the playlist", 'info');
                    return;
                }

                let playlistString = this.playList.join(",");
                let data = {
                    appname: this.pkgname,
                    funcid: this.funcIds.setRestart,
                    param: playlistString
                }
                this.setDeviceVideoStatus(data, this.funcIds.setRestart);
            },
            setDeviceVideoVolume(){
                if(this.playList.length=== 0){
                    this.$swal("", "Please add the video you want to play to the playlist", 'info');
                    return;
                }

                let data = {
                    appname: this.pkgname,
                    funcid: this.funcIds.setVolume,
                    param: this.curVolume
                }
                this.setDeviceVideoStatus(data, this.funcIds.setRestart);
            },

            startVideoApp(){
                if(this.selectedAgentId == ""){
                    console.error("selectAgentId is empty");
                    return;
                }

                setDeviceStatus(this.selectedAgentId, appControl.setKiosk, this.pkgname).then((obj) => {
                    handleResponse(obj, (res) => {
                        if(res.status === "CHANGED"){
                            this.$swal("", "Success", "success").then(() => {
                                this.getVideoList();
                                this.getVideoStatus();
                            })
                            
                        }else{
                            _g.handleError(res);
                        }
                    })
                })
            },
            stopVideoApp(){
                if(this.selectedAgentId == ""){
                    console.error("selectAgentId is empty");
                    return;
                }

                setDeviceStatus(this.selectedAgentId, appControl.cancelKiosk, this.pkgname).then((obj) => {

                    handleResponse(obj, (res) => {
                        if(res.status === "CHANGED"){
                            this.$swal("", "Success", "success").then(() => {
                                this.getVideoList();
                                this.getVideoStatus();
                            })
                        }else{
                            _g.handleError(res);
                        }
                        
                    })
                })
            }

            
        },

        watch: {
            selectedAgentId(val){
                if(val){
                    this.initVideoData();
                    this.getVideoList();
                    this.getVideoStatus();

                }
            }
        },

    }
</script>

