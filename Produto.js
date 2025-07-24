class Produto {
  constructor(nome, preco, descricao, imagem) {
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
    this.imagem = imagem;
  }

    getNome() {
        return this.nome;
    }

    getPreco() {
        return this.preco;
    }

    getDescricao() {
        return this.descricao;
    }

    getImagem() {
        return this.imagem;
    }

    getProduto() {
        return {
        nome: this.nome,
        preco: this.preco,
        descricao: this.descricao,
        imagem: this.imagem
        };
    }

}


export default Produto;
