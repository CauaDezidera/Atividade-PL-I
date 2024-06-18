import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import ControlarCliente from "../negocio/ControlarCliente";
import ControlarPet from "../negocio/ControlarPet";
import ListagemClientes from "../negocio/listagemClientes";
import ListarPet from "../negocio/ListarPet";
import ControlarProduto from "../negocio/ControlarProduto";
import ControlarServico from "../negocio/ControlarServico";

console.log(`Bem-vindo PetLovers !`);
let empresa = new Empresa();
let execucao = true;

while (execucao) {
    console.log(`Opções disponíveis:`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar clientes`);
    console.log(`3 - Editar clientes`);
    console.log(`4 - Excluir clientes`);
    console.log(`5 - Cadastrar pet`);
    console.log(`6 - Listar pets`);
    console.log(`7 - Editar pets`);
    console.log(`8 - Excluir pets`);
    console.log(`9 - Cadastrar produto`);
    console.log(`10 - Listar produtos`);
    console.log(`11 - Editar produtos`);
    console.log(`12 - Excluir produtos`);
    console.log(`13 - Cadastrar serviço`);
    console.log(`14 - Listar serviços`);
    console.log(`15 - Editar serviços`);
    console.log(`16 - Excluir serviços`);
    console.log(`17 - Listar top 10 clientes que mais consumiram por quantidade`);
    console.log(`18 - Listar serviços ou produtos mais consumidos`);
    console.log(`19 - Listar serviços ou produtos mais vendidos por tipo e raça de pets`);
    console.log(`20 - Listar top 5 clientes que mais consumiram por valor`);
    console.log(`0 - Sair`);

    let entrada = new Entrada();
    let opcao = entrada.receberNumero(`Por favor, escolha uma das opções: `);

    switch (opcao) {
        case 1:
            let cadastroCliente = new ControlarCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos, empresa.getPets);
            cadastroCliente.cadastrar();
            break;
        case 2:
            let listagemClientes = new ListagemClientes(empresa.getClientes);
            listagemClientes.listar();
            break;
        case 3:
            let editarCliente = new ControlarCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos, empresa.getPets);
            editarCliente.editarCliente();
            break;
        case 4:
            let excluirCliente = new ControlarCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos, empresa.getPets);
            excluirCliente.excluirCliente();
            break;
        case 5:
            let cadastroPet = new ControlarPet(empresa.getPets);
            cadastroPet.cadastrar();
            break;
        case 6:
            let listagemPet = new ListarPet(empresa.getPets);
            listagemPet.listar();
            break;
        case 7:
            let editarPet = new ControlarPet(empresa.getPets);
            editarPet.editarPets();
            break;
        case 8:
            let excluirPet = new ControlarPet(empresa.getPets);
            excluirPet.excluirPet();
            break;
        case 9:
            let cadastroProduto = new ControlarProduto(empresa.getProdutos);
            cadastroProduto.cadastrar();
            break;
        case 10:
            let listarProdutos = new ControlarProduto(empresa.getProdutos);
            listarProdutos.listarProdutos();
            break;
        case 11:
            let editarProduto = new ControlarProduto(empresa.getProdutos);
            editarProduto.editarProduto();
            break;
        case 12:
            let excluirProduto = new ControlarProduto(empresa.getProdutos);
            excluirProduto.excluirProduto();
            break;
        case 13:
            let cadastroServico = new ControlarServico(empresa.getServicos);
            cadastroServico.cadastrar();
            break;
        case 14:
            let listarServicos = new ControlarServico(empresa.getServicos);
            listarServicos.listarServicos();
            break;
        case 15:
            let editarServico = new ControlarServico(empresa.getServicos);
            editarServico.editarServico();
            break;
        case 16:
            let excluirServico = new ControlarServico(empresa.getServicos);
            excluirServico.excluirServico();
            break;
        case 17:
            let topClientes = new ControlarCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos, empresa.getPets);
            topClientes.listarTopClientes();
            break;
        case 18:
            let maisConsumidos = new ControlarCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos, empresa.getPets);
            maisConsumidos.listarProdutosServicosMaisConsumidos();
            break;
        case 19:
            let maisConsumidosPorTipoERaca = new ControlarCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos, empresa.getPets);
            maisConsumidosPorTipoERaca.listarProdutosServicosPorTipoERaca();
            break;
        case 20:
            let top5ClientesPorValor = new ControlarCliente(empresa.getClientes, empresa.getProdutos, empresa.getServicos, empresa.getPets);
            top5ClientesPorValor.listarTop5ClientesPorValor();
            break;
        case 0:
            execucao = false;
            console.log(`Agradecemos a preferência`);
            break;
        default:
            console.log(`Operação inválida`);
    }
}