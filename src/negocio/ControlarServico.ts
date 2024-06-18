import Servico from "../modelo/servico";
import Entrada from "../io/entrada";
export default class ControlarServico {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\n---- Início do cadastro de serviço ----`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do serviço: `);
        let preco = this.entrada.receberNumero(`Por favor informe o preço do serviço: `);

        let servico = new Servico();
        servico.nome = nome;
        servico.preco = preco;

        this.servicos.push(servico);

        console.log(`\n---- Cadastro de serviço concluído ----\n`);
    }

    public listarServicos(): void {
        console.log(`\n---- Lista de todos os serviços ----`);

        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1}-`);
            console.log(`Nome: ${servico.nome}`);
            console.log(`Preço: R$ ${servico.preco.toFixed(2)}`);
        });

        console.log(`\n`);
    }

    public editarServico(): void {
        console.log(`\nInício da edição de serviço`);

        if (this.servicos.length === 0) {
            console.log('Não há serviços cadastrados para editar.\n');
            return;
        }

        this.listarServicos();

        let servicoIndex = this.entrada.receberNumero(`Escolha o número do serviço que deseja editar (escolha 0 para sair): `);

        if (servicoIndex === 0) {
            console.log(`Edição de serviços cancelada\n`);
            return;
        }

        if (servicoIndex >= 1 && servicoIndex <= this.servicos.length) {
            let servicoParaEditar = this.servicos[servicoIndex - 1];

            console.log(`\nInformações atuais do serviço "${servicoParaEditar.nome}":\n`);
            console.log(`Nome: ${servicoParaEditar.nome}`);
            console.log(`Preço: R$ ${servicoParaEditar.preco.toFixed(2)}`);

            let opcaoEdicao = this.entrada.receberNumero(
                `Escolha a opção de edição (1 para editar nome, 2 para editar preço): `
            );

            switch (opcaoEdicao) {
                case 1:
                    let novoNome = this.entrada.receberTexto(`Informe o novo nome do serviço: `);
                    servicoParaEditar.nome = novoNome;
                    console.log(`---- Nome do serviço atualizado com sucesso! ----\n`);
                    break;
                case 2:
                    let novoPreco = this.entrada.receberNumero(`Informe o novo preço do serviço: `);
                    servicoParaEditar.preco = novoPreco;
                    console.log(`----- Preço do serviço atualizado com sucesso! ----\n`);
                    break;
                default:
                    console.log(`Opção inválida. Nenhuma alteração feita.\n`);
                    break;
            }
        } else {
            console.log(`Número do serviço inválido.\n`);
        }
    }

    public excluirServico(): void {
        console.log(`\nInício da exclusão de serviço`);

        if (this.servicos.length === 0) {
            console.log('Ainda não há serviços cadastrados para excluir.\n');
            return;
        }

        this.listarServicos();

        let servicoIndex = this.entrada.receberNumero(`Escolha o número do serviço que deseja excluir (escolha 0 para sair): `);

        if (servicoIndex === 0) {
            console.log(`Exclusão de serviços cancelada\n`);
            return;
        }

        if (servicoIndex >= 1 && servicoIndex <= this.servicos.length) {
            let servicoParaExcluir = this.servicos[servicoIndex - 1];

            console.log(`\nInformações do serviço "${servicoParaExcluir.nome}" que será excluído:\n`);
            console.log(`Nome: ${servicoParaExcluir.nome}`);
            console.log(`Preço: R$ ${servicoParaExcluir.preco.toFixed(2)}`);

            let confirmacao = this.entrada.receberTexto(`Deseja confirmar a exclusão? (s para sim, n para não): `);

            if (confirmacao.toLowerCase() === 's') {
                this.servicos.splice(servicoIndex - 1, 1);
                console.log(`Serviço excluído com sucesso.\n`);
            } else {
                console.log(`Exclusão cancelada.\n`);
            }
        } else {
            console.log(`Número de serviço inválido.`);
        }
    }
}