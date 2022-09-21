const vue = new Vue({
    el: "#app",
    data : {
        produtos : []
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
        }
    },
    created(){
        this.listarProdutos()
    }
})