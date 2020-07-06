function resolve1(data) {
    let tempArr = [];
    var selectId = document.getElementById("admArea");
    data.forEach(elem => {
        if (elem.admArea) {
            if (!tempArr.includes(elem.admArea)) {
                var createOption = document.createElement("option");
                createOption.innerHTML = elem.admArea;
                selectId.appendChild(createOption);
                tempArr.push(elem.admArea);
            }
        }
    });
}

function resolve2(data) {
    let tempArr = [];
    var selectId = document.getElementById("district");
    data.forEach(elem => {
        if (elem.district) {
            if (!tempArr.includes(elem.district)) {
                var createOption = document.createElement("option");
                createOption.innerHTML = elem.district;
                selectId.appendChild(createOption);
                tempArr.push(elem.district);
            }
        }
    });
}

function resolve3(data) {
    let tempArr = [];
    var selectId = document.getElementById("typeObject");
    data.forEach(elem => {
        if (elem.typeObject) {
            if (!tempArr.includes(elem.typeObject)) {
                var createOption = document.createElement("option");
                createOption.innerHTML = elem.typeObject;
                selectId.appendChild(createOption);
                tempArr.push(elem.typeObject);
            }
        }
    });
}

function resolve2_1(data) {
    let tempArr = [];
    var selectId = document.getElementById("district1");
    data.forEach(elem => {
        if (elem.district) {
            if (!tempArr.includes(elem.district)) {
                var createOption = document.createElement("option");
                createOption.innerHTML = elem.district;
                selectId.appendChild(createOption);
                tempArr.push(elem.district);
            }
        }
    });
}

function selecttable(data) {
    if (data.length) {
        var cell = [];
        data.forEach(dt => {
            cell += "<tr>";
            cell += "<td>"+dt.name+"</td>";
            cell += "<td>"+dt.typeObject+"</td>";
            cell += "<td>"+dt.address+"</td>";
            
        })
        
        document.getElementById("data").innerHTML = cell
        
    }
    
}
window.onload = function () {
    const apilink = `http://exam-2020-1-api.std-900.ist.mospolytech.ru/api/data1`;
    const request = new XMLHttpRequest();
    const request2 = new XMLHttpRequest();
    const request3 = new XMLHttpRequest();
    const request4 = new XMLHttpRequest();
    const request5 = new XMLHttpRequest();
    request.open('GET', apilink);
    request2.open('GET', apilink);
    request3.open('GET', apilink);
    request4.open('GET', apilink);
    request5.open('GET', apilink);

    request.onload = () => resolve1(JSON.parse(request.response));
    request.send();

    request2.onload = () => resolve2(JSON.parse(request2.response));
    request2.send();

    request3.onload = () => resolve3(JSON.parse(request3.response));
    request3.send();

    request4.onload = () => selecttable(JSON.parse(request4.response));
    request4.send();

    request5.onload = () => resolve2_1(JSON.parse(request5.response));
    request5.send();

    document.querySelector("form").addEventListener("submit", function(e) {
        e.preventDefault();
        var area = document.querySelector("#admArea");
        var area_val = area.options[area.selectedIndex].value;
        var distr = document.querySelector("#district");
        var distr_val = distr.options[distr.selectedIndex].value;
        var type = document.querySelector("#typeObject");
        var type_val = type.options[type.selectedIndex].value;
        var rests = document.querySelector("#tableRests");
        var rests_val = rests.options[rests.selectedIndex].value == "Есть" ? 1 : 0;
        document.querySelectorAll("#data tr").forEach(elem => elem.remove());
        selecttable(JSON.parse(request.response).filter(elem => {
            let result = true;
            if (area_val != "Не выбрано") {
                result *= (elem.admArea == area_val);
            }
            if (distr_val != "Не выбрано") {
                result *= (elem.district == distr_val);
            }
            if (type_val != "Не выбрано") {
                result *= (elem.typeObject == type_val);
            }
            if (rests_val != "Не выбрано") {
                result *= (elem.socialPrivileges == rests_val);
            }
            return result;
            
        }));
    });
}


