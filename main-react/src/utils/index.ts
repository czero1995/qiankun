import {history as umiHistory} from 'umi'

export const qiankunJump = (url:string,name='页面名称',params = null) =>{
    window.__POWERED_BY_QIANKUN__ ? history.pushState(params,name,url): umiHistory.push(url)
}