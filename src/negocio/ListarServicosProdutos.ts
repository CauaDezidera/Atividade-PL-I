import Listagem from "./listagem";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import Pet from "../modelo/pet";

export default class ListagemProdutosServicos extends Listagem {
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private pets: Array<Pet>;

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>, pets: Array<Pet>) {
        super();
        this.clientes = clientes;
        this.produtos = produtos;
        this.servicos = servicos;
        this.pets = pets;
    }

    public listar(): void {
        this.listarTopClientesQuantidade();
        this.listarProdutosMaisConsumidos();
        this.listarProdutosServicosPorTipoRaca();
        this.listarTopClientesValor();
    }

    private listarTopClientesQuantidade(): void {
        console.log(`\n---- Lista dos 10 clientes que mais consumiram produtos ou serviços, em quantidade ----`);

        const consumoPorCliente = this.calcularConsumoPorClienteQuantidade();

        const clientesOrdenados = [...consumoPorCliente.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

        clientesOrdenados.forEach(([cliente, quantidade]) => {
            console.log(`Cliente: ${cliente.nome} - Quantidade Consumida: ${quantidade}`);
        });

        console.log(`\n---- Listagem concluída ----\n`);
    }

    private listarProdutosMaisConsumidos(): void {
        console.log(`\n ---- Listagem geral dos serviços ou produtos mais consumidos -----`);

        const quantidadePorItem = this.calcularConsumoGeralQuantidade();

      
        const itensOrdenados = [...quantidadePorItem.entries()].sort((a, b) => b[1] - a[1]);

        itensOrdenados.forEach(([item, quantidade]) => {
            console.log(`${item instanceof Produto ? 'Produto' : 'Serviço'} - ${item.nome} - Quantidade Consumida: ${quantidade}`);
        });

        console.log(`\n---- Listagem concluída ----\n`);
    }

    private listarProdutosServicosPorTipoRaca(): void {
        console.log(`\n---- Listagem dos serviços ou produtos mais consumidos por tipo e raça de pets -----`);

        const quantidadePorItemPet = this.calcularConsumoPorTipoRacaQuantidade();

        this.exibirListagemPorTipoRaca(quantidadePorItemPet);

        console.log(`\n----- Listagem concluída -----\n`);
    }

    private listarTopClientesValor(): void {
        console.log(`\n----- Lista dos 5 clientes que mais consumiram em valor -----`);

        const consumoPorCliente = this.calcularConsumoPorClienteValor();

        const clientesOrdenados = [...consumoPorCliente.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

        clientesOrdenados.forEach(([cliente, valor]) => {
            console.log(`Cliente: ${cliente.nome} - Valor Consumido: ${valor}`);
        });

        console.log(`\n----- Listagem concluída -----\n`);
    }

    private calcularConsumoPorClienteQuantidade(): Map<Cliente, number> {
        const consumoPorCliente = new Map<Cliente, number>();

        for (const cliente of this.clientes) {
            let quantidadeTotal = 0;

            for (const produto of cliente.getProdutosConsumidos) {
                quantidadeTotal += 1; 
            }

            for (const servico of cliente.getServicosConsumidos) {
                quantidadeTotal += 1; 
            }

            consumoPorCliente.set(cliente, quantidadeTotal);
        }

        return consumoPorCliente;
    }

    private calcularConsumoGeralQuantidade(): Map<Produto | Servico, number> {
        const quantidadePorItem = new Map<Produto | Servico, number>();

        for (const cliente of this.clientes) {
            for (const produto of cliente.getProdutosConsumidos) {
                this.incrementarQuantidade(quantidadePorItem, produto);
            }

            for (const servico of cliente.getServicosConsumidos) {
                this.incrementarQuantidade(quantidadePorItem, servico);
            }
        }

        return quantidadePorItem;
    }

    private calcularConsumoPorTipoRacaQuantidade(): Map<string, Map<Produto | Servico, number>> {
        const quantidadePorItemPet = new Map<string, Map<Produto | Servico, number>>();

        for (const cliente of this.clientes) {
            for (const pet of cliente.getPets) {
                for (const produto of cliente.getProdutosConsumidos) {
                    this.incrementarQuantidadePorTipoRaca(quantidadePorItemPet, pet, produto);
                }

                for (const servico of cliente.getServicosConsumidos) {
                    this.incrementarQuantidadePorTipoRaca(quantidadePorItemPet, pet, servico);
                }
            }
        }

        return quantidadePorItemPet;
    }

    private calcularConsumoPorClienteValor(): Map<Cliente, number> {
        const consumoPorCliente = new Map<Cliente, number>();

        for (const cliente of this.clientes) {
            let valorTotal = 0;

            for (const produto of cliente.getProdutosConsumidos) {
                valorTotal += produto.preco; 
            }

            for (const servico of cliente.getServicosConsumidos) {
                valorTotal += servico.preco; 
            }

            consumoPorCliente.set(cliente, valorTotal);
        }

        return consumoPorCliente;
    }

    private incrementarQuantidade(mapa: Map<Produto | Servico, number>, item: Produto | Servico): void {
        mapa.set(item, (mapa.get(item) || 0) + 1);
    }

    private incrementarQuantidadePorTipoRaca(mapa: Map<string, Map<Produto | Servico, number>>, pet: Pet, item: Produto | Servico): void {
        const chaveTipoRaca = `${pet.getTipo}-${pet.getRaca}`;

        if (!mapa.has(chaveTipoRaca)) {
            mapa.set(chaveTipoRaca, new Map<Produto | Servico, number>());
        }

        const mapaPorTipoRaca = mapa.get(chaveTipoRaca);

        if (mapaPorTipoRaca) {
            this.incrementarQuantidade(mapaPorTipoRaca, item);
        }
    }

    private exibirListagemPorTipoRaca(mapa: Map<string, Map<Produto | Servico, number>>): void {
        console.log(`\n ----- Lista dos serviços ou produtos mais consumidos por tipo e raça de pets -----\n`);

        for (const [chaveTipoRaca, mapaPorTipoRaca] of mapa.entries()) {
            console.log(`Tipo e Raça: ${chaveTipoRaca}`);

            const itensOrdenados = [...mapaPorTipoRaca.entries()].sort((a, b) => b[1] - a[1]);

            itensOrdenados.forEach(([item, quantidade]) => {
                console.log(`${item instanceof Produto ? 'Produto' : 'Serviço'} - ${item.nome} - Quantidade Consumida: ${quantidade}`);
            });

            console.log(`\n----- Listagem concluída -----\n`);
        }
    }
}