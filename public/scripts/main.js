import  Modal  from './modal.js'

const modal = Modal()

//Mapeando conteudo das tags da modalwrapper
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

//Abrir a modal ao clicar em Marcar como lido

//Pegar todos os botões que existe com a classe check
//Mapear todos os botões que existe com a classe check
const checkButtons = document.querySelectorAll(".actions a.check")


/*primeira forma, primeiro exemplo*/
///////////////////////////////////////////////////////////////////////
/*checkButtons.forEach(button => {
    //capturando click
    button.addEventListener("click",event =>{
         
        modalTitle.innerHTML = "Marcar como lida"

        //Abrir modal
         modal.open()

    })
})


//Abrir a modal ao clicar em Excluir

//Mapear todos os botões que existe com a classe delete
const deleteButton = document.querySelectorAll(".actions a.delete")

deleteButton.forEach(button => {
    button.addEventListener("click", event =>{
        
        modalTitle.innerHTML = "Excluir essa pergunta"
        
        modal.open()
    })
}) */
/////////////////////////////////////////////////////////////////////////////////


/*segunda forma segundo exemplo*/

checkButtons.forEach(button => {
    button.addEventListener("click",handleClick)
})

const deleteButton = document.querySelectorAll(".actions a.delete")

deleteButton.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false))
}) 
 
function handleClick(event, check = true){

    event.preventDefault() //remove # do endereço http://localhost:3000/room#
    
    //se o chack for true "Marcar como lida " se não "Excluir "
    const text = check ? "Marcar como lida " : "Excluir "

    const slug = check ? "check" : "delete"

    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id
    
    //pegando/selecionando o form
    const form = document.querySelector(".modal form")
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`) //crase chama-se templat string

    //modalTitle.innerHTML = text + "esta pergunta?"
    modalTitle.innerHTML = `${text} esta pergunta`
    modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red")
    modal.open()
}