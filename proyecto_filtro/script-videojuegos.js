import Game from "./game.js";

const btnCreate = document.getElementById('create');
const modalCreate = document.getElementById('modalCreate');
const btnCloseCreate = document.querySelectorAll('.btn-close-create');
const modalAdquirirGame = document.getElementById('modalAdquirirGame');



let register_games = [];
let buys = [];
let cont_games = 0;

btnCreate.addEventListener('click', () => {
    modalCreate.style.display = 'flex';
    modalCreate.querySelector('#modalCreate .modal-header-container span').textContent = 'Crear Videojuego';
    modalCreate.querySelector('#modalCreate .modal-footer-container .btn-success').textContent = 'Crear';
    modalCreate.querySelector('#modalCreate .modal-footer-container .btn-success').addEventListener('click', () => btn_save_game ());
})

btnCloseCreate.forEach(e => {
    e.addEventListener('click', () => {
        modalCreate.style.display = 'none';
    })
});

const openToast = (text) => {
    const toast = document.getElementById('toast');

    toast.textContent = text;
    if (!toast.classList.contains("show")) {
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2700);
    }
}

const btn_save_game = () => {
    const create_name_input = modalCreate.querySelector('#modalCreate .modal-body-container #name'), 
        create_theme_input = modalCreate.querySelector('#modalCreate .modal-body-container #theme'),
        create_value_input = modalCreate.querySelector('#modalCreate .modal-body-container #value'),
        create_points_input = modalCreate.querySelector('#modalCreate .modal-body-container #points');

    if(create_name_input.value == '' || 
        create_theme_input.value == '' || 
        create_value_input.value == '' ||
        create_points_input.value == ''){
            (modalCreate.style.display == 'flex') ? alert('DATO INVALIDO') : ''; 
        return true;
    }
    
    cont_games = cont_games + 1;

    const game = new Game(cont_games, 
                            create_name_input.value, 
                            create_theme_input.value, 
                            create_value_input.value, 
                            create_points_input.value
                        );

    register_games.push(game);
    localStorage.setItem('key_game', JSON.stringify(register_games));
    add_game_list(JSON.parse(localStorage.getItem('key_game')));
    alert('Videojuego registrado correctamente')
    modalCreate.style.display = 'none';
    create_name_input.value = '';
    create_theme_input.value = '';
    create_value_input.value = '';
    create_points_input.value = '';
}


const btn_get_game = (id_game) => {
    const value_game = document.getElementsByClassName(`btn-actions_${id_game}`);

    //obtengo el juego con el boton
    const game = register_games.find(c => c.id == value_game);




    // Llenar el modal
    const modalAdquirirGame = document.getElementById('modalAdquirirGame');
    modalAdquirirGame.style.display = 'flex';

    const gamesSelect = document.getElementById('games_select');
    const modalPriceInput = document.getElementById('modal_price');
    const valueIva16Input = document.getElementById('value_iva_16');
    const value4Input = document.getElementById('value_4');


    gamesSelect.innerHTML = "";
    const option = document.createElement('option');
    option.value = game.id;
    option.text = game.name_game;
    gamesSelect.appendChild(option);

    //predeterminado
    gamesSelect.value = game.id;

    
    modalPriceInput.value = game.price_license;


    const price = parseFloat(game.price_license);
    const iva16 = price * 0.16;
    valueIva16Input.value = iva16;


    const iva4 = price * 0.04;
    value4Input.value = iva4;

    enlistar_clients();

    modalAdquirirGame.querySelector('.btn-success').addEventListener('click', () => btn_adquirir(game, iva16, iva4));
    
}

 


/*  const btn_get_game = (id_game) => {
    //Traemos el cliente que queremos editar
    const game = [...register_games.filter(c => c.id == id_game)];

    modalAdquirirGame.style.display='flex';


    console.log(modalAdquirirGame);

    console.log(modalAdquirirGame.querySelector('#modalAdquirirGame .modal-footer-container .btn-success'))
    modalAdquirirGame.querySelector('#modalAdquirirGame .modal-footer-container .btn-success').addEventListener('click', () => btn_adquirir);








} */

const btn_edit_client = (id_client) => {
    const edit_id_input = modalRegister.querySelector('.modal-body-container #id'),
        edit_name_input = modalRegister.querySelector('.modal-body-container #name'),
        edit_last_name_input = modalRegister.querySelector('.modal-body-container #last_name'),
        edit_phone_number_input = modalRegister.querySelector('.modal-body-container #phone_number'),
        edit_email_input = modalRegister.querySelector('.modal-body-container #email'),
        edit_date_of_birth = modalRegister.querySelector('.modal-body-container #date_of_birth'),
        edit_nacionality = modalRegister.querySelector('.modal-body-container #nacionality');

        if (edit_id_input.value !== id_client) {
            if(register_users.filter(e => e.id == edit_id_input.value).length > 0){
                alert('NUMERO DE IDENTIFICACION YA REGISTRADO');
                return false;
            }
        }
        register_users.filter(c => c.id == id_client)[0].name = edit_name_input.value;
        register_users.filter(c => c.id == id_client)[0].last_name = edit_last_name_input.value;
        register_users.filter(c => c.id == id_client)[0].phone_number = edit_phone_number_input.value;
        register_users.filter(c => c.id == id_client)[0].email = edit_email_input.value;
        register_users.filter(c => c.id == id_client)[0].date_of_birth = edit_date_of_birth.value;
        register_users.filter(c => c.id == id_client)[0].nacionality = edit_nacionality.value;
        register_users.filter(c => c.id == id_client)[0].id = edit_id_input.value;
        localStorage.setItem('key_client', JSON.stringify(register_users));
        add_client_list(register_users);
        alert('Cliente editado correctamente');
        modalRegister.style.display = 'none';
        edit_id_input.value = '';
        edit_name_input.value = '';
        edit_last_name_input.value = '';
        edit_phone_number_input.value = '';
        edit_email_input.value = '';
        edit_date_of_birth.value = '';
        edit_nacionality.value = '';
        filter.click();
}

const btn_delete_game = (id_game) => {
    register_games = [...register_games.filter(c => c.id !== id_game)];
    localStorage.setItem('key_game', JSON.stringify(register_games));
    add_game_list(register_games);
}

const add_game_list = (game_list) =>{
    const table = document.getElementById('table_game_list');
    const tbody = table.querySelectorAll('tbody')[0];
    tbody.innerHTML = '';
    game_list.forEach(i => {
        const row = document.createElement('tr');
        const  c_id = document.createElement('td'),
            c_name = document.createElement('td'),
            c_theme = document.createElement('td'),
            c_value = document.createElement('td'),
            c_points = document.createElement('td'),
            c_actions = document.createElement('td');

        // contenido de la tabla
        c_id.textContent = i.code;
        c_name.textContent = i.name_game;
        c_theme.textContent = i.theme == 1 ? 'Aventura' : (i.theme == 2 ? 'Ciencia Ficción' : ( i.theme == 3 ? 'Fantasia' : 'Terror' ));
        c_value.textContent = i.price_license;
        c_points.textContent = i.points;

        //Le ponemos al ultimo td la clase actions
        c_actions.classList.add('actions');

        //Creamos 4 divs
        const div1 = document.createElement('div'),
            div2 = document.createElement('div');

        //Le ponemos a cada div la clase btn-actions
        div1.classList.add('btn-actions');
        div2.classList.add('btn-actions');

        //Insertamos el icono de ver Juegos Adquiridos
        div1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>`;

        //Insertamos el icono de ver puntos de fidelización
        div2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg> `;

        div1.addEventListener('click', () => btn_get_game(i.id));
        div2.addEventListener('click', () => btn_delete_game(i.id));

        c_actions.appendChild(div1);
        c_actions.appendChild(div2);

        row.appendChild(c_id);
        row.appendChild(c_name);
        row.appendChild(c_theme);
        row.appendChild(c_value);
        row.appendChild(c_points);
        row.appendChild(c_actions);
        tbody.appendChild(row);
    });
}


  const btn_adquirir = () => {
    //no se como enlazar el juego y los puntos
    const select_client_true = get_client_game(),
        value_taxes_true = value_taxes();

    console.log(select_client_true)
    console.log(value_taxes_true)
    console.log("si")

        
    const buy = {
        client: select_client_true,
        value_taxes: value_taxes_true
    }

    select_client_true.buys.push(buy);
    console.log('AAAAAAAAA');

}

/* const add_buy_game = (id_game)  => {
    const select_clients = document.getElementById('clients_select');

    register_users.forEach(client => {
        
        const option = document.createElement('option');
            option.value = client.id;
            option.value = client.name;
            option.value = client.last_name;
            
            select_clients.appendChild(option);
    })
} */


const enlistar_clients = () => {
    const client_select = document.getElementById('clients_select');
    const get_users = localStorage.getItem('key_client'); // Corregir la clave

    if (get_users) {
        const clients_list = JSON.parse(get_users);

        clients_list.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.text = `${client.name} ${client.last_name}`;
            client_select.appendChild(option);
        });
    }
}





window.addEventListener('load', () => {
    if(localStorage.getItem('key_game') == null){
        register_games = [];
    } else { 
        register_games = JSON.parse(localStorage.getItem('key_game'));
    }
    add_game_list(register_games);
})