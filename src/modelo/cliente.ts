import CPF from "./cpf";
import Pet from "./pet";
import Produto from "./produto";
import RG from "./rg";
import Servico from "./servico";
import Telefone from "./telefone";

export default class Cliente {
    public nome: string;
    public nomeSocial: string;
    private cpf: CPF;
    private rgs: Array<RG>;
    private dataCadastro: Date;
    private telefones: Array<Telefone>;
    private produtosConsumidos: Array<Produto>;
    private servicosConsumidos: Array<Servico>;
    private pets: Array<Pet>;

    constructor(nome: string, nomeSocial: string, cpf: CPF, dataCadastro: Date) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.rgs = [];
        this.dataCadastro = dataCadastro;
        this.telefones = [];
        this.produtosConsumidos = [];
        this.servicosConsumidos = [];
        this.pets = [];
    }

    public get getCpf(): CPF {
        return this.cpf;
    }

    public get getRgs(): Array<RG> {
        return this.rgs;
    }

    public get getDataCadastro(): Date {
        return this.dataCadastro;
    }

    public get getTelefones(): Array<Telefone> {
        return this.telefones;
    }

    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos;
    }

    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos;
    }

    public get getPets(): Array<Pet> {
        return this.pets;
    }

    public addPet(pet: Pet): void {
        this.pets.push(pet);
    }

    public addProdutoConsumido(produto: Produto): void {
        this.produtosConsumidos.push(produto);
    }

    public addServicoConsumido(servico: Servico): void {
        this.servicosConsumidos.push(servico);
    }

    public addRG(rg: RG): void {
        this.rgs.push(rg);
    }

    public addTelefone(telefone: Telefone): void {
        this.telefones.push(telefone);
    }
}