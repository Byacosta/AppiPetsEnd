const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const app = express()

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ***************************************************************
// ***************************************************************

let users = [
    {id: 0, name: 'William Hernando', lastname: 'Alvarez Villota', noid: '1131084989', login: 'WilliamA', password:'123', address: 'Gaulcaloma', email: 'williamalvarez0094@gmail.com', sex:'Masculino'},
    {id: 1, name: 'Brian Yessid', lastname: 'Acosta Mosquera', noid: '1085283982', login: 'BrianA', password:'456', address: 'Corazon De Jesus', email: 'yessidbryan@gmail.com', sex:'Masculino'}
];

let quotes = [
    {id: 0, name: 'Veterinaria Mascovet', address: 'Calle 11A no 33 esquina',phone '7202020', image: 'http://www.mascovetconstanti.com/img/ofertes/oferta01hr.jpg'},
	{id: 1, name: 'Veterinaria Cachorros', address: 'Calle Principal',phone '7207484', image: 'http://www.educagratis.org/imagenes/animales/Aula-Virtual-Cursos-Gratis-Peluqueria-Canina-Perros.jpg'},
	{id: 2, name: 'Pelqueria Peluches', address: 'Mz 28 Cs 4 Aranda',phone '3152505986', image: 'https://images.evisos.cl/2013/03/31/peluqueria-canina-pelucan-centro-de-villa-alemana_10b86b2e46_3.jpg'},
	{id: 3, name: 'Peluqueria Espumitas', address: 'Calle Falsa 123',phone '3115648790', image: 'https://4.bp.blogspot.com/-iXapAxX1iGQ/VihkXBlk7wI/AAAAAAAAOoQ/scVe8Wc7kUc/s640/veterinaria%2Ba%2Bdomicilio.jpg'},
	{id: 4, name: 'Veterniaria Dogtor', address: 'Mary Luz',phone '3174960963', image: 'http://bisnet.com.co/images/empresas/veterinaria_comuneros/veterinaria_comuneros.jpg'},
];

// ***************************************************************
// ***************************************************************

app.get('/', (req, res) => {
    res.status(200).send("Welcome to ApiRest PetsAppEnd")
})

app.get('/users', (req, res) => {
    res.send(users)
})

// Validate users at the time of login
app.post('/validateUser', (req, res) => {
    let data = req.body;
    let usersTmp = [{success: false, id: 0, name: '', lastname: '', noid: '', login: '', password: '', address: '', email: '', sex: ''}];

    users.some(function (value, index, _arr) {
        if( (value.username == data.Username) && (value.password == data.Password) ){
            usersTmp[0]['success'] = true;
            usersTmp[0]['id'] = value.id;
			usersTmp[0]['name'] = value.name;
			usersTmp[0]['lastname'] = value.lastname;
			usersTmp[0]['noid'] = value.noid;
            usersTmp[0]['login'] = value.login;
            usersTmp[0]['password'] = value.password;
			usersTmp[0]['address'] = value.address;
            usersTmp[0]['email'] = value.email;
            usersTmp[0]['sex'] = value.sex;
            return true;
        }else{
            return false;
        }
    });

    res.send(usersTmp)
})

// Create usuers for a new count
app.post('/createUser', (req, res) => {
    let data = req.body;
    let consecutive = users.length;
    let usersTmp = [{
        success: true,
        id: consecutive,
		name: data.Name,
		lastname: data.LastName,
		noid: data.NoId,
        login: data.Login,
        password: data.Password,
		address: data.Address,
        email: data.Email,
        sex: data.Sex
    }];
    users.push(usersTmp[0])

    res.send(usersTmp)
})

// List All The Quotes
app.get('/quotes', (req, res) => {
    let pos = 0;
    quotes.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(quotes)
})

// Delete a Quotes
app.delete('/quotes/:id',(req, res) => {
    let params = req.params;
    quotes.splice(params.id, 1);
    res.send('Quotes delete')
})

// Update A Quotes
app.put('/quotes/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    quotes[params.id]['name'] = data.Name;
	quotes[params.id]['address'] = data.Address;
	quotes[params.id]['phone'] = data.Phone;
	
    res.send("Quotes Update")
})

// Create A Quotes
app.post('/quotes', (req, res) => {
    let data = req.body;
    let consecutive = quotes.length;
    let quotesTmp = [{
        id: consecutive,
        name: data.Name,
        address: data.Address,
		phone: data.Phone,
        image: 'https://urgenciasveterinarias.co/wp-content/uploads/2016/09/veterinario_quimbaya_quindio.png'
    }];
    quotes.push(quotesTmp[0])

    res.send("Category Create")
})

// *************************************************************
// *************************************************************
 
http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})