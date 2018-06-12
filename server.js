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
    {id: 0, name: 'Veterinaria Mascovet', address: 'Calle 11A no 33 esquina',phone '7202020', image: 'https://comps.canstockphoto.es/veterinario-el-se%C3%B1alar-de-la-mujer-clipart-vectorial_csp51117500.jpg'},
	{id: 1, name: 'Veterinaria Cachorros', address: 'Calle Principal',phone '7207484', image: 'http://www.mundoanimalia.com/images/veterinario/fc/6c/c5/cc8c609563d2b30f18b01c0fa9e684b3/thumb4_logo_urgencias_8378.jpg'},
	{id: 2, name: 'Pelqueria Peluches', address: 'Mz 28 Cs 4 Aranda',phone '3152505986', image: 'https://2.bp.blogspot.com/-8GUFDakqyDM/V4aWKRANwOI/AAAAAAAACaA/cq1P7c-Yi0AaFkcJoaDUODk8VuHX5FaPQCKgB/s1600/PELUQUERIA%2BCANINA.jpg'},
	{id: 3, name: 'Peluqueria Espumitas', address: 'Calle Falsa 123',phone '3115648790', image: 'http://www.mundoanimalia.com/images/peluqueria/37/7f/da/0f31cf4c07210e8d5460b43c17e11798/thumb4_peluqueria_canina_servimascotas__9737.jpg'},
	{id: 4, name: 'Veterniaria Dogtor', address: 'Mary Luz',phone '3174960963', image: 'https://www.adiestramientocaninos.com/wp-content/uploads/2018/02/consejos-para-elegir-clinicas-veterinarias-en-bogota.jpg'}
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
app.get('/quotess', (req, res) => {
    let pos = 0;
    quotes.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(quotes)
})

// Delete a Quotes
app.delete('/quotess/:id',(req, res) => {
    let params = req.params;
    quotes.splice(params.id, 1);
    res.send('Quotes delete')
})

// Update A Quotes
app.put('/quotess/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    quotes[params.id]['name'] = data.Name;
	quotes[params.id]['address'] = data.Address;
	quotes[params.id]['phone'] = data.Phone;
	
    res.send("Quotes Update")
})

// Create A Quotes
app.post('/quotess', (req, res) => {
    let data = req.body;
    let consecutive = quotes.length;
    let quotesTmp = [{
        id: consecutive,
        name: data.Name,
        address: data.Address,
		phone: data.Phone,
        image: 'https://comps.canstockphoto.es/veterinario-el-se%C3%B1alar-de-la-mujer-clipart-vectorial_csp51117500.jpg'
    }];
    quotes.push(quotesTmp[0])

    res.send("Category Create")
})

// *************************************************************
// *************************************************************
 
http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})