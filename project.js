
$(document).ready(() => {
    $('#choose_name').on('change', () => {
        var choose = $('#choose_name').val();
        Selection(choose);
    });
    requesDataApi();

// sum data in api
    $('#add').on('click', () =>{
        var addNumber = $('#sum').val();
        addData(addNumber);
    });
// minus data in api
$('#minus').on('click', () =>{
    var minusNumber = $('#sum').val();
    minusData(minusNumber);
});
});
// responce the seletion
var Selection = (getSeletion) => {
    var chooseSelet = parseInt(getSeletion);
    switch (chooseSelet) {
        case 0:
            console.log('number1');
            break;
        case 1:
            console.log('number2');
            break;
        case 2:
            console.log('number3');
            break;
    }
}

var hideAlert = () =>{
    $('.alert').hide();
}

// reques data from api
var requesDataApi = () => {
    $.ajax({
        dataType: 'json',
        url: responceUrl(),
        success: (data) => getData(data),
        error: () => getError(),
    });
};
// responce url
var responceUrl = () => {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
};
// responce get data
var getData = (myData) => {
    myData.recipes.forEach(element => {
        dataoutIngredients(element);
        outRecipes(element);
        // console.log(element.iconUrl);

    });
};
// responce data error
var getError = () => {

};
// responce loop data
var dataoutIngredients = (element) => {
    element.ingredients.forEach(item => {
        outIngredients(item);
        // console.log(item.name);
    });
};
// responce data api output in html
var outIngredients = (item) => {
    // console.log(item);
    var resulIngredients = "";
    resulIngredients += `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
            <td><img src="${item.iconUrl}" class="img-fluid" width="50px"/></td>
        </tr>
    `;
    $('#ingredients').append(resulIngredients);
};
// responce output recipe
var outRecipes = (element) => {
    resultRecipes = "";
    // console.log(element);
    resultRecipes += `
        <div class="card shadow-lg mt-5">
        <div class="card-body mt-5">
        <img src="${element.iconUrl}" class="img-fluid"/>
    </div>
        </div>
    `;
    $('#recipes').append(resultRecipes);
};

// This is plus number
var addData =(sum) =>{
    var add = parseInt(sum) + 1;
    if (add <= 15) {
        $('#sum').val(add);
    }
}

// This is minus number

var minusData =(sum) =>{
    var minus = parseInt(sum) - 1;
    if (minus >= 0) {
        $('#sum').val(minus);
    }
}