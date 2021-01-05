import HttpRequest from './axios'

const myAxios = new HttpRequest()

// myAxios.defaults.timeout = 30 * 1000
// myAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/**
 * getRequest => http get
 * @param url
 * @param params
 * @returns {*}
 */
export const getRequest = async (url, params, config = {}) => {
  try {
    let urlStr = url + `?${translateParams(params)}`
    let parameters = {
      url: params ? urlStr : url,
      method: 'get'
    }
    const data = await myAxios.request(parameters, config)
    return data.data
  } catch (error) {
    return errorHandler(error)
  }
}
/**
 * postRequest => http post
 * @param url
 * @param params
 * @returns {*}
 */
export const postRequest = async (url, params) => {
  try {
    let parameters = {
      url: url,
      method: 'post',
      data: params,
    }
    const data = await myAxios.request(parameters)
    return data.data
  } catch (error) {
    return errorHandler(error)
  }
}

/**
 * translate obj params to string with &
 * @param params
 * @returns {string}
 */
function translateParams (params) {
  let url = ''
  for (let param in params) {
    url += `${param}=${encodeURIComponent(params[param])}&`
  }
  return url.substring(0, url.length - 1)
}

export function errorHandler (e) {
  if (e && e.code === 'ECONNABORTED') {
    return { errorType: 'timeout' }
  } else {
    return { errorType: 'netw3232orkError' }
  }
}
