var url = document.URL
var link = window.btoa(getURLs(url)[1])  //tirar btoa() da versão final
var channel = window.btoa(getURLs(url)[0])  //tirar btoa() da versão final


var linkChannel = document.querySelector("a#channel")
linkChannel.setAttribute("href", window.atob(channel)) //atribui link do canal

//habilita o botão que libera o link
function enableButton(){
    var btn = document.querySelector("input#getlink")
    btn.disabled = false
}

//mostra o link na tela
function getLink(){
    link = atob(link)
    var visibleLink = document.querySelector("div#link")
    visibleLink.innerHTML = `<b>Link: </b><a href="${link}">${link} </a>`
}

//pega as duas urls envolvidas
function getURLs(url){
    url = url.split("?")
    url = url.slice(1, url.length)
    temp = ""
    for(i in url){
        temp += url[i]+"?"
    }
    url = temp.slice(0,temp.length-1)
    url = url.split("channel=")[1]
    url = url.split("&link=")
    //window.alert(url)
    return url    
}


//http://127.0.0.1:5500/index.html?channel=https://www.youtube.com/channel/UCwJchClzCtxlv8QFGH6pjRQ?sub_confirmation=1&link=http://duckduckgo.com
//file:///media/marcelo/Comum/projetos/javascript/inscricaoYT/index.html?channel=https://www.youtube.com/channel/UCwJchClzCtxlv8QFGH6pjRQ?sub_confirmation=1&link=http://duckduckgo.com
//https://limnuz.github.io/?channel=https://www.youtube.com/channel/UCwJchClzCtxlv8QFGH6pjRQ?sub_confirmation=1&link=http://duckduckgo.com