import Produto from "../modelo/produto";
import Entrada from "../io/entrada";

export default class ControlarProduto {
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\n---- Início do cadastro de produto ---- `);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do produto: `);
        let preco = this.entrada.receberNumero(`Por favor informe o preço do produto: `);

        let produto = new Produto();
        produto.nome = nome;
        produto.preco = preco;

        this.produtos.push(produto);

        console.log(`\n---- Cadastro de produto concluído ---- \n`);
    }

    public listarProdutos(): void {
        console.log(`\n---- Lista de todos os produtos ---- `);

        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1}- Nome: ${produto.nome}`);
            console.log(`Preço: R$${produto.preco.toFixed(2)}`);
        });

        console.log(`\n`);
    }

    public editarProduto(): void {
        console.log(`\n---- Início da edição de produto ----`);

        if (this.produtos.length === 0) {
            console.log('Ainda não há produtos cadastrados para editar.\n');
            return;
        }

        this.listarProdutos();

        let produtoIndex = this.entrada.receberNumero(
            `Escolha o número do produto que deseja editar (escolha 0 para sair): `
        );

        if (produtoIndex === 0) {
            console.log(`Edição de produtos cancelada\n`);
            return;
        }

        if (produtoIndex >= 1 && produtoIndex <= this.produtos.length) {
            let produtoParaEditar = this.produtos[produtoIndex - 1];

            console.log(
                `\nInformações atuais do produto "${produtoParaEditar.nome}":\n`
            );
            console.log(`1- Nome: ${produtoParaEditar.nome}`);
            console.log(`2- Preço: R$${produtoParaEditar.preco.toFixed(2)}`);

            let opcaoEdicao = this.entrada.receberNumero(
                `Escolha a opção de edição (1 para editar nome, 2 para editar preço): `
            );

            switch (opcaoEdicao) {
                case 1:
                    let novoNome = this.entrada.receberTexto(
                        `Informe o novo nome do produto: `
                    );
                    produtoParaEditar.nome = novoNome;
                    console.log(`---- Nome do produto atualizado com sucesso! ----\n`);
                    break;
                case 2:
                    let novoPreco = this.entrada.receberNumero(
                        `Informe o novo preço do produto: `
                    );
                    produtoParaEditar.preco = novoPreco;
                    console.log(`---- Preço do produto atualizado com sucesso! ----\n`);
                    break;
                default:
                    console.log(`Opção inválida. Nenhuma alteração feita.\n`);
                    break;
            }
        } else {
            console.log(`Número do produto inválido.\n`);
        }
    }

    public excluirProduto(): void {
        console.log(`\n---- Início da exclusão de produto ----`);

        if (this.produtos.length === 0) {
            console.log("Ainda não há produtos cadastrados para excluir.\n");
            return;
        }

        this.listarProdutos();

        let produtoIndex = this.entrada.receberNumero(
            `Escolha o número do produto que deseja excluir (escolha 0 para sair): `
        );

        if (produtoIndex === 0) {
            console.log(`---- Exclusão de produtos cancelada ---- \n`);
            return;
        }

        if (produtoIndex >= 1 && produtoIndex <= this.produtos.length) {
            this.produtos.splice(produtoIndex - 1, 1);
            console.log(`----- Produto excluído com sucesso! ----\n`);
        } else {
            console.log(`Número do produto inválido.\n`);
        }
    }
}
