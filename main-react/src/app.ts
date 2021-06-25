import LoadingComponent from '@/components/PageLoading';
import { dynamic } from 'umi';
const transRoutes = (routes) => {
  routes.forEach(item => {
    if(item.routes){
      return transRoutes(item.routes)
    }
    if(item.microName){
      item.component = dynamic({
        loader: (a) => import(/* webpackChunkName: 'layouts__MicroAppLayout' */ '@/layouts/MicroAppLayout'),
        loading: LoadingComponent,
      })
    }
  })
}

export function patchRoutes({ routes }) {
  transRoutes(routes[0].routes)
}
