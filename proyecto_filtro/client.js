//crear clientes
class Client {
    id;
    name;
    last_name;
    phone_number;
    email;
    date_of_birth;
    nacionality;
    loyalty;

    constructor(id, name, last_name, phone_number, email, date_of_birth, nacionality, loyalty){
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.email = email;
        this.date_of_birth = date_of_birth;
        this.nacionality = nacionality;
        this.loyalty = loyalty;
    }

}

export default Client