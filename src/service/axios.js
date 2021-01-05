import axios from 'axios'
import { Message } from 'element-ui'
const CancelToken = axios.CancelToken
class HttpRequest {
  constructor () {
    this.queue = [] // 请求队列
  }

  /**
   * 对外暴露请求方法
   * @param {*Object} options 自定义配置项
   */
  request (options) {
    const instance = axios.create()
    const unionOptions = Object.assign(this.getInsideConfig(), options)
    // this.interceptors(instance, unionOptions.url)
    return instance(unionOptions)
  }

  // 默认设置
  getInsideConfig (headers) {
    const config = {
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, headers)
    }
    return config
  }

  // 状态200+成功请求
  succssRresponse(data, config) {
    // 各种处理
    if (data.success === true) {
      if (config.isQueue) {
        this.removeQueue(config)
      }
    } else {
      const errorDetail  = data
    console.log(errorDetail)

      // 请求成功没有值
      if (errorDetail.code === 'WB1100004') {
        if (config.isQueue) {
          this.removeQueue(config)
        }
      } else {
        const { message } = errorDetail
        if (message.startsWith('E')) {
          Message({
            type: 'error',
            title: '错误',
            message: message
          })
        } else if (message.startsWith('W')) {
          Message({
            type: 'warning',
            title: '警告⚠️',
            message: message
          })
        } else {
          Message({
            type: 'warning',
            title: '警告⚠️',
            message: message
          })
        }
      }
    }
  }

  token (config) {
    return `${config.url}_${config.method}`
  }

  removeQueue (config) {
    for (let i = 0, size = this.queue.length; i < size; i++) {
      const task = this.queue[i]
      if (task.token === this.token(config)) {
        task.cancel()
        this.queue.splice(i, 1)
      }
    }
  }

  // 统一拦截
  interceptors (instance) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      if (config.isQueue) {
        this.removeQueue(config)
        config.cancelToken = new CancelToken(c => {
          this.queue.push({ token: this.token(config), cancel: c })
        })
      }
      return config
    }, error => Promise.reject(error))

    // 响应拦截
    instance.interceptors.response.use(res => {
      // 随具体后端业务封装正确与错误处理--刷新refresh-token
      const { data, status } = res
      this.succssRresponse(data, res.config)
      return Promise.resolve({ data, status })
    }, (error) => {
      // 随具体后端业务封装错误处理
      return Promise.reject(error)
    })
  }
}
export default HttpRequest
