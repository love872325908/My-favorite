import fetch from 'dva/fetch';

 const ajaxRoot = 'https://data.api.ppkao.com/';
 // const ajaxRoot = 'http://192.168.1.180:8081';

function _decode(str) {
  const res = Buffer.from(str, 'base64').toString();
  return res;
}

function decode(obj) {
  const res = {};
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (Array.isArray(val)) {
      res[key] = [];
      val.forEach((item) => {
        res[key].push(decode(item));
      })
    } else if (val instanceof Object) {
      res[key] = decode(val);
    } else {
      res[key] = _decode(val);
    }
  });
  return res;
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function get({url, ...params}) {
  for (const key of Object.keys(params)) {
    url = `${url}&${key}=${params[key]}`;
  }
  url = url.replace('&', '?');
  url = `${ajaxRoot}${url}`;
  console.log(url)
  return fetch(url)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({data: decode(data)}))
    .catch(err => ({err}));
}
export function GetRequest() {
  var url = location.hash; //获取url中"?"符后的字串
  var theRequest = new Object();
  let strs;
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  console.log(url,theRequest)

  return theRequest;
}
// 根据索引位置删除数组元素
Array.prototype.del = function (index) {
  if (isNaN(index) || index >= this.length) {
    return false;
  }
  for (var i = 0, n = 0; i < this.length; i++) {
    if (this[i] != this[index]) {
      this[n++] = this[i];
    }
  }
  this.length -= 1;
};
//插入元素到数组指定位置
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};
// 数组去重
Array.prototype.quChong = Array.prototype.quChong || function(){
  console.log('去重')
  return [...new Set(this)];
}

