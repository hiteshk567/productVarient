let container = document.querySelector(".container");

let add = document.querySelector(".add");
let generate = document.querySelector(".generate");
let counter = 0;

let addOnprice = 30;
let data = [];
let varientCount = 0;
let varients = [];
let map = {
    "productName": "",
    "basePrice": "",
    "varients": [],
    "varientDetails": []
}
let k = {};
let elementCount;
let flag = 0;
let allVarients = [];
container.addEventListener("click", e => {
    let temp = e.target.value;

    if (temp === "add") {
        elementCount = flag;
        flag++;
        k = {};
        let div = createElement("div", "row");
        let varient = createVarient(elementCount);
        let input = createInput(elementCount);
        let button = createButton(elementCount);
        div.append(varient, input, button);
        container.append(div);
        varientCount++;
    } else if (temp && temp.includes("insert")) {
        let variantName = document.querySelector(".varient" + elementCount).value;
        let variantValue = document.querySelector(".value" + elementCount).value;
        k["type"] = variantName;
        variantValue = variantValue.split(" ");
        k["values"] = variantValue;
        varients.push(k);
    }
});

generate.addEventListener("click", e => {
    let name = document.querySelector("#name").value;
    let price = document.querySelector("#price").value;
    map["productName"] = name;
    map["basePrice"] = price;
    map["varients"] = varients;

    let temp = {};
    addOnprice = 30;
    calculate(varients, 0, varients.length, temp, 0);
    map["varientDetails"] = allVarients;
    data.push(map);
    allVarients = [];
    console.log(data);
    name.value = "";
    map = {};
});

function calculate(arr, l, r, temp, val) {
    if (l === r) {
        let size = 0;
        for (let key in temp) {
            if (key)
                size++;
        }
        if (size === r) {
            let k = {};
            for (let key in temp) {
                k[key] = temp[key];
            }
            k["addOnPrice"] = addOnprice;
            addOnprice += 10;
            allVarients.push(k);
        }
        return;
    }
    for (let i = l; i < r; i++) {
        for (let j = 0; j < arr[i]["values"].length; j++) {
            temp[arr[i]["type"]] = arr[i]["values"][j];
            // val += 1;
            calculate(arr, l + 1, r, temp, val);
            // val -= 1;
            delete temp[arr[i]["type"]];
        }
    }
}

function createVarient(value) {
    let input = document.createElement("input");
    input.className = "varient" + value;
    input.type = "text";
    return input;
}

function createInput(value) {
    let input = document.createElement("input");
    input.className = "value" + value;
    input.type = "text";
    return input;
};

function createButton(name) {
    let button = document.createElement("button");
    button.innerHTML = "Add these";
    button.type = "button";
    button.value = "insert" + varientCount;
    button.className = name;
    return button;
}


function createElement(tagName, className) {
    let element = document.createElement(tagName);
    if (tagName === "input") {
        element.type = "text";
        element.value = "";
    }
    if (tagName === "button") {
        // button.innerHTML =
    }
    if (className)
        tagName.className = className;
    return element;
}