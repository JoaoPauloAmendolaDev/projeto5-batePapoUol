const botaoConfirmar = document.querySelector(".Confirmar")
const BarraLateral = document.querySelector(".BarraLateral")
const listaMensagens = document.querySelector(".ListaMensagens")
const InputMensagem = document.getElementById('mensagem')
const BotaoEnviarMensagem = document.querySelector(".EnviarMensagem")
let mensagemEnviada = InputMensagem.value
let mensagem
let objetoNome = {
    name:''}


SeuNome()


/*-------------------------------------------------INÍCIO DA FUNÇÃO PARA RECEBER O SEU NOME----------------------------------------*/
function SeuNome(){
    Usuario = prompt("Digite seu nome para acessar o chat: ")

    objetoNome = {
        name:Usuario}
    axios
    .post('https://mock-api.driven.com.br/api/v6/uol/participants',objetoNome)
    .then(NomeEnviado => console.log(NomeEnviado))
    .catch(erro => NomeInvalido())
}


function NomeInvalido(){
    alert('O nome que você digitou já está em uso, digite outro')
    SeuNome()
}
/*-------------------------------------------------FIM DA FUNÇÃO PARA RECEBER O SEU NOME----------------------------------------*/



/*-------------------------------------------------INÍCIO DA FUNÇÃO PARA MANTER CONECTADO----------------------------------------*/
setInterval(() => {
console.log('entrei no manter conexão')
    axios
    .post('https://mock-api.driven.com.br/api/v6/uol/status', objetoNome)
    .then(console.log('Conexão Mantida'))
    .catch(err => console.log(err))
    
}, 5000);
/*-------------------------------------------------FIM DA FUNÇÃO PARA MANTER CONECTADO----------------------------------------*/


function AbrirBarraLateral(){
    BarraLateral.classList.remove("Escondido")
}

function Confirmar(){
    console.log('Confirmei')
    BarraLateral.classList.add("Escondido")
}



setInterval(() => {
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then(mensagens => RodarMensagens(mensagens))
    .catch(mensagens => console.error(mensagens));

/*-------------------------------------------------INÍCIO DA FUNÇÃO PARA APARECEREM AS MENASGENS----------------------------------------*/
function RodarMensagens(mensagens){
    listaMensagens.innerHTML = ''
    mensagem = mensagens
    QuantidadeDasMensagens = mensagens.data.length
    let contador = 0
        while (contador < QuantidadeDasMensagens){
            if (mensagem.data[contador].type == 'status'){
                listaMensagens.innerHTML += `<li class='mensagemRecebida CorStatus Roboto'>(
                    ${mensagens.data[contador].time}) 
                    ${mensagens.data[contador].from}
                    ${mensagens.data[contador].text}</li>`
            }
            else if (mensagem.data[contador].type == 'message'){
                listaMensagens.innerHTML += `<li class='mensagemRecebida CorMensagensTodos Roboto'>(
                    ${mensagens.data[contador].time}) 
                    ${mensagens.data[contador].from} para
                    ${mensagens.data[contador].to}:
                    ${mensagens.data[contador].text}</li>`
            }
            else if (mensagem.data[contador].to !== 'Todos'){
                listaMensagens.innerHTML += `<li class='mensagemRecebida CorMensagensPrivadas Roboto'>(
                    ${mensagens.data[contador].time}) 
                    ${mensagens.data[contador].from} para
                    ${mensagens.data[contador].to}:
                    ${mensagens.data[contador].text}</li>`
            }
            else if (contador + 1 == QuantidadeDasMensagens){

            }

            contador += 1
        }
}
}, 3000);
/*-------------------------------------------------FIM DA FUNÇÃO PARA APARECEREM AS MENASGENS----------------------------------------*/    


function EnviarMensagem(){
    let mensagemEnviada = InputMensagem.value
    console.log(mensagemEnviada)
    axios
        .post('https://mock-api.driven.com.br/api/v6/uol/messages',{
            from: Usuario,
            to: 'Todos',
            text: mensagemEnviada,
            type: 'message'
        })
        .then()
        .catch()
    InputMensagem.value = ''
    }