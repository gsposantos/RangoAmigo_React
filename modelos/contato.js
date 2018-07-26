export default class Contato {

    constructor(recordID, emailAddresses, familyName, givenName, jobTitle, middleName, phoneNumbers, hasThumbnail, thumbnailPath) {
      
        this.recordID = recordID;
        
        this.familyName = familyName;
        this.givenName = givenName;
        this.jobTitle = jobTitle;
        this.middleName = middleName;
        
        this.hasThumbnail = hasThumbnail;
        this.thumbnailPath = thumbnailPath;
        
        this.emailAddresses = emailAddresses;
        this.phoneNumbers = phoneNumbers;

        // this.foto64 = '';
        // this.cadastrado = false;
        //this.celNumero = 0;
        
      }
      
       toJSON() {
          return Object.assign({}, this, {
              created: this.created.toString()
          });
      }
  
      static fromJSON(json) {
          const contato = Object.create(Contato.prototype);
  
          return Object.assign(contato, json, {
              created: new Date(json.created)
          });
      }


    // constructor(id, nome, foto) {

    //     this.id = id;
    //     this.nome = nome;
    //     this.fotoUri = foto;
        
    //     this.foto64 = '';
    //     this.cadastrado = false;

    //     this.emails = Array();
    //     this.numeros = Array();
    // }

}
