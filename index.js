let table = document.getElementById("usertable")
function userMelumat() {
    const data = fetch("https://reqres.in/api/users")
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            for (user of data.data) {
                //console.log(user);
                table.innerHTML += `
    <tr>
    <td><input type="text" class="form-control" id="first_name_${user.id}" value="${user.first_name}"></td>
    <td><input type="text" class="form-control" id="last_name_${user.id}" value="${user.last_name}"></td>
    <td><input type="text" class="form-control" id="email_${user.id}" value="${user.email}"></td>
    <td>
        <a href="" class="btn btn-warning" onclick="updateUser(${user.id})">Yenileme</a>
    </td>
    <td>
        <a href="" class="btn btn-danger" onclick="deleteUser(${user.id})">Sil</a>
    </td>
</tr>
                `
            }
        })
}
userMelumat()

//ANCHOR -  POST HİSSƏSİNDƏ EDİLƏCƏKLƏRDİ AŞAĞIDAKILAR
function refreshData() {
    userMelumat()
}
//Yəni təkrardan elətdir


//İstifadəçi yarat 

function createUser() {
    let data = {
        first_name: document.getElementById("first_name").value || "Dəyər yox",
        last_name: document.getElementById("last_name").value || "Dəyər yox",
        email: document.getElementById("email").value || "Dəyər yox"
    }
    fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            table.innerHTML += `
        <tr>
    <td><input type="text" class="form-control" id="" value="${data.first_name}"></td>
    <td><input type="text" class="form-control" id="" value="${data.last_name}"></td>
    <td><input type="text" class="form-control" id="" value="${data.email}"></td>
    <td>
        <a href="" class="btn btn-warning" onclick="updateUser(${data.id})">Yenileme</a>
    </td>
    <td>
        <a href="" class="btn btn-danger" onclick="deleteUser(${data.id})">Sil</a>
    </td>
</tr>
        `
        })
        .catch((error) => {
            console.log("Xəta", error);
        })
}


//ANCHOR -  PUT və DELETE HİSSƏSİNDƏ EDİLƏCƏKLƏRDİ AŞAĞIDAKILAR

//ANCHOR - PUT HİSSƏSİ

function updateUser(id) {
    console.log(id);
    let data = {
        first_name: document.getElementById("first_name_" + id).value || "Geçərsiz dəyər",
        last_name: document.getElementById("last_name_" + id).value || "Geçərsiz dəyər",
        email: document.getElementById("email_" + id).value || "Geçərsiz dəyər"
    };
    console.log(data);
    fetch("https://reqres.in/api/users", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(veri => { console.log("İstifadəçi yeniləndi", veri) })
        .catch((error) => console.log(error));
}


//ANCHOR - DELETE HİSSƏSİ

function deleteUser(id) {
    console.log(id);
    fetch("https://reqres.in/api/users/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => console.log(response))
        .then(data => {
            console.log("İstifadəçi silindi", data);
        })
        .catch((error) => console.log(error));
}