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
                <div class="headerId">
                <h1>${purshase.ID_da_compra}</h1>
                </div>
            <br>
                <div class="inputBox">
                <label for="_descricao">Descrição:</label>
                <input type="text" name="descricao" id="_descricao" autocomplete="on" value="${purshase.Descricao}" required>
                </div>
            <br><br>
                <div class="inputBox">
                <label for="data_compra"><b>Data da Compra:</b></label>
                <input type="date" name="compra" id="data_compra" value="${purshase.Data_da_compra}" required>
                </div>
            <br><br>
                <div class="inputBox">
                <label for="data_do_envio"><b>Data do envio:</b></label>
                <input type="date" name="envio" id="data_do_envio" value="${purshase.Data_do_envio}" required>
                </div>
            <br><br>
                <div class="inputBox">
                <label for="data_estimada_de_entrega"><b>Data estimada de entrega:</b></label>
                <input type="date" name="entrega" id="data_estimada_de_entrega" value="${purshase.Data_estimada_de_entrega}" required>
                </div>
            <br><br>
            <div class="controls">
                <button class="editCardButton" style="font-size:30px" onclick="Atualizar()">
                    <i class="fa fa-undo"></i></button>
                <button class="editCardButton" style="font-size:30px" onclick="document.location='../index.html'">
                    <i class="fa fa-chevron-left"></i></button>
                <button class="editCardButton" style="font-size:30px" onclick="document.location='../index.html'">
                    <i class="fa fa-share-square-o"></i></button>
                <button class="editCardButton" style="font-size:30px" onclick="document.location='../index.html'">
                    <i class="fa fa-check-square-o"></i></button>
            </div>
            `
    purshaseEl.appendChild(div)

}
addPurshaseToDom()

//Refresh
function Atualizar() {
    window.location.reload();
}