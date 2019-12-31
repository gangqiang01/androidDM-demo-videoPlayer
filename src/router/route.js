
import player from "../components/videoPlayer/list"
import main from '@/components/home'

let childRoute = [

    {
        path: 'player/list',
        component: player,
        name: 'playerList',
        meta: {
            menuname: "playerList"
        }
    },
    {
        path: '*',
        redirect:'player/list'
    }
]
let route = [

    {
        path: '/',
        name: 'main',
        component: main,
        children: childRoute,
        redirect:'/main/player/list'    
    },
    {
        path: '*',
        redirect:'/'
    }
    
]

export default route