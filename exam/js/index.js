company = false;
privilege = false;
soc_discount = 0;

function resolve1(data) {
    let result = [];
    var select = document.getElementById("admArea");
    data.forEach(elem => {
        if (elem.admArea) {
            if (!result.includes(elem.admArea)) {
                var opt = document.createElement("option");
                opt.innerHTML = elem.admArea;
                select.appendChild(opt);
                result.push(elem.admArea);
            }
        }
    });
}

function resolve2(data) {
    let result = [];
    var select = document.getElementById("district");
    data.forEach(elem => {
        if (elem.district) {
            if (!result.includes(elem.district)) {
                var opt = document.createElement("option");
                opt.innerHTML = elem.district;
                select.appendChild(opt);
                result.push(elem.district);
            }
        }
    });
}

function resolve3(data) {
    let result = [];
    var select = document.getElementById("typeObject");
    data.forEach(elem => {
        if (elem.typeObject) {
            if (!result.includes(elem.typeObject)) {
                var opt = document.createElement("option");
                opt.innerHTML = elem.typeObject;
                select.appendChild(opt);
                result.push(elem.typeObject);
            }
        }
    });
}

function resolve2_1(data) {
    let result = [];
    var select = document.getElementById("district1");
    data.forEach(elem => {
        if (elem.district) {
            if (!result.includes(elem.district)) {
                var opt = document.createElement("option");
                opt.innerHTML = elem.district;
                select.appendChild(opt);
                result.push(elem.district);
            }
        }
    });
}

function selecttable(data) {
    if (data.length) {
        var cell = [];
        data.forEach(dt => {
            cell += "<tr id='obj_"+dt.id+"'>";
            cell += "<td>"+dt.name+"</td>";
            cell += "<td>"+dt.typeObject+"</td>";
            cell += "<td>"+dt.address+"</td>";
            cell += "<td><button class='select'>Выбрать</button></td>";
        })
        
        document.getElementById("data").innerHTML = cell
        
    }
    
}

function count_sum() {
    var sum = 0;
    var count = 0;
    document.querySelectorAll(".box").forEach(elem => {
        let price = elem.querySelector(".priceset").innerHTML;
        let qty = elem.querySelector(".range_value span").innerHTML;

        count += parseInt(qty);
        sum += price * qty;
    });
    if (company) {
        sum *= 2.5;
        count *= 5;
    }
    if (privilege && soc_discount) {
        sum *= soc_discount;
    }
    document.querySelector(".final_qty").innerHTML = count;
    document.querySelector(".final_sum").innerHTML = sum;
}


window.onload = function () {
    var visible = false;
    var id = 0;
    var res;
    const api = `http://exam-2020-1-api.std-900.ist.mospolytech.ru/api/data1`;
    const request = new XMLHttpRequest();
    request.open('GET', api);

    request.onload = () => {
        res = JSON.parse(request.response); 
        resolve1(res);
        resolve2(res);
        resolve3(res);
        selecttable(res);
        resolve2_1(res);
    };
    request.send();

    document.querySelectorAll(".range").forEach(elem => {
        elem.addEventListener("input", function(e) {
            var val = e.target.parentElement.querySelector(".range_value span");
            val.innerHTML = e.target.value;
            count_sum();
        });
    });

    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("select")) {
            document.querySelectorAll(".current_res").forEach(elem => {
                elem.classList.remove("current_res");
            });
            var parent = e.target.parentElement.parentElement;
            parent.classList.add("current_res");
            id = parent.id.split("_")[1];

            var ind = 1;
            res.forEach(r => {
                if (r['id'] == id) {
                    document.querySelectorAll(".box .priceset").forEach(elem => {
                        elem.innerHTML = r['set_' + ind];
                        ind++;
                    });
                    if (r['socialPrivileges']) {
                        soc_discount = r['socialDiscount'] / 100;
                        document.querySelector(".privilege").disabled = false;
                        privilege = false;
                        document.querySelector(".privilege").checked = false;
                    } else {
                        document.querySelector(".privilege").disabled = true;
                    }
                }
            })
            if (!visible) {
                document.querySelector(".menu").style.display = "flex";
                visible = true;
            }
            count_sum();
        }
    })

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
        selecttable(JSON.parse(request.response).sort(function (obj1, obj2) {
            return obj1.rate - obj2.rate;
        }).filter(elem => {
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

    document.querySelectorAll(".dop_opt input[type='checkbox']").forEach(elem => {
        elem.addEventListener("change", function(e) {
            var checked = e.target.checked;
            if (elem.classList.contains("company")) {
                company = checked;
            } else {
                privilege = checked;
            }
            count_sum();
        });
    });
}

function clickHandler(event) {
    let target = event.target;
    if (target.tagName != 'BUTTON') return;

    let modalName = document.getElementById('modalName');
    let modalAdmArea = document.getElementById('modalAdmArea');
    let modalDistrict = document.getElementById('modalDistrict');
    let modalAddress = document.getElementById('modalAddress');
    let modalRate = document.getElementById('modalRate');

    const api = `http://exam-2020-1-api.std-900.ist.mospolytech.ru/api/data1/`;
    const request = new XMLHttpRequest();
    request.open('GET', api + `${target.id}`);

    if (target.id != '') {
        console.log(target.id);
        request.onload = reqListener;
        function reqListener() {

            modalName.innerText = JSON.parse(request.response).name;
            modalAdmArea.innerText = JSON.parse(request.response).admArea;
            modalDistrict.innerText = JSON.parse(request.response).district;
            modalAddress.innerText = JSON.parse(request.response).address;
            modalRate.innerText = JSON.parse(request.response).rate;
        }
        request.send();
    }
}