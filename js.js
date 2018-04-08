// Declaring letiables
let count = 0;
let users = [];
let name=document.getElementById('name');
let number=document.getElementById('number');
let email=document.getElementById('email');
let lastID = -1;

// collects users details on completion of the form
function getFormDetails() {
    let userDetails = {'name': name.value, 'number':number.value, 'email':email.value};
    name.value = '';
    number.value = '';
    email.value = '';
    return userDetails;
}

function returnUserID(id){
    return parseInt(id.replace('user', ''));
}

// saves the contacts details on the web browser
function pushUserDetailsToForm(id){
    let userID = returnUserID(id)
    let userDetails = users[userID]
    name.value = userDetails['name']
    number.value = userDetails['number']
    email.value = userDetails['email']
    lastID = userID
}

// on-clicking the contact, all the users details come to light
function showUserDetails(id){           // On clicking on a contact name, the details of the contact is displayed.
    let userBlock = document.getElementById(id);
    let toggle={'block':'none', 'none':'block'};
    let displayOption = userBlock.style.display
    let userDetails = users[returnUserID(id)];
    if(displayOption === 'none'){
        let html = `<li>Name: ${userDetails['name']}</li>
           <li>Number: ${userDetails['number']}</li>
           <li>Email: ${userDetails['email']}</li>`
        document.getElementById(id).innerHTML = html;
    }
    userBlock.style.display = toggle[displayOption]
}

// delete a contact details by clicking a button
function deleteUser(id){
    let userID = parseInt(id.replace('user', ''));
    users.pop(userID);
    document.getElementById('div-'+id).remove();
}

// for the search form
function findNames(name){
    let results = [];
    users.forEach(function(user){
        if (user['name'].includes(name)){
            results.push(user);
        }
    });
    return results
}

function handleSubmission(){
    let userDetails = getFormDetails();
    let userID = 'user'+count;
    console.log(userDetails);
    if(lastID > -1){
        users[lastID] = userDetails;
        lastID = -1;
    }else {
        users.push(userDetails);
        let html =`
        <div id="div-${userID}">
            <span>Name:
            <a href="#${userID}" onclick="showUserDetails('${userID}')">${userDetails['name']}</a>
            <button type="button" onclick="pushUserDetailsToForm('${userID}')">Edit</button>
            <button type="button" onclick="deleteUser('${userID}')">Delete</button>
            </span>
            <ol id='${userID}' style="display: none">Contacts List </ol>
        </div>`;

        document.getElementById('submissions').insertAdjacentHTML("beforeend", html);
        count += 1;
    }
}