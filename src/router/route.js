
import videoPlayer from "../components/videoPlayer/list"
import main from '@/components/home'

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
        name: 'main',
        component: main,
        children: childRoute,
        redirect:'/main/videoPlayer'    
    },
    {
        path: '*',
        redirect:'/main/videoPlayer'
    }
    
]

export default route