import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import RG from "../modelo/rg";
import Telefone from "../modelo/telefone";
import Cadastro from "./cadastro";
import Pet from "../modelo/pet";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";

export default class ControlarCliente extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;
    private produtosDisponiveis: Array<Produto>;
    private servicosDisponiveis: Array<Servico>;
    private petsCadastrados: Array<Pet>;

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>, pets: Array<Pet>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
        this.produtosDisponiveis = produtos;
        this.servicosDisponiveis = servicos;
        this.petsCadastrados = pets;
    }

    public cadastrar(): void {
        console.log(`\n---- Cadastro do cliente ----`);
        
        let nome = this.entrada.receberTexto(`Por favor, informe o nome do cliente: `);
        let nomeSocial = this.entrada.receberTexto(`Por favor, informe o nome social do cliente: `);
        
        let valorCPF = this.entrada.receberTexto(`Por favor, informe o CPF: `);
        let dataEmissaoCPF = this.entrada.receberTexto(`Por favor, informe a data de emissão do CPF, no padrão dd/mm/yyyy: `);
        let partesDataCPF = dataEmissaoCPF.split('/');
        let anoCPF = new Number(partesDataCPF[2].valueOf()).valueOf();
        let mesCPF = new Number(partesDataCPF[1].valueOf()).valueOf();
        let diaCPF = new Number(partesDataCPF[0].valueOf()).valueOf();
        let dataEmissao = new Date(anoCPF, mesCPF - 1, diaCPF);
        
        let cpf = new CPF(valorCPF, dataEmissao);
        
        let dataCadastroTexto = this.entrada.receberTexto(`Por favor, informe a data de cadastro, no padrão dd/mm/yyyy: `);
        let partesDataCadastro = dataCadastroTexto.split('/');
        let anoCadastro = new Number(partesDataCadastro[2].valueOf()).valueOf();
        let mesCadastro = new Number(partesDataCadastro[1].valueOf()).valueOf();
        let diaCadastro = new Number(partesDataCadastro[0].valueOf()).valueOf();
        let dataCadastro = new Date(anoCadastro, mesCadastro - 1, diaCadastro);

        let cliente = new Cliente(nome, nomeSocial, cpf, dataCadastro);
    
        let valorRG = this.entrada.receberTexto(`Informe o RG: `);
        let dataEmissaoRG = this.entrada.receberTexto(`Informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
        let partesDataRG = dataEmissaoRG.split('/');
        let anoRG = new Number(partesDataRG[2].valueOf()).valueOf();
        let mesRG = new Number(partesDataRG[1].valueOf()).valueOf();
        let diaRG = new Number(partesDataRG[0].valueOf()).valueOf();
        let dataEmissaoRg = new Date(anoRG, mesRG - 1, diaRG);
        
        let rg = new RG(valorRG, dataEmissaoRg);
        cliente.addRG(rg);   
                 
        let adicionarTelefones = this.entrada.receberTexto(`Deseja adicionar telefones? (s para sim, n para não): `);
        while (adicionarTelefones.toLowerCase() === 's') {
            let ddd = this.entrada.receberTexto('Informe o DDD: ');
            let numero = this.entrada.receberTexto('Informe o número do telefone: ');
            let telefone = new Telefone(ddd, numero);
            cliente.addTelefone(telefone);

            adicionarTelefones = this.entrada.receberTexto(`Deseja adicionar mais telefones? (s para sim, n para não): `);
        }
    
    
        let adicionarProdutos = this.entrada.receberTexto(`Deseja adicionar produtos consumidos? (s para sim, n para não): `);
        while (adicionarProdutos.toLowerCase() === 's') {
            let nomeProduto = this.entrada.receberTexto(`Informe o nome do produto consumido: `);

            let produtoExistente = this.produtoExiste(nomeProduto);
            if (!produtoExistente) {
                console.log(`Produto "${nomeProduto}" não encontrado. Certifique-se de cadastrar o produto primeiro.`);
            } else {
                cliente.getProdutosConsumidos.push(produtoExistente);
            }

            adicionarProdutos = this.entrada.receberTexto(`Deseja adicionar mais produtos consumidos? (s para sim, n para não): `);
        }
    
        let adicionarServicos = this.entrada.receberTexto(`Deseja adicionar serviços consumidos? (s para sim, n para não): `);
        while (adicionarServicos.toLowerCase() === 's') {
            let nomeServico = this.entrada.receberTexto(`Informe o nome do serviço consumido: `);

            let servicoExistente = this.servicoExiste(nomeServico);
            if (!servicoExistente) {
                console.log(`Serviço "${nomeServico}" não encontrado. Certifique-se de cadastrar primeiro.`);
            } else {
                cliente.getServicosConsumidos.push(servicoExistente);
            }

            adicionarServicos = this.entrada.receberTexto(`Deseja adicionar mais serviços consumidos? (s para sim, n para não): `);
        }

        let adicionarPets = this.entrada.receberTexto(`Deseja adicionar pets? (s para sim, n para não): `);
        while (adicionarPets.toLowerCase() === 's') {
            let nomePet = this.entrada.receberTexto(`Informe o nome do pet: `);
            let racaPet = this.entrada.receberTexto('Informe a raça: ');
            let generoPet = this.entrada.receberTexto('Informe o gênero: ');
            let tipoPet = this.entrada.receberTexto('Informe o tipo: ');

            let petExistente = this.petExiste(nomePet);
            if (!petExistente) {
                let novoPet = new Pet(nomePet, racaPet, generoPet, tipoPet);
                this.petsCadastrados.push(novoPet);
                cliente.getPets.push(novoPet);
            } else {
                cliente.getPets.push(petExistente);
            }

            adicionarPets = this.entrada.receberTexto(`Deseja adicionar mais pets? (s para sim, n para não): `);
        }
    
        this.clientes.push(cliente);
        console.log(`\n---- Cadastro concluído ----)\n`);
    }

    private produtoExiste(nomeProduto: string): Produto | undefined {
        return this.produtosDisponiveis.find(produto => produto.nome === nomeProduto);
    }

    private servicoExiste(nomeServico: string): Servico | undefined {
        return this.servicosDisponiveis.find(servico => servico.nome === nomeServico);
    }

    private petExiste(nomePet: string): Pet | undefined {
        return this.petsCadastrados.find(pet => pet.getNome === nomePet);
    }

    public editarCliente(): void {
        console.log(`\n---- Início da edição de cliente ----`);

        if (this.clientes.length === 0) {
            console.log("Não há clientes cadastrados ainda.\n");
            return;
        }

        this.listarNomes();

        let clienteIndex = this.entrada.receberNumero(`Escolha o número do cliente que deseja editar (escolha 0 para sair): `);

        if (clienteIndex === 0) {
            console.log(`Edição de clientes cancelada.\n`);
            return;
        }

        if (clienteIndex >= 1 && clienteIndex <= this.clientes.length) {
            let clienteParaEditar = this.clientes[clienteIndex - 1];

            console.log(`\n ---- Informações atuais do cliente ---- "${clienteParaEditar.nome}":\n`);

            console.log("Campos para edição:");
            console.log("1- Nome");
            console.log("2- Nome Social");

            let opcaoEdicao = this.entrada.receberNumero(`Digite o número do campo que deseja editar: `);

            switch (opcaoEdicao) {
                case 1:
                    let novoNome = this.entrada.receberTexto(`Informe o novo nome do cliente: `);
                    clienteParaEditar.nome = novoNome;
                    break;
                case 2:
                    let novoNomeSocial = this.entrada.receberTexto(`Informe o novo nome social do cliente: `);
                    clienteParaEditar.nomeSocial = novoNomeSocial;
                    break;
                default:
                    console.log("Opção inválida.");
                    break;
            }

            console.log(`\nInformações atualizadas do cliente "${clienteParaEditar.nome}":\n`);
            console.log(`Nome: ${clienteParaEditar.nome}`);
            console.log(`Nome Social: ${clienteParaEditar.nomeSocial}`);
        } else {
            console.log(`Número de cliente inválido.`);
        }

        console.log(`\nEdição de cliente concluída :)\n`);
    }

    private listarNomes(): void {
        console.log(`\nLista de todos os clientes:`);

        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1}- ${cliente.nome}`);
        });

        console.log(`\n`);
    }

    public excluirCliente(): void {
        console.log(`\nInício da exclusão de cliente`);
    
        if (this.clientes.length === 0) {
            console.log("Não há clientes cadastrados para excluir.\n");
            return;
        }
    
        this.listarNomes();
    
        let clienteIndex = this.entrada.receberNumero(`Escolha o número do cliente que deseja excluir (escolha 0 para sair): `);
    
        if (clienteIndex === 0) {
            console.log(`Exclusão de clientes cancelada\n`);
            return;
        }
    
        if (clienteIndex >= 1 && clienteIndex <= this.clientes.length) {
            let clienteParaExcluir = this.clientes[clienteIndex - 1];
    
            console.log(`\nInformações do cliente "${clienteParaExcluir.nome}" que será excluído:\n`);
            console.log(`Nome: ${clienteParaExcluir.nome}`);
            console.log(`Nome Social: ${clienteParaExcluir.nomeSocial}`);
            console.log(`CPF: ${clienteParaExcluir.getCpf.getValor}`);
    
            let confirmacao = this.entrada.receberTexto(`Deseja confirmar a exclusão? (s para sim, n para não): `);
    
            if (confirmacao.toLowerCase() === 's') {
                this.clientes.splice(clienteIndex - 1, 1);
                console.log(`Cliente excluído com sucesso.\n`);
            } else {
                console.log(`Exclusão cancelada.\n`);
            }
        } else {
            console.log(`Número de cliente inválido.`);
        }
    }                                                                     

    public listarProdutosServicosConsumidos(): void {
        console.log(`\nInício da listagem de produtos e serviços consumidos por cliente`);

        if (this.clientes.length === 0) {
            console.log("Ainda não há clientes cadastrados para listar produtos e serviços consumidos.\n");
            return;
        }

        this.listarNomes();

        let clienteIndex = this.entrada.receberNumero(`Escolha o número do cliente para listar produtos e serviços consumidos (0 para sair): `);

        if (clienteIndex === 0) {
            console.log(`Saindo da listagem de produtos e serviços consumidos.\n`);
            return;
        }

        if (clienteIndex >= 1 && clienteIndex <= this.clientes.length) {
            let clienteSelecionado = this.clientes[clienteIndex - 1];

            console.log(`\n---- Lista de produtos e serviços consumidos pelo cliente ${clienteSelecionado.nome} ----\n`);

            this.listarProdutosConsumidos(clienteSelecionado);
            this.listarServicosConsumidos(clienteSelecionado);

            console.log(`\n ---- Listagem concluída para o cliente ${clienteSelecionado.nome} ---- \n`);
        } else {
            console.log(`Número de cliente inválido.`);
        }
    }

    private listarProdutosConsumidos(cliente: Cliente): void {
        console.log(`\n Produtos consumidos:`);

        if (cliente.getProdutosConsumidos.length === 0) {
            console.log(`Nenhum produto consumido por este cliente.`);
        } else {
            cliente.getProdutosConsumidos.forEach(produto => {
                console.log(`- ${produto.nome}`);
            });
        }
    }

    private listarServicosConsumidos(cliente: Cliente): void {
        console.log(`\n Serviços consumidos:`);

        if (cliente.getServicosConsumidos.length === 0) {
            console.log(`Nenhum serviço consumido ainda por este cliente.`);
        } else {
            cliente.getServicosConsumidos.forEach(servico => {
                console.log(`- ${servico.nome}`);
            });
        }
    }

    public listarTopClientes(): void {
        console.log(`\n ---- Início da listagem dos top 10 clientes que mais consumiram produtos ou serviços em quantidade ---- `);
    
        if (this.clientes.length === 0) {
            console.log("Não há clientes cadastrados para listar.\n");
            return;
        }
    
        const clientesOrdenados = this.clientes.sort((clienteA, clienteB) => {
            const totalConsumidoA = clienteA.getProdutosConsumidos.length + clienteA.getServicosConsumidos.length;
            const totalConsumidoB = clienteB.getProdutosConsumidos.length + clienteB.getServicosConsumidos.length;
    
            return totalConsumidoB - totalConsumidoA;
        });
    
        const topClientes = clientesOrdenados.slice(0, 10);
    
        console.log(`\n---- Lista dos 10 clientes que mais consumiram produtos ou serviços ----\n`);
    
        topClientes.forEach((cliente, index) => {
            const totalConsumido = cliente.getProdutosConsumidos.length + cliente.getServicosConsumidos.length;
            console.log(`${index + 1}- ${cliente.nome} - Total Consumido: ${totalConsumido}`);
        });
    
        console.log(`\n ---- Listagem concluída ----\n`);
    }

    public listarTop5ClientesPorValor(): void {
        console.log(`\n---- Início da listagem dos 5 clientes que mais consumiram em valor ----`);
    
        if (this.clientes.length === 0) {
            console.log("---- Não há clientes cadastrados para listar ---- \n");
            return;
        }
    
        const clientesOrdenadosPorValor = this.clientes.sort((clienteA, clienteB) => {
            const valorConsumidoA = clienteA.getProdutosConsumidos.reduce((total, produto) => total + produto.preco, 0) +
                                    clienteA.getServicosConsumidos.reduce((total, servico) => total + servico.preco, 0);
            const valorConsumidoB = clienteB.getProdutosConsumidos.reduce((total, produto) => total + produto.preco, 0) +
                                    clienteB.getServicosConsumidos.reduce((total, servico) => total + servico.preco, 0);
    
            return valorConsumidoB - valorConsumidoA;
        });
    
        const top5Clientes = clientesOrdenadosPorValor.slice(0, 5);
    
        console.log(`\n---- Lista dos 5 clientes que mais consumiram em valor ----\n`);
    
        top5Clientes.forEach((cliente, index) => {
            const valorConsumido = cliente.getProdutosConsumidos.reduce((total, produto) => total + produto.preco, 0) +
                                   cliente.getServicosConsumidos.reduce((total, servico) => total + servico.preco, 0);
            console.log(`${index + 1}- ${cliente.nome} - Valor Consumido: R$ ${valorConsumido.toFixed(2)}`);
        });
    
        console.log(`\n---- Listagem concluída ---- \n`);
    }

    
    public listarProdutosServicosMaisConsumidos(): void {
        console.log(`\n---- Início da listagem geral dos produtos e serviços mais consumidos em quantidade ----`);
    
        let consumo: { [key: string]: number } = {};
    
        let produtosOuServicosExistem = false;
    
        this.clientes.forEach(cliente => {
            cliente.getProdutosConsumidos.forEach(produto => {
                produtosOuServicosExistem = true;
                if (consumo[produto.nome]) {
                    consumo[produto.nome]++;
                } else {
                    consumo[produto.nome] = 1;
                }
            });
            cliente.getServicosConsumidos.forEach(servico => {
                produtosOuServicosExistem = true;
                if (consumo[servico.nome]) {
                    consumo[servico.nome]++;
                } else {
                    consumo[servico.nome] = 1;
                }
            });
        });
    
        if (!produtosOuServicosExistem) {
            console.log('Primeiro é necessário o cadastro de algum produto ou serviço!');
            return;
        }
    
        let consumoArray = Object.keys(consumo).map(key => {
            return { nome: key, quantidade: consumo[key] };
        });
    
        consumoArray.sort((a, b) => b.quantidade - a.quantidade);
    
        console.log(`\nProdutos e serviços mais consumidos:\n`);
        consumoArray.forEach(item => {
            console.log(`${item.nome} - Quantidade consumida: ${item.quantidade}`);
        });
    
        console.log(`\n---- Listagem concluída ----\n`);
    }

    public listarProdutosServicosPorTipoERaca(): void {
        console.log(`\n---- Início da listagem dos produtos e serviços mais consumidos por tipo e raça de pets ----`);
    
        let consumoPorTipoERaca: { [key: string]: { [key: string]: number } } = {};
    
        let produtosOuServicosExistem = false;
    
        this.clientes.forEach(cliente => {
            cliente.getPets.forEach(pet => {
                let tipo = pet.getTipo;
                let raca = pet.getRaca;
                let chaveTipo = `Tipo: ${tipo}`;
                let chaveRaca = `Raça: ${raca}`;
    
                if (!consumoPorTipoERaca[chaveTipo]) {
                    consumoPorTipoERaca[chaveTipo] = {};
                }
                if (!consumoPorTipoERaca[chaveTipo][chaveRaca]) {
                    consumoPorTipoERaca[chaveTipo][chaveRaca] = 0;
                }
    
                cliente.getProdutosConsumidos.forEach(produto => {
                    produtosOuServicosExistem = true;
                    consumoPorTipoERaca[chaveTipo][chaveRaca]++;
                });
                cliente.getServicosConsumidos.forEach(servico => {
                    produtosOuServicosExistem = true;
                    consumoPorTipoERaca[chaveTipo][chaveRaca]++;
                });
            });
        });
    
        if (!produtosOuServicosExistem) {
            console.log('Primeiro é necessário o cadastro de algum produto ou serviço!');
            return;
        }
    
        console.log(`\nProdutos e serviços mais consumidos por tipo e raça de pets:\n`);
        Object.keys(consumoPorTipoERaca).forEach(tipo => {
            console.log(tipo);
            Object.keys(consumoPorTipoERaca[tipo]).forEach(raca => {
                console.log(`  ${raca} - Quantidade consumida: ${consumoPorTipoERaca[tipo][raca]}`);
            });
        });
    
        console.log(`\n---- Listagem concluída ---- \n`);
    }
    
}  