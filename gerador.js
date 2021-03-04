function getUrl(){
    var text = document.querySelector("input#text").value
    var link1 = document.querySelector("input#link1").value
    var link2 = document.querySelector("input#link2").value
    var createDate = new Date().getTime()

    text = '"' + text + '"'
    link1 = '"' + link1 + '"'
    link2 = '"' + link2 + '"'

    var url = "https://limnuz.github.io/link.html?"
    var urlPar = window.btoa(`text=${text}&link1=${link1}&link2=${link2}&time=${createDate}`)
    //var urlPar = `text=${text}&link1=${link1}&link2=${link2}&time=${createDate}`
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
