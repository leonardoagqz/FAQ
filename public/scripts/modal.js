export default function Modal(){
    
    const modalWrapper = document.querySelector('.modal-wrapper')

    //capturar quando o cancelar for clicado
    const cancelButton = document.querySelector('.button.cancel')

    //quando for clicado será executado o método cancel.button
    cancelButton.addEventListener("click", close)

    function open(){
        //funcionalidades de atribuir a classe active para modal

        //pegando a model-wrapper e adicionando uma nova classe active
        modalWrapper.classList.add("active")
    }
    function close(){
        //funcionalidade de remover a classe active da modal
        modalWrapper.classList.remove("active")
    }

    return{
        open,
        close
    }
}