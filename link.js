var url = document.URL

url = url.split('?')
url = url[0]+'?'+ decodeURIComponent(url[1]) //tira btoa da url
url = jsURL(url)



var cookies = cookies() //recebe os cookies na forma de objeto JSON

var now = new Date().getTime()
var pastTime = now - Number(url.time)


if(pastTime < 864000000 || cookies.time == '1'){ 
    url = document.URL
    url = url.replace('nk.h', 'nk2.h')
    var noAf = document.getElementById('noAf')
    noAf.innerHTML= `<meta http-equiv="refresh" content="0; URL='${url}'"/>`
}

var link1 = document.querySelector("a#link1")
link1.setAttribute("href", url.link1) //atribui link do canal
link1.innerHTML = url.text



//habilita o botão que libera o link
function enableButton(){
    var btn = document.querySelector("input#getlink")
    btn.disabled = false
}

//mostra o link na tela
function getLink(){
    link =url.link2
    window.alert("OK   "+url.allCookies)
    linkA = 'loadlink.html' + '?link=' + link
    linkB ='http://adf.ly/22203685/' + linkA
    

    var visibleLink = document.querySelector("div#link")
    visibleLink.innerHTML = `<b>Link: </b><a href="${linkB}" target="_blank">${link} </a>`
}

//Pega os cookies e retorna em formato objeto JSON
function cookies(){
    var c = document.cookie
    if(c == '' || typeof c === 'undefined'){
        return {'allCookies':''}
    }
    var jasonCookies = c.split('; ')
    var jasonCookies2 = '{'
    for(var i in jasonCookies){
        var j = jasonCookies[i].split("=")
        jasonCookies2 += '"' + j[0] + '"' + ':' + '"' + j[1] + '"' + ','
    }
    jasonCookies = jasonCookies2.slice(0, jasonCookies2.length - 1) + '}'
    jasonCookies = JSON.parse(jasonCookies)
    jasonCookies.allCookies = c

    return jasonCookies
}

//Pega os atributos da url e rotorna em formato de objeto JSON
function jsURL(url, separator='||'){
    //separator: separador usado na URL para separar parâmetros que possam conter os caracteres "?", "&" e "="), por padão são aspas duplas, mas pode ser substituido por outros simbolos conforme necessidade
    
    if(url.indexOf("?") == -1){
        return {urlPage:url, purePage:url, containsParameter:false, infoString:`"urlPage":"url", "purePage":"url"`}
    }
    
    var urlPage = url
    url = url.split(separator)
    
    //codifica os atributos entre os separadores(||)
    for(var i in url){
        if(i%2 != 0){
            
            url[i] = separator + window.encodeURI(url[i]) + separator
            
        }
    }
    
    
    //Reune novamente a string depois de codificados os endereços
    var temp = ''
    for(let i in url){
        temp += url[i]
    }

    
    var purePage = temp.split("?")[0]
    url = temp.split("?")[1]
    
    temp = url.split("&")
    url = []
    for(let i in temp){
        let temp2 = temp[i].split("=")
        for(let j in temp2){
            url.push(temp2[j])
        }
    }

    
    
    //deixa os parametros em formato de texto para ser convertido em JSON
    temp = "{"
    for(let i = 0; i < url.length; i+=2){
        if(url[i+1].indexOf(separator) == -1){
            temp += `"${url[i]}":"${url[i+1]}",`
        } else {
            
            temp += `"${url[i]}":"${window.decodeURI(url[i+1].split(separator)[1])}",`
        }
    }
    
    temp = temp.substring(0, temp.length - 1) + "}"
    
    url = temp

    url = JSON.parse(url)
    url.urlPage = urlPage
    url.purePage = purePage
    url.infoString = temp
    url.containsParameters = true
    

    return url
}
/*
https://limnuz.github.io/link.html?dGV4dD18fENMSVFVRSBBUVVJIFBBUkEgTElCRVJBUnx8JmxpbmsxPXx8aHR0cDovL3d3dy5nb29nbGUuY29tfHwmbGluazI9fHxodHRwOi8vd3d3LmR1Y2tkdWNrZ28uY29tfHwmdGltZT0xNjE1MDA1MDkyMTg2

http://127.0.0.1:5500/link.html?dGV4dD18fENMSVFVRSBBUVVJIFBBUkEgTElCRVJBUnx8JmxpbmsxPXx8aHR0cDovL3d3dy5nb29nbGUuY29tfHwmbGluazI9fHxodHRwOi8vd3d3LmR1Y2tkdWNrZ28uY29tfHwmdGltZT0xNjE1MDA1MDkyMTg2

https://limnuz.github.io/link.html?dGV4dD18fG1haXMgZGUgMTAgZGlhc3x8JmxpbmsxPXx8aHR0cDovL3d3dy5nb29nbGUuY29tLmJyfHwmbGluazI9fHxodHRwOi8vd3d3LmdpdGh1Yi5jb218fCZ0aW1lPTE2MTQyMDU4MjM0NTc=

http://127.0.0.1:5500/link.html?dGV4dD18fG1haXMgZGUgMTAgZGlhc3x8JmxpbmsxPXx8aHR0cDovL3d3dy5nb29nbGUuY29tLmJyfHwmbGluazI9fHxodHRwOi8vd3d3LmdpdGh1Yi5jb218fCZ0aW1lPTE2MTQyMDU4MjM0NTc=

{"Nome":"Marcelo"," sobrenome":"Lima"," pub_22203685":"2*1615248627649"," nome":"ola"," idade":"2"," time":"1"}


https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqblRjUVpnd0sxaHFvb3huSlhscnh3dkhaV21mUXxBQ3Jtc0ttSkVIUXdNMldORXJTeWJyQ19kblpid0NURUszNkVBT0R3MHA4bmd1alpRVVQ5b1ZGWGZCbmIzbm90SUN1M3BDV2VLT1BjdW1BYnc2U2pSajJqUmo5ZVdQTTBlUy1uLXlONE9nWEZlXzFjd0tKQ0RFTQ&q=https%3A%2F%2Flimnuz.github.io%2Flink.html%3FdGV4dD18fENMSVFVRSBBUVVJIEUgU0UgSU5TQ1JFVkEgTk8gQ0FOQUwgUEFSQSBMSUJFUkFSIE8gTElOSy4gTWVzbW8gc2Ugdm9j6iBu428gcXVpc2VyIHNlIGluc2NyZXZlciBzZXLhIGxpYmVyYWRvLnx8JmxpbmsxPXx8aHR0cHM6Ly93d3cueW91dHViZS5jb20vY2hhbm5lbC9VQ0MtbDFwLWk0MndDczZMOVN0UFZ5Wmc%2Fc3ViX2NvbmZpcm1hdGlvbj0xfHwmbGluazI9fHxodHRwczovL2ltYWdlZ2xhc3Mub3JnL3x8JnRpbWU9MTYxNTU5NTgyNTEzNA%3D%3D
*/
