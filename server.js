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

let categories = [
    {id: 0, name: 'Health', description: '', image: 'http://stokpic.com/wp-content/uploads/2018/03/Man-looking-out-to-the-ocean-at-a-sail-boat.jpg'},
	{id: 1, name: 'Quotes', description: '', image: 'https://image.freepik.com/vector-gratis/veterinaria-con-un-perro_1196-293.jpg'},
	{id: 2, name: 'Vaccinations', description: '', image: 'https://i.pinimg.com/originals/19/21/c5/1921c593d779b5b6df42e2bdc984c3b8.jpg'},
	{id: 3, name: 'Walks', description: '', image: 'https://www.mundomascotas.info/wp-content/uploads/2014/12/ense%C3%B1ar-a-pasear-a-un-cachorro.jpg'},
	{id: 4, name: 'Recommendations', description: '', image: 'http://mundocan.com.mx/blog/wp-content/uploads/2014/02/cuidados-para-perros.jpg'}
];

// ***************************************************************
// ***************************************************************

app.get('/', (req, res) => {
    res.status(200).send("Welcome to API REST")
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

// List All The Categories
app.get('/categories', (req, res) => {
    let pos = 0;
    categories.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(categories)
})

// Delete a Category
app.delete('/categories/:id',(req, res) => {
    let params = req.params;
    categories.splice(params.id, 1);
    res.send('Category delete')
})

// Update a category
app.put('/categories/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    categories[params.id]['name'] = data.Name;
	categories[params.id]['description'] = data.Description;
    res.send("categories update")
})

// Create A Category
app.post('/categories', (req, res) => {
    let data = req.body;
    let consecutive = categories.length;
    let contactTmp = [{
        id: consecutive,
        name: data.Name,
        description: data.Description,
        image: 'https://i.pinimg.com/originals/71/57/e1/7157e1cdebbb331bfacdec1e75275858.jpg'
    }];
    categories.push(contactTmp[0])

    res.send("Category Create")
})

// *************************************************************
// *************************************************************
 
http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})