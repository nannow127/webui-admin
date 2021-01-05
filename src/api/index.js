import config from '@/config'
import fund from './api-config/text'

const commonDomainArray = [
  fund,
]

let urlObj = {}
for (let item of commonDomainArray) {
  item[Object.keys(item)[0]].domain = config.baseUrl
  // 全部整合到一个空对象里面
  Object.assign(urlObj, item)
}
const apiConfig = Object.assign(urlObj)

export default function getUrl(type, path, serve) {
  // console.log(type, path, serve,apiConfig)
  const env = 'dev'
  if (!serve) serve = 'default'
  // // console.log('serve', apiConfig[type].domain)
  return `${apiConfig[type].domain[env][serve]}/${apiConfig[type].path[path]}`
}
