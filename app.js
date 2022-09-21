const vue = new Vue({
    el: "#app",
    data : {
        produtos : [],
        produto : false
    },
    filters:{
        numPreco(valor){
            return valor.toLocaleString("pt-BR", {style:"currency", currency : "BRL"})
        }
    },
    methods:{
        async listarProdutos(){
            let response = await fetch("./api/produtos.json")
            let json = await response.json()
            this.produtos = json;
        },
        async buscarPorId(id){
            let response = await fetch(`./api/produtos/${id}/dados.json`)
            let json = await response.json()
            this.produto = json;
        }
    },
    created(){
        this.listarProdutos()
    }
})