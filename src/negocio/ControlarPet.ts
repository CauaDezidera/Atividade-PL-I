import Entrada from "../io/entrada"
import Cadastro from "./cadastro"
import Pet from "../modelo/pet"
import ListarPet from "./ListarPet"

export default class ControlarPet extends Cadastro {
    private pets: Array<Pet>
    private entrada: Entrada
    constructor(pets: Array<Pet>) {
        super()
        this.pets = pets
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro de pet`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do pet: `)
        let raca = this.entrada.receberTexto(`Por favor informe a raça: `);
        let genero = this.entrada.receberTexto('Por favor, informe o gênero do pet: ')
        let tipo = this.entrada.receberTexto('Por favor, informe o tipo de animal: ')
        let pet = new Pet(nome, raca, genero, tipo)
        this.pets.push(pet)
        console.log(`\n---- Cadastro de pet concluído ----\n`);
    }

    public editarPets(): void {
        console.log(`\n---- Início da edição de pets ----`);
    
        if (this.pets.length === 0) {
            console.log("Ainda não há pets cadastrados para editar.\n");
            return;
        }
    
        console.log(`\n---- Lista de todos os pets ----`);
    
        this.pets.forEach((pet, index) => {
            console.log(`${index + 1}- Nome: ${pet.getNome}`);
        });
    
    
        let petIndex = this.entrada.receberNumero(`Escolha o número do pet que deseja editar (escolha 0 para sair): `);
    
        if (petIndex === 0) {
            console.log(`Edição de pets cancelada\n`);
            return;
        }
    
        if (petIndex >= 1 && petIndex <= this.pets.length) {
            let petParaEditar = this.pets[petIndex - 1];
    
            console.log(`\nInformações atuais do pet "${petParaEditar.getNome}":\n`);
    
            
            console.log("Campos para edição:");
            console.log("1- Nome");
            console.log("2- Raça");
            console.log("3- Gênero");
            console.log("4- Tipo");
            
    
        
            let opcaoEdicao = this.entrada.receberNumero(`Escolha o número do campo que deseja editar: `);
    
            switch (opcaoEdicao) {
                case 1:
                    let novoNome = this.entrada.receberTexto(`Informe o novo nome do pet: `);
                    petParaEditar.setNome(novoNome);
                    break;
                case 2:
                    let novaRaca = this.entrada.receberTexto(`Informe a nova raça do pet: `);
                    petParaEditar.setRaca(novaRaca);
                    break;
                case 3:
                    let novoGenero = this.entrada.receberTexto(`Informe o novo gênero do pet: `);
                    petParaEditar.setGenero(novoGenero);
                    break;
                case 4:
                    let novoTipo = this.entrada.receberTexto(`Informe o novo tipo do pet: `);
                    petParaEditar.setTipo(novoTipo);
                    break;
               
                default:
                    console.log("Opção inválida.");
                    break;
            }
    
            console.log(`\nInformações atualizadas do pet "${petParaEditar.getNome}":\n`);
            console.log(`Nome: ${petParaEditar.getNome}`);
            console.log(`Raça: ${petParaEditar.getRaca}`);
            console.log(`Gênero: ${petParaEditar.getGenero}`);
            console.log(`Tipo: ${petParaEditar.getTipo}`);
           
        } else {
            console.log(`Número de pet inválido.`);
        }
    
        console.log(`\n---- Edição de pet concluída ----\n`);
    }

    public excluirPet(): void {
        console.log(`\nInício da exclusão de pet`);
    
        if (this.pets.length === 0) {
            console.log("Ainda não há pets cadastrados para excluir.\n");
            return;
        }
    
        console.log(`\n---- Lista de todos os pets ----`);
    
        this.pets.forEach((pet, index) => {
            console.log(`${index + 1}- Nome: ${pet.getNome}`);
        });
    
        
        let petIndex = this.entrada.receberNumero(`Escolha o número do pet que deseja excluir (escolha 0 para sair): `);
    
        if (petIndex === 0) {
            console.log(`Exclusão de pets cancelada\n`);
            return;
        }
    
        if (petIndex >= 1 && petIndex <= this.pets.length) {
            let petParaExcluir = this.pets[petIndex - 1];
    
            console.log(`\nInformações do pet "${petParaExcluir.getNome}" que será excluído:\n`);
            console.log(`Nome: ${petParaExcluir.getNome}`);
            console.log(`Raça: ${petParaExcluir.getRaca}`);
            console.log(`Gênero: ${petParaExcluir.getGenero}`);
            console.log(`Tipo: ${petParaExcluir.getTipo}`);
           
    
            
            let confirmacao = this.entrada.receberTexto(`Deseja confirmar a exclusão? (s para sim, n para não): `);
    
            if (confirmacao.toLowerCase() === 's') {
               
                this.pets.splice(petIndex - 1, 1);
                console.log(`---- Pet excluído com sucesso ----\n`);
            } else {
                console.log(`Exclusão cancelada.\n`);
            }
        } else {
            console.log(`Número de pet inválido.`);
        }
    }
    
    
}