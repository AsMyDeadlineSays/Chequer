import Scan from '@/src/components/views/Scan/Scan.vue'
import ToBuy from '@/src/components/views/ToBuy/ToBuy.vue'
import Invite from '@/src/components/views/Invite/Invite.vue'
import History from '@/src/components/views/History/History.vue'


const routes = [{
    path: '/',
    component: ToBuy 
  }, {
    path: '/scan',
    component: Scan 
  }, {
    path: '/invite',
    component: Invite 
  }, {
    path: '/history',
    component: History 
  }
]


export default routes