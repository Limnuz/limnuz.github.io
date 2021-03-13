var url = document.URL
url = url.split('?')
url = url[0]+'?'+ decodeURIComponent(url[1])

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
link1.innerHTML = replaceAll(url.text, '+', ' ')

//habilita o botão que libera o link
function enableButton(){
    var btn = document.querySelector("input#getlink")
    btn.disabled = false
}

//mostra o link na tela
function getLink(){
    link =url.link2
    linkA = 'https://limnuz.github.io/loadlink.html' + '?link=' + link   
    linkB ='http://adf.ly/22203685/' + linkA
    

    var visibleLink = document.querySelector("div#link")
    visibleLink.innerHTML = `<b>Link: </b><a href="${linkB}" target="_blank">${link} </a>`
}

// substitui todas as ocorrências de um determinado termo em uma string.
function replaceAll(str, before, later){
    while(str.indexOf(before) != -1){
        str = str.replace(before, later)
    }

    return str
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
            
            url[i] = separator + window.encodeURIComponent(url[i]) + separator
            
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
            
            temp += `"${url[i]}":"${window.decodeURIComponent(url[i+1].split(separator)[1])}",`
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
