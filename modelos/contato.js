export default class Contato {
    constructor(id, nome, foto) {

        this.id = id;
        this.nome = nome;
        this.fotoUri = foto;
        
        this.foto64 = '';
        this.cadastrado = false;

        this.emails = Array();
        this.numeros = Array();
    }
}
