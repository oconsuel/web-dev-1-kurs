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


window.onload = function () {
    const apilink = `http://exam-2020-1-api.std-900.ist.mospolytech.ru/api/data1`;
    const request = new XMLHttpRequest();
    const request2 = new XMLHttpRequest();
    request.open('GET', apilink);
    request2.open('GET', apilink);

    request.onload = () => resolve1(JSON.parse(request.response));
    request.send();

    request2.onload = () => resolve2(JSON.parse(request2.response));
    request2.send();
}