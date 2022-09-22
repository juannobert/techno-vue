const vue = new Vue({
    el: "#app",
    data : {
        produtos : [],
        produto : false,
        carrinho : [],
        mensagemAlerta : "Mensagem adicionada",
        alertaAtivo : false
    },
    filters:{
        numPreco(valor){
            return valor.toLocaleString("pt-BR", {style:"currency", currency : "BRL"})
        }
    },
    computed:{
        carrinhoTotal(){
            let total = 0;
            if(this.carrinho.length){
               this.carrinho.forEach(item => {
                total += item.preco 
                }); 
            }
            
            return total
        }

    },
    watch:{
        
        carrinho(){
            //JSON.stringify: Connveter objeto para string
            window.localStorage.carrinho = JSON.stringify(this.carrinho)//Salvando no local storage
        },
        produto(){
            document.title = this.produto.nome || "Techno"
            const hash = this.produto.id || ""
            history.pushState(null,null,`#${hash}`) //Altera hash da URL
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

        },
        adicionarItem(){
            this.produto.estoque--;
            const {id,nome,preco} = this.produto; //Desestruturando produto
            this.carrinho.push({id,nome,preco})//Adiciona id,nome e preço em forma de objeto
            this.alerta(`${nome} adicionado ao carrinho`)
        },
        removerItem(index){
            this.carrinho.splice(index,1) //Recebe posição e qtd de elementos a remover
        },
        checarLocalStorage(){
            //JSON.parse Transforma o valor recebido para o tipo inicial, no caso um array
            if(window.localStorage.carrinho) 
                this.carrinho = JSON.parse(window.localStorage.carrinho)

        },
        alerta(mensagem){
            this.mensagemAlerta = mensagem;
            this.alertaAtivo = true;
            setTimeout(() =>{
                this.alertaAtivo = false
            },1500)
        },
        router(){
            const hash = document.location.hash
            if(hash){
                this.abrirModal(hash.replace("#",""))
            }
        }

    },
    created(){
        this.listarProdutos()
        this.checarLocalStorage()
        this.router()
    }
})