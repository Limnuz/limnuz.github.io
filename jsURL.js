//url = document.URL
//var url = 'https://limnuz.github.io/index.html?channel=##https://www.youtube.com/channel/UCwJchClzCtxlv8QFGH6pjRQ?sub_confirmation=1##&link=http://duckduckgo.com'
//var url = 'https://limnuz.github.io/index.html?channel=##https://www.youtube.com/channel/UCwJchClzCtxlv8QFGH6pjRQ?sub_confirmation=1##'



export default function jsURL(url, separator='||'){
    //separator: separador usado na URL para separar parâmetros que possam conter os caracteres "?", "&" e "="), por padão são aspas duplas, mas pode ser substituido por outros simbolos conforme necessidade
    
    if(url.indexOf("?") == -1){
        return {urlPage:url, purePage:url, containsParameter:false, infoString:`"urlPage":"url", "purePage":"url"`}
    }
    
    var urlPage = url
    url = url.split(separator)
    
    //codifica os atributos entre os separadores("")
    for(i in url){
        if(i%2 != 0){
            
            url[i] = separator + window.btoa(url[i]) + separator
            
        }
    }
    
    
    //Reune novamente a string depois de codificados os endereços
    var temp = ""
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
            
            temp += `"${url[i]}":"${window.atob(url[i+1].split(separator)[1])}",`
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

function teste1(){
    var body = document.body

    url = jsURL(url, "##")

    body.innerHTML = `${url.channel}<br> ${url.link} <br> ${url.infoString} <br> ${url.purePage} <br> ${url.urlPage}`
}