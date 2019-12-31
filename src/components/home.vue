<template>
    <div class="wrapper" >

        <home-header :isCollapse="isCollapse" @collapseAsideNavbar="collapse"></home-header>

        <div class="body">
            <!-- <div class="menu">
                <el-menu 
                    :default-active="activeItem" 
                    background-color="#222d32"
                    text-color="#ddd"
                    active-text-color="#ffbf00"
                    class="el-menu-vertical"  
                    :unique-opened="isUnique"
                    :collapse="isCollapse">
                    <router-link to="/main/device/list">
                        <el-menu-item index="deviceList">
                            <i class="fa fa-tasks m-r-10" ></i>
                            <span slot="title">{{$t('home.deviceList')}}</span>
                        </el-menu-item>
                    </router-link>


                    <router-link to="/main/control/appcontrol">
                        <el-menu-item index="control-appControl"> 
                            <i class="fa fa-android m-r-14" ></i>
                            <span slot="title">{{$t('home.appManager')}}</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/main/security/appSecurity">
                        <el-menu-item index="appSecurity"> 
                            <svg t="1569376934286" class="icon m-r-9 securityicon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2530" width="19" height="19">
                                <path d="M718.188013 520.572236H305.821197v-51.54598c0-18.978237 15.385409-34.363645 34.363646-34.363645h343.639524c18.978237 0 34.363645 15.385409 34.363646 34.363645v51.54598z" :fill="appSecurityIconColor" p-id="2531"></path>
                                <path d="M512 958.708971c-13.909801 0-27.836999-4.202719-39.71656-12.618388L296.452829 821.496913C191.213973 738.90894 133.995807 622.150726 133.995807 491.733421V255.221776a34.370809 34.370809 0 0 1 19.648502-31.05018L473.626018 72.453149a31.991622 31.991622 0 0 1 3.691065-1.493004c22.299889-7.550976 46.914496-7.567349 69.248154 0 1.258667 0.419556 2.499937 0.923022 3.691065 1.493004l320.098366 151.718447a34.362622 34.362622 0 0 1 19.648502 31.05018v236.512668c0 130.433678-57.217143 247.183705-161.098072 328.756559L551.732933 946.082396c-11.879562 8.41567-25.806759 12.626575-39.732933 12.626575zM202.724121 276.958846v214.774575c0 108.872616 47.88766 206.427466 134.821615 274.701432l174.454264 123.571387 175.813215-124.586507c85.591377-67.251683 133.462664-164.80551 133.462664-273.686312V276.958846L522.906397 135.543046c-7.131421-2.064009-14.832823-2.064009-21.930475 0L202.724121 276.958846z" :fill="appSecurityIconColor"  p-id="2532"></path>
                                <path d="M512 676.532287c-18.977213 0-34.363645-15.386432-34.363645-34.363645V313.068252c0-18.977213 15.386432-34.363645 34.363645-34.363646s34.363645 15.386432 34.363645 34.363646V642.168642c0 18.977213-15.386432 34.363645-34.363645 34.363645z" :fill="appSecurityIconColor" p-id="2533"></path>
                            </svg>
                            <span slot="title">{{$t('home.appSecurity')}}</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/main/control/systemupdate">
                        <el-menu-item index="control-systemUpdate"> 
                            <svg t="1569379755097" class="icon m-r-10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6130" width="14" height="15">
                                <path :fill="systemupdateIconColor" d="M323.072 100.864h377.856c28.16 0 50.688-22.528 50.688-50.688S728.576 0 700.928 0H323.072c-28.16 0-50.688 22.528-50.688 50.688s23.04 50.176 50.688 50.176zM189.952 286.72h643.584c28.16 0 50.688-22.528 50.688-50.688s-22.528-50.688-50.688-50.688H189.952c-28.16 0-50.688 22.528-50.688 50.688s23.04 50.688 50.688 50.688zM936.448 374.784H87.552C39.936 374.784 1.024 413.696 1.024 460.8v476.672c0 47.616 38.4 86.016 86.016 86.016h849.408c47.616 0 86.016-38.4 86.016-86.016V460.8c0.512-47.104-38.4-86.016-86.016-86.016z m-297.984 259.584c-8.704 8.704-20.48 13.312-31.744 13.312-11.776 0-23.04-4.608-31.744-13.312l-17.408-17.408V890.88c0 25.088-20.48 45.056-45.056 45.056s-45.056-20.48-45.056-45.056v-273.92l-17.408 17.408c-17.408 17.408-46.08 17.408-64 0-17.408-17.408-17.408-46.08 0-64L480.256 476.16c8.704-8.704 19.968-13.312 31.744-13.312 11.776 0 23.552 4.608 31.744 13.312l94.208 94.208c17.92 17.92 17.92 46.592 0.512 64z" p-id="6131"></path>
                            </svg>
                            <span slot="title">{{$t('home.systemUpdate')}}</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/main/workorder/list">
                        <el-menu-item index="workorderList">
                            <svg t="1571377803155" class="icon m-r-10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3196" width="18" height="18">
                                <path d="M413.013333 162.133333h198.997334a45.056 45.056 0 0 0 42.325333-47.104A45.397333 45.397333 0 0 0 610.645333 68.266667H413.013333a45.397333 45.397333 0 0 0-43.690666 46.762666 45.397333 45.397333 0 0 0 43.690666 47.104z" p-id="3197" :fill="wdIconColor"></path>
                                <path d="M803.498667 110.250667H750.933333s-37.546667 10.24-37.546666 15.701333c0 39.594667-27.648 78.506667-60.757334 78.506667h-286.037333a74.069333 74.069333 0 0 1-62.805333-78.506667c0-5.12-34.133333-15.701333-34.133334-15.701333H211.626667c-75.093333 0-94.208 44.373333-94.208 107.861333v630.784c0 68.266667 26.624 106.837333 99.669333 106.837333h580.266667c73.045333 0 108.544-30.037333 108.544-106.837333V218.112c0.682667-63.488-32.768-107.861333-102.4-107.861333z m-311.637334 737.28H244.736c-15.018667 0-24.234667-16.384-24.234667-31.744a30.378667 30.378667 0 0 1 27.306667-30.72h245.76a31.402667 31.402667 0 0 1 28.672 30.72 34.133333 34.133333 0 0 1-30.378667 31.744z m0-226.304H244.736c-15.018667 0-24.234667-16.384-24.234667-31.744a30.378667 30.378667 0 0 1 27.306667-30.72h245.76a31.402667 31.402667 0 0 1 28.672 30.72 34.133333 34.133333 0 0 1-30.378667 31.744z m245.418667 48.128v167.594666a16.725333 16.725333 0 0 1-17.066667 17.066667h-57.685333a16.725333 16.725333 0 0 1-17.066667-17.066667v-167.594666a111.616 111.616 0 0 1 8.533334-207.530667v106.154667h74.410666v-106.154667a111.616 111.616 0 0 1 8.533334 207.530667z m35.84-273.066667H244.736c-15.018667 0-24.234667-16.384-24.234667-31.744a30.378667 30.378667 0 0 1 27.306667-30.72h527.36a31.402667 31.402667 0 0 1 28.672 30.72 34.133333 34.133333 0 0 1-30.72 30.037333z" p-id="3198" :fill="wdIconColor"></path>
                            </svg>
                            <span slot="title">{{$t('home.wordorderList')}}</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/main/deployFile/deployFile">
                        <el-menu-item index="deployFile">
                            <svg t="1574991432630" class="icon m-r-10" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6499" width="18" height="18">
                                <path d="M804.570279 555.886383c85.503878 0 157.03749-69.119901 157.03749-153.819209 0-78.994173-61.293627-145.042079-138.898087-153.59978A232.155097 232.155097 0 0 0 753.589781 68.75565 236.470519 236.470519 0 0 0 586.092877 0.001463c-49.078787 0-97.279861 16.530262-139.483229 47.83536a261.485341 261.485341 0 0 0-70.509614 78.774745 135.460378 135.460378 0 0 0-62.244482-14.994265c-35.181664 0-68.973616 16.164548-95.231864 45.494793-17.481118 19.602258-29.915386 43.446795-35.986235 68.169045a174.445465 174.445465 0 0 0-75.263892 57.051347C84.991879 312.028446 73.142753 347.429538 73.142753 384.659199 73.142753 479.01335 150.67407 555.886383 245.979077 555.886383H804.570279zM223.524252 261.340518c18.505116-51.492498 41.545084-81.700455 69.046759-90.62387 25.746249-8.338274 74.239894 2.194283 89.965585 13.165695 1.023999 0.877713 2.852567 2.047997 5.485707 3.291424a16.822833 16.822833 0 0 0 21.065113-8.557702C440.904513 110.666448 511.999269 62.757945 583.679166 62.757945c103.643281 0 187.976874 83.529024 187.976874 186.221448 0 7.021704-0.365714 17.919974-1.023998 27.501675-0.585142 8.557702-2.194283 11.263984 6.363419 12.726839 1.023999 0.146286 7.16799 0.146286 18.651402 0 61.439912 0 105.618135 55.369064 105.618135 116.296977 0 58.879916-31.451384 96.402148-90.258157 99.327858h-554.422065c-65.90162-5.04685-118.930116-49.005644-118.930116-115.711835 0-54.930207 12.873124-100.936999 65.243336-118.344974l20.626256-9.435415zM1023.998537 824.832285V658.286237l-77.823889 0.073142H0L0.146286 877.714495 1023.998537 877.275638v-52.443353z m-49.883357 1.974854H52.443354V709.998163h921.671826v116.808976z" p-id="6500" :fill="fileIconColor"></path>
                                <path d="M329.142387 768.000366h585.142021v21.942826l21.942826-21.942826h14.62855l-7.314275-7.314276 7.314275-7.314275h-14.62855l-21.942826-21.942826v21.942826h-585.142021V731.428989l-21.942826 21.942826H292.571011l7.314275 7.314275-7.314275 7.314276h14.62855l21.942826 21.942826v-21.942826z m-65.828477 0h14.62855l-7.314275-7.314276 7.314275-7.314275h-14.62855l-7.314276-7.314275V731.428989l-7.314275 7.314276-7.314275-7.314276v14.628551l-7.314276 7.314275H219.428258l7.314275 7.314275-7.314275 7.314276h14.62855l7.314276 7.314275v14.628551l7.314275-7.314276 7.314275 7.314276v-14.628551l7.314276-7.314275z" p-id="6501" :fill="fileIconColor"></path>
                            </svg>
                        
                            <span slot="title">{{$t('home.deployFile')}}</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/main/vnc/list">
                        <el-menu-item index="vncList">
                            <i class="fa fa-desktop m-r-10"></i>
                            <span slot="title">{{$t('home.remoteDesktop')}}</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/main/aStore/list">
                        <el-menu-item index="aStoreList"> 
                            <i class="fa fa-location-arrow m-r-14"></i>
                            <span slot="title">{{$t('home.aStore')}}</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/main/configuration/server">
                        <el-menu-item index="configurationServer">
                            <i class="fa fa-cogs m-r-10"></i>
                            <span slot="title">{{$t('home.configurations')}}</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/main/license/list">
                        <el-menu-item index="licenseList">
                            <i class="fa fa-id-card m-r-10"></i>
                            <span slot="title">{{$t('home.license')}}</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/main/player/list">
                        <el-menu-item index="playerList">
                            <i class="fa fa-id-card m-r-10"></i>
                            <span slot="title">{{$t('home.license')}}</span>
                        </el-menu-item>
                    </router-link>
                </el-menu>
            </div> -->
            
            <div class="content" >
                <div class="cf">
                    <transition name="fade" mode="out-in">
                        <!-- <keep-alive> -->
                        <router-view></router-view>
                        <!-- </keep-alive> -->
                    </transition>
                </div>
            </div>
            
        </div> 
        <home-footer></home-footer>  
    </div>

</template>



<style lang='scss' scoped>
    @import "../assets/css/colors";
    $nav-icon-color : $primary-color; 
    $header-height : 70px;
    $aside-width : 200px;

    .wrapper{
        display: -webkit-flex;
        display: flex;
        height: 100vh;
        flex-flow: column nowrap;
        // overflow: hidden;    
        .body{
            display: -webkit-flex;
            flex: 1;
            height: 100%;
            display: flex;
            flex-flow: row nowrap;
            .menu{
                height: 100%; 
                overflow-y: auto;
                overflow-x: hidden;
                .el-menu-vertical:not(.el-menu--collapse) {
                    height: 100%;
                    width: $aside-width;
                    box-sizing: border-box;
                    i {
                        display: inline-block;                    
                    }

                    .el-menu-item-group, .el-menu-item-group li{
                        background-color: #181f23 !important;
                    }
                    .is-active{
                        background-color: rgb(27,36,40) !important;
                    }
                }
                .securityicon{
                    margin-left: -2px;
                }
                .el-menu--collapse{
                    height: 100%;
                }
            }
            .content{
                flex:1;
                margin:10px;
                padding-top: 5px;
                margin-right: 0;
                height: 100%;
                overflow-y: auto;
                overflow-x: hidden;
                .fade-enter-actice, .fade-leave-active{
                    transition: opacity .5s
                } 
                .fade-enter, .fade-leave-active{
                    opacity: 0;
                }
            }
        }

        
    }

    
</style>

<script>
    import {mapState} from 'vuex'
    import homeHeader from './main/header'
    import homeFooter from './main/footer'

    export default {
        name: 'home',
        data() {
            return {
                defaultIconColor:"#909399",
                activeIconColor: "#ffbf00",
                isCollapse: false,
                activeItem: 'devicelist',
                isUnique: true,
            };
        },
        methods: {
            collapse(){
                this.isCollapse = this.isCollapse? false: true;
            },

        },

        created(){
            this.activeItem = this.$route.meta.menuname;
        },

        computed: {
            ...mapState({
                showLoading: "globalLoading",
            }), 
            appSecurityIconColor(){
                return this.activeItem == "appSecurity"? this.activeIconColor: this.defaultIconColor      
            },   
            systemupdateIconColor(){
                return this.activeItem == "control-systemupdate"? this.activeIconColor: this.defaultIconColor 
            },
            wdIconColor(){
                return this.activeItem == "workorderlist"? this.activeIconColor: this.defaultIconColor 
            },
            
            fileIconColor(){
                return this.activeItem == "deployFile"? this.activeIconColor: this.defaultIconColor 
            }
        },

        watch: {
            $route(to, from){
                this.activeItem = to.meta.menuname;
                
            },
        },
        
        
        
        components:{
            homeHeader,
            homeFooter
        },
    }
</script>