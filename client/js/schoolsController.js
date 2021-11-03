const url = 'http://localhost/institute/server/public/index.php'

const getSchools = async() => {
    await $.ajax({
        type: 'GET',
        url: url + '/school'
    }).done(res => {
        console.log(res);
        let listSchools = res.list;
        let table = $("#table");

        table.append(
        "<tr class='bg-dark text-light'>"+
        +"<th scope='col'></th>"
        +"<th scope='col'>#</th>"
        +"<th scope='col'>Nombre</th>"
        +"<th scope='col'>Calle</th>"
        +"<th scope='col'>Estado</th>"
        +"<th scope='col' class='text-center'>Detalles</th>"
        +"<th scope='col' class='text-center'>Editar</th>"
        +"<th scope='col' class='text-center'>Borrar</th>"
        +"</tr>")

        for(let i = 0; i < listSchools.length; i++){
            table.append("<tr>"
            +"<td>"+listSchools[i].id + "</td>"
            +"<td>"+listSchools[i].name + "</td>"
            +"<td>"+listSchools[i].street + "</td>"
            +"<td>"+listSchools[i].status + "</td>"
            +"<td class='text-center'><button class='btn btn-primary' data-toggle='modal' data-target='#details' onclick='getDetails("+listSchools[i].id+")'><i class='fas fa-info-circle'></i></button></td>"
            +"<td class='text-center'><button class='btn btn-warning' data-toggle='modal' data-target='#update' onclick='getInfoUpdate("+listSchools[i].id+")'><i class='far fa-edit'></i></button></td>"
            +"<td class='text-center'><button class='btn btn-danger' data-toggle='modal' data-target='#delete' onclick='remove("+listSchools[i].id+")'><i class='far fa-trash-alt'></i></button></td>"
            +"</tr>")
        }
    });
}

const getById = async (id) => {
    return await $.ajax({
        type: 'GET',
        url: url+'/school/'+id
    }).done(res => res);
}

const getDetails = async (id) => {
    let school = await getById(id);
    let c = new Date(school.school[0].created.date);

    document.getElementById('name').innerHTML = school.school[0].name;
    document.getElementById('street').innerHTML = school.school[0].street;
    document.getElementById('status').innerHTML = school.school[0].status ? "Activo" : "Inactivo";
    document.getElementById('created').innerHTML = c.getDate()+'-'+c.getMonth()+'-'+c.getFullYear();
    if(school.school[0].updated == null){
        document.getElementById('updated').innerHTML = 'Sin Actualización';
    }else{
        let u = new Date(school.school[0].updated.date);
        document.getElementById('updated').innerHTML = u.getDate()+'-'+u.getMonth()+'-'+u.getFullYear();
    }
}

const getInfoUpdate = async (id) => {
    let school = await getById(id);
    document.getElementById('u_id').value = id;
    document.getElementById('u_name').value = school.school[0].name;
    document.getElementById('u_street').value = school.school[0].street;
}

const updateSchool = async () => {
    console.log('Espere...');
    let id = document.getElementById('u_id').value;
    let name = document.getElementById('u_name').value;
    let street = document.getElementById('u_street').value;

    console.log(id+name+street);

    await $.ajax({
        type: 'POST',
        url: url + '/school/update/' + id,
        data: {name, street}
    }).done(res => {
        console.log(res);
    });
}

const createSchool = () => {
    console.log('Espere...');
    let name = document.getElementById('c_name').value;
    let street = document.getElementById('c_street').value;

    $.ajax({
        type: 'POST',
        url: url + '/school/create',
        data: {name, street}
    }).done(res => {
        console.log(res);
    });
}

const remove = async(id) => {
    await $.ajax({
        type: 'POST',
        url: url + '/school/delete/' + id
    }).done(res => {
        console.log(res);
    });
}