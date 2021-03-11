var url = document.URL
url = url.split('link=')[1]
url = decodeURIComponent(url)

var load = document.createElement('meta')
load.setAttribute('http-equiv', 'refresh')
load.setAttribute('content', `5 URL=${url}`)

document.head.appendChild(load)