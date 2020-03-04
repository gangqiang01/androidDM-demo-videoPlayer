
import videoPlayer from "../components/videoPlayer/list"
import main from '@/components/home'
import login from "../components/account/login"

let childRoute = [
    {
        path: 'videoPlayer',
        component: videoPlayer,
        name: 'videoPlayer',
        meta: {
            menuname: "videoPlayer"
        }
    },
    {
        path: '*',
        redirect:'videoPlayer'
    }
]
let route = [

    {
        path: '/',
        component: login,
        name: 'login',
        beforeEnter: (to, from, next) => {
            _g.doBeforeLoginout();
            next();
        }
    },
    {
        path: '/main',
        name: 'main',
        component: main,
        beforeEnter: (to, from, next) => {
            if(cookie.checkCookie("videoPlayerToken")){
                next()
            }else{
                _g.doBeforeLoginout();
                next("/")
            }
        },
        children: childRoute,
        redirect:'/main/videoPlayer',    
    },
    {
        path: '*',
        redirect:'/'
    }
    
]

export default route