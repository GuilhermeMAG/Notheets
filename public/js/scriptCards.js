const purshaseEl = document.querySelector('#purshaseEl')

// console.log(sessionStorage.id)

const ID = sessionStorage.id

document.getElementById("compra").innerHTML = ID;

//Compras
const getPurshaseFromBack = async() => {
    const response = await fetch(`http://localhost:5000/compras/000${ID}`)
    const data = await response.json()
    return data
}

const addPurshaseToDom = async() => {
    const purshase = await getPurshaseFromBack()
    console.log(purshase)
    const div = document.createElement('div')
    div.className = 'purshase'
    div.innerHTML = `
            <h3>${purshase.ID_da_compra}</h3>
            <ul>
            <li><strong>Descrição: </strong>${purshase.Descricao}</li>
            <li><strong>Data da Compra: </strong>${purshase.Data_da_compra}</li>
            <li><strong>Data do Envio: </strong>${purshase.Data_do_envio}</li>
            </ul>
            <div class="tags"><strong>Data estimada de entrega: </strong>${purshase.Data_estimada_de_entrega}</div>
            `
    purshaseEl.appendChild(div)

}
addPurshaseToDom()

//Refresh
function Atualizar() {
    window.location.reload();
}