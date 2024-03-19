const express = require("express")
const architect = require('./MOCK_DATA.json')
const contractor = require('./MOCK_DATA.json')
const painter = require('./MOCK_DATA.json')
const electrician = require('./MOCK_DATA.json')
const flooring = require('./MOCK_DATA.json')
const furniture = require('./MOCK_DATA.json')
const plumber = require('./MOCK_DATA.json')
const path = require("path")
const fs = require('fs')

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname));
app.use(express.json());
app.get('/home', (req, res) => {
    const filePath = path.join(__dirname, 'home.html')
    return res.sendFile(filePath)
})

app.get('/home/:profession/:id?', (req, res) => {
    const id = Number(req.params.id || '0')
    let users = undefined

    try {
        if (String(req.params.profession) == 'architect')
            users = architect
        else if (String(req.params.profession) == 'contractor')
            users = contractor
        else if (String(req.params.profession) == 'painter')
            users = painter
        else if (String(req.params.profession) == 'flooring')
            users = flooring
        else if (String(req.params.profession) == 'electrician')
            users = electrician
        else if (String(req.params.profession) == 'plumber')
            users = plumber
        else if (String(req.params.profession) == 'furniture')
            users = furniture
    }
    catch {
        console.log('error 404 not found')
    }
    const professional = users.find((user) => user.id == id)
    let html = `
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
            integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
        <link rel="stylesheet" href="/styles.css">
        <script src="/content.js"></script>
        <div class="service-click">
            <a href="/home"><i class="fas fa-arrow-circle-left" href="home"></i></a>
            <div class="h">
                ${users.map((user) => {
        return `<a class="box hidea" href='/home/${req.params.profession}/${user.id}'>
                        <div class="profile-photo">
                        </div>
                        <div class="details">
                            <h3 class="name">${user.first_name} ${user.last_name}</h3>
                            <div class="rating">Rating: 4.5</div>
                        </div>
                    </a>`;
    }).join('')}
            </div>
        </div>`
    if (id != 0 && professional) {
        html += `<div class="box-info">
                <div class="photos">
                    <!-- Insert your shop photos here -->
                    <img src="shop1.jpg" alt="Shop 1">
                    <img src="shop2.jpg" alt="Shop 2">
                    <img src="shop3.jpg" alt="Shop 3">
                    <img src="shop4.jpg" alt="Shop 4">
                </div>
                <h1>${professional.first_name} ${professional.last_name}</h1>
                <div class="ratings">
                    <!-- Insert star ratings and reviews here -->
                    <div class="stars">
                        <span>⭐️</span>
                        <span>⭐️</span>
                        <span>⭐️</span>
                        <span>⭐️</span>
                        <span>☆</span> <!-- Empty star -->
                    </div>
                    <p class="reviews">Based on 100 reviews</p>
                </div>
                <div class="options">
                    <!-- Insert span options here -->
                    <span>Website</span>
                    <span><a href="https://www.google.com/maps/dir/21.0082668,78.9508427/IIIT+Nagpur,+Adilabad+-+Nagpur+Road,+Waranga,+Maharashtra/@20.9500043,78.9851749,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bd4c0529518230f:0x45b76be0621cbb88!2m2!1d79.0263748!2d20.9499291?entry=ttu" target="_blank">Directions</a></span>
                    <span>Save</span>
                    <span>Call</span>
                </div>
                <div class="additional-info">
                    <p><strong>Service options:</strong> Offers same-day delivery</p>
                    <p><strong>Address:</strong> 25-A, Sai Preran, Hanuman Nagar, Nagpur, Maharashtra 440009</p>
                    <p><strong>Hours:</strong> Open ⋅ Closes 8 pm</p>
                    <p><strong>Phone:</strong> 094221 03535</p>
                    <p><a href="#">Suggest an edit</a> <a href="#">Own this business?</a></p>
                </div>            
            </div>`
    }
    else {
        html += `</div>
        <div class="default-info">
        <img src="/logo.png" alt="">
    </div>`
    }
    return res.send(html);
});

app.get('/login', (req, res) => {
    const filePath = path.join(__dirname, 'login_option.html')
    return res.sendFile(filePath)
})

app.route('/login/user')
    .get((req, res) => {
        const filePath = path.join(__dirname, 'login_user.html');
        return res.sendFile(filePath);
    })
    .post((req, res) => {
        const body = req.body;
        console.log(body);
        if (body.job_title === "architect") {
            architect.push({ ...body, id: architect.length + 1 });
            fs.writeFile('./MOCK_DATA.json', JSON.stringify(architect), (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                return res.json("Added Successfully");
            });
        } else {
            return res.status(400).json({ error: "Invalid job title" });
        }
    });


app.get('/login/professional', (req, res) => {
    const filePath = path.join(__dirname, 'login_professional.html')
    return res.sendFile(filePath)
})

// app.route('/profile/:id')
// .get((req,res)=>{
//     const body = req.body
//     // console.log(body)
//     users.push({...body , id: users.length+1})
//     fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
//         return res.json({status:"success",id:users.length})
//     })
// })
// .patch((req,res) => {
//     const id = Number(req.params.id);
//     const array = users
//     const index = users.findIndex((user)=>user.id==id)
//     array[index] = req.body
//     array[index].id = id
//     fs.writeFile("./MOCK_DATA.json",JSON.stringify(array),(err,data)=>{
//         return res.json({status:"edited successfully",id:id})
//     })
// })
// .delete((req,res) => {
//     const id = Number(req.params.id);
//     const filteredusers = users.filter(user=>user.id!=id)
//     fs.writeFile('./MOCK_DATA.json',JSON.stringify(filteredusers),(err,data)=>{
//         return res.json({status:"deleted successfully",id:id})
//     })
// })

const PORT = 5500
app.listen(PORT, () => { console.log(`server started at port - ${PORT}`) })


