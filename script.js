var formulario = document.querySelector('form')

formulario.addEventListener('submit', function(e){

  // Nao dá refresh na pagina
  e.preventDefault()

  //url de pesquisa
  let urlForm = "https://pokeapi.co/api/v2/pokemon/"

  //valor do inpt name
  let nome = document.getElementById("name")
  
  //concatena a url com inputname
  urlForm = urlForm + this.name.value 

  //deixa os valores minusculos
  urlForm = urlForm.toLocaleLowerCase()

  //ID content
  let resposta = document.getElementById('content')

  //ID ImgPokemon
  let imagem = document.getElementById('imgPokemon')

  // resposta em HTML 
  let html  = ''

  fetch(urlForm)
    .then(resposta => resposta.json())
    .then(function(data) {
      console.log(data)
      html = 'nome: ' + maiuscula(data.name) + '<br>'
      html = html + 'Type: ' + maiuscula(data.types[0].type.name)
      resposta.innerHTML = html

      imagem.innerHTML = "<img src='"  + data.sprites.front_default + "'><img src='"  + data.sprites.back_default + "'>"
    })
    .catch(function(err){
      if(err == 'SyntaxError: Unexpected token N in JSON at position 0'){
        html = 'Pokemon não encontrado!'
      } else{
        html = 'Erro:' + err
      }
      resposta.innerHTML = html
    })
})

function maiuscula(val){
  return val[0].toUpperCase() + val.substr(1)
}