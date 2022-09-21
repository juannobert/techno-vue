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
        },
        abrirModal(id){
            this.buscarPorId(id);
            window.scrollTo({
                top : 0,
                behavior : "smooth"
            })


        },
        fecharModal({target,currentTarget}){
            /*
            console.log("Target: ",target)//Retorna o elemento clicado (Não precisa ser necessariamente a section)
            console.log("Current Target",currentTarget)//Retorna sempre a section (Elemento onde está o evento)
            */
           if(target === currentTarget) this.produto = false

        }
    },
    created(){
        this.listarProdutos()
    }
})