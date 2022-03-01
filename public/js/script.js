const comprasEl = document.querySelector('#comprasEl')
const loadingEl = document.querySelector('#loading')
const produtosEl = document.querySelector('#produtosEl')
let loading = false

//Compras
const getComprasFromBack = async() => {
    loading = true
    const res = await fetch('http://localhost:5000/compras')
    const data = await res.json()
    loading = false
    return data
}

const addComprasToDom = async() => {
    const compras = await getComprasFromBack()
    if (!loading) {
        loadingEl.innerHTML = ''
    }
    compras.forEach(compras => {
        const div = document.createElement('div')
        div.className = 'compras'
        div.innerHTML = `
        <h3>${compras.ID_da_compra}</h3>
        <ul>
        <li><strong>Descrição: </strong>${compras.Descricao}</li>
        <li><strong>Data da Compra: </strong>${compras.Data_da_compra}</li>
        <li><strong>Data do Envio: </strong>${compras.Data_do_envio}</li>
        </ul>
        <div class="tags"><strong>Data estimada de entrega: </strong>${compras.Data_estimada_de_entrega}</div>
        `
        comprasEl.appendChild(div)
    })
}
addComprasToDom()



//Refresh
function Atualizar() {
    window.location.reload();
}


//Produtos
const getProdutosFromBack = async() => {
    loading = true
    const res = await fetch('http://localhost:5000/produtos')
    const data = await res.json()
    loading = false
    return data
}

const addProdutosToDom = async() => {
    const produtos = await getProdutosFromBack()
    if (!loading) {
        loadingEl.innerHTML = ''
    }
    produtos.forEach(produtos => {
        const div = document.createElement('div')
        div.className = 'produtos'
        div.innerHTML = `
        <h3></strong>${produtos.nome}</h3>
        <ul>
        <li><strong>Descrição: </strong>${produtos.nome}</li>
        <li><strong>Estoque Atual: </strong>${produtos.estoqueAtual}</li>
        <li><strong>Estoque Minímo: </strong>${produtos.estoqueMin}</li>
        </ul>
        <div class="tags"><a><strong>Status: </strong>${produtos.status}</a></div>
        `
        produtosEl.appendChild(div)
    })
}

addProdutosToDom();
