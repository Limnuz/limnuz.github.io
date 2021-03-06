// pega os parâmetros digitados pelo usuario, gera o link e coloca ncaixa de texto.
function generateUrl(){
    var text = document.querySelector("input#text").value
    var link1 = document.querySelector("input#link1").value
    var link2 = document.querySelector("input#link2").value
    var createDate = new Date().getTime()
    var separator = '||'

    text = separator + text + separator
    link1 = separator + link1 + separator
    link2 = separator + link2 + separator
    

    var url = "https://limnuz.github.io/link.html?"
    var urlPar = window.btoa(`text=${text}&link1=${link1}&link2=${link2}&time=${createDate}`)
    //var urlPar = `text=${text}&link1=${link1}&link2=${link2}&time=${createDate}`
    window.alert(url+urlPar)
    url += urlPar

    var result = document.querySelector("#result")
    result.innerHTML = url

    let copy = document.querySelector('#copy');
    copy.removeAttribute("disabled")
    copy.addEventListener('click', function(e) {
        result.removeAttribute('disabled')
        result.select();
        document.execCommand('copy');
        result.setAttribute('disabled','')
    })
    
}
















function copyUrl(){
    
}
