// pega os parâmetros digitados pelo usuario, gera o link e coloca ncaixa de texto.
function generateUrl(){
    var text = document.querySelector("textarea#text").value
    var link1 = document.querySelector("input#link1").value
    var link2 = document.querySelector("input#link2").value
    var createDate = new Date().getTime()
    var separator = '||'
    
    setCookie(createDate)

    text = separator + text + separator
    link1 = separator + link1 + separator
    link2 = separator + link2 + separator
    

    var url = "https://limnuz.github.io/link.html?"
    var urlPar = encodeURIComponent(`text=${text}&link1=${link1}&link2=${link2}&time=${createDate}`)
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

//Recebe time no formato Unix(Date().getTime(), e passa isso para um cookie com 1 ano de validade.)
function setCookie(time, expiration = 31536000000){
    time += expiration
    var time = new Date(time).toUTCString()
    document.cookie = `time=1; expires=${time}; path=/`
    document.cookie = "Nome=Marcelo; expires=${time}; path=/"
    document.cookie = "sobrenome = Lima; expires=${time}; path=/"   
}
