const helpers = window.helpers || {}

helpers.updateElement = (el, content) => {
  el.innerHTML = content
}

helpers.paramify = object => {
  var encodedString = ''
  for (var prop in object) {
    if (object.hasOwnProperty(prop)) {
      if (encodedString.length > 0) {
        encodedString += '&'
      }
      encodedString += encodeURI(prop + '=' + object[prop])
    }
  }
  return encodedString
}

helpers.get = (url, params, next) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url + '?' + helpers.paramify(params))
  xhr.onload = function() {
    if (xhr.status === 200) {
      let data = xhr.responseText
      try {
        data = JSON.parse(xhr.responseText)
      } catch (e) {}
      next(data)
    }
  }
  xhr.send()
}
