let architect = undefined;
let contractor = undefined;
let painter = undefined;
let electrician = undefined;
let flooring = undefined;
let furniture = undefined;
let plumber = undefined;

fetch('/MOCK_DATA.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    architect = data;
    contractor = data;
    painter = data;
    electrician = data;
    flooring = data;
    furniture = data;
    plumber = data;

    // Now all variables are assigned the fetched data
    // You can optionally do additional processing here
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });


// const architect = require('./MOCK_DATA.json')
// const contractor = require('./MOCK_DATA.json')
// const painter = require('./MOCK_DATA.json')
// const electrician = require('./MOCK_DATA.json')
// const flooring = require('./MOCK_DATA.json')
// const furniture = require('./MOCK_DATA.json')
// const plumber = require('./MOCK_DATA.json')

// const database = [...architect,...contractor,...painter,...electrician,...flooring,...furniture,...plumber]
const database = [architect, contractor, painter, electrician, flooring, furniture, plumber];

// $('#form').find('input, textarea').on('keyup blur focus', function (e) {

// const { response } = require("express");

  
//   var $this = $(this),
//       label = $this.prev('label');

// 	  if (e.type === 'keyup') {
// 			if ($this.val() === '') {
//           label.removeClass('active highlight');
//         } else {
//           label.addClass('active highlight');
//         }
//     } else if (e.type === 'blur') {
//     	if( $this.val() === '' ) {
//     		label.removeClass('active highlight'); 
// 			} else {
// 		    label.removeClass('highlight');   
// 			}   
//     } else if (e.type === 'focus') {
      
//       if( $this.val() === '' ) {
//     		label.removeClass('highlight'); 
// 			} 
//       else if( $this.val() !== '' ) {
// 		    label.addClass('highlight');
// 			}
//     }

// });

// $('.tab a').on('click', function (e) {
  
//   e.preventDefault();
  
//   $(this).parent().addClass('active');
//   $(this).parent().siblings().removeClass('active');
  
//   target = $(this).attr('href');

//   $('.tab-content > div').not(target).hide();
  
//   $(target).fadeIn(800);
  
// });

// document.getElementById('login').addEventListener('submit',(event)=>{
//   event.preventDefault();
//   const first_name = document.getElementById('first_name').value
//   const email = document.getElementById('email').value
//   const user = undefined
//   for(datab of database)
//   {
//     if(datab.first_name==first_name && datab.email==email)
//     {
//       document.getElementsByClassName('after-login').style.display = "visible";
//       document.getElementsByClassName('login-container').style.display = "none";
//       break;
//     }
//   }
//   window.location.assign('http://localhost:5500/home')
// })

document.getElementById('login').addEventListener('submit',(event)=>{
  event.preventDefault();
  const first_name = document.querySelector('#first_name-login').value;
  const email = document.querySelector('#email-login').value;
  let userFound = false;

  database.forEach((dataArray) => {
    dataArray.forEach((data) => {
        if (data && data.first_name === first_name && data.email === email) {
            userFound = true;
            return;
        }
    });
});

  if (userFound) {
    window.location.assign('http://localhost:5500/home');
    document.querySelector('.after-login').style.display = "visible";
    document.querySelector('.login-container').style.display = "none";
  } else {
    console.log("User not found");
  }
});

document.getElementById('signup').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = {
      "first_name": document.getElementById('first_name').value,
      "last_name": document.getElementById('last_name').value,
      "email": document.getElementById('email').value,
      "gender": document.getElementById('gender').value,
      "job_title": document.getElementById('job_title').value,
      "isloggedin": "false"
  };
  fetch('/login/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(res=>{
    if(res.status==200)
    {
      document.querySelector('#btn-login').click();
      console.log(res.json())
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
})