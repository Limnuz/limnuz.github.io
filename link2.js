var url = document.URL.split('?')
url = url[0]+'?'+atob(url[1]) //tira btoa da url
url = jsURL(url)

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
    link = url.link2
    var visibleLink = document.querySelector("div#link")
    visibleLink.innerHTML = `<b>Link: </b><a href="${link}">${link} </a>`
}

//Pega os atributos da url
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

//https://limnuz.github.io/link.html?dGV4dD18fENMSVFVRSBBUVVJIFBBUkEgTElCRVJBUnx8JmxpbmsxPXx8aHR0cDovL3d3dy5nb29nbGUuY29tfHwmbGluazI9fHxodHRwOi8vd3d3LmR1Y2tkdWNrZ28uY29tfHwmdGltZT0xNjE1MDA1MDkyMTg2
//http://127.0.0.1:5500/link.html?dGV4dD18fENMSVFVRSBBUVVJIFBBUkEgTElCRVJBUnx8JmxpbmsxPXx8aHR0cDovL3d3dy5nb29nbGUuY29tfHwmbGluazI9fHxodHRwOi8vd3d3LmR1Y2tkdWNrZ28uY29tfHwmdGltZT0xNjE1MDA1MDkyMTg2