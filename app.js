const vue = new Vue({
    el: "#app",
    data : {
        produtos : []
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