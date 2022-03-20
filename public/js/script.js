const loadingEl = document.querySelector('#loading')
const purshasesEl = document.querySelector('#purshasesEl')
const productsEl = document.querySelector('#productsEl')
let loading = false

//Compras
const getPurshasesFromBack = async() => {
    loading = true
    const res = await fetch('http://localhost:5000/compras')
    const data = await res.json()
    loading = false
    return data
}

const addPurshasesToDom = async() => {
    const purshases = await getPurshasesFromBack()
    if (!loading) {
        loadingEl.innerHTML = ''
    }
    purshases.forEach(purshases => {
        const div = document.createElement('div')
        div.className = 'purshases'
        div.innerHTML = `
            <h3>${purshases.ID_da_compra}</h3>
            <ul>
            <li><strong>Descrição: </strong>${purshases.Descricao}</li>
            <li><strong>Data da Compra: </strong>${purshases.Data_da_compra}</li>
            <li><strong>Data do Envio: </strong>${purshases.Data_do_envio}</li>
            </ul>
            <div class="tags"><strong>Data estimada de entrega: </strong>${purshases.Data_estimada_de_entrega}</div>
            `
        purshasesEl.appendChild(div)
    })
}
addPurshasesToDom()

//Refresh
function Atualizar() {
    window.location.reload();
}

//Produtos
const getProductsFromBack = async() => {
    loading = true
    const res = await fetch('http://localhost:5000/produtos')
    const data = await res.json()
    loading = false
    return data
}

const addProductsToDom = async() => {
    const products = await getProductsFromBack()
    if (!loading) {
        loadingEl.innerHTML = ''
    }
    products.forEach(products => {
        const div = document.createElement('div')
        div.className = 'products'
        div.innerHTML = `
            <h3></strong>${products.nome}</h3>
            <ul>
            <li><strong>Descrição: </strong>${products.nome}</li>
            <li><strong>Estoque Atual: </strong>${products.estoqueAtual}</li>
            <li><strong>Estoque Minímo: </strong>${products.estoqueMin}</li>
            </ul>
            <div class="tags"><a><strong>Status: </strong>${products.status}</a></div>
            `
        productsEl.appendChild(div)
    })
}
addProductsToDom()