// function for get API
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(() => {
    requestApi();
    $('#recipe').on('change', function () {
        var recipes = $('#recipe').val();
        getRecipe(recipes);
        hide();
        hides();
        addDataIngredient();
        minusDataIngredient();
    });
    $('.collapsible').collapsible();
});
//this is ajax for reques api
function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chhosenRechipe(data.recipes),
        error: () => console.log("Cannot get data"),
    });
};
//this is function for store api after keep in array for use another function
var alldata = [];
function chhosenRechipe(rechipe) {
    alldata = rechipe;
    rechipe.forEach(element => {
        Option += `
            <option value = "${element.id}">${element.name}</option>
        `;
    });
    $('#recipe').append(Option);
};
// this is function for get data from array
function getRecipe(rechipeId) {
    alldata.forEach(element => {
        if (element.id == rechipeId) {
            var step = element.instructions;
            $('#sum').val(element.nbGuests);//for getdata from guest into intput
            getDataVal = $('#sum').val();
// this is code for cut step in api
            var cutStep = step.split('<step>')
            var resultStep = "";
            for (let i = 1; i < cutStep.length; i++) {
                resultStep += `
                    <tr>
                        <td style="color:#fff">Step: ${i}</td>
                        <td class="text-light">${cutStep[i]} </td>
                    </tr>
                `;
            };
            $('#result-step').html(resultStep);
            getEachRecipe(element.iconUrl, element.name, element.ingredients);
        };
    });
};



//this is function for update recipe. sum from increas ingedients
var updateDataRecipe = (rechipeId, sum) => { 
    alldata.forEach(myItem => {
        if (myItem.id == rechipeId) {
            updateIngredient(myItem.ingredients, sum);
            $('#sum').val(sum);
        };
    });
};
// this is function for update ingredients and sum from update recipe
var updateIngredient = (item, sum) => {
    var result = "";
    item.forEach(myItem => {
        // this is code for calculator ingredients that update
        var addIngredient = myItem.quantity * parseInt(sum) / getDataVal;
        result += `
            <tr class="text-light">
                <td>${myItem.name}</td>
                <td>${addIngredient}</td>
                <td>${myItem.unit[0]}</td>
                <td><img src="${myItem.iconUrl}" class="rounded-circle" width="60" height="60"/></td>
            </tr>
        `;
    });
    $("#result-ingrecient").html(result);
};
// this is function for out put image name
var getEachRecipe = (img, name, ingredient) => {
    gerInstructions(ingredient);
    var result = "";
    result += `
        <div class="card-header bg-success" style="color:white; font-size:30px;">${name}</div>
        <div ><img src="${img}" class="img-thumbnail" width="100%"></div>
    `;
    $('#result').html(result);
};
// this is fuction for out put ingredient
var gerInstructions = (item) => {
    updateIngredient(item);
    var result = "";
    item.forEach(myItem => {
        result += `
            <tr class="text-light">
                <td>${myItem.name}</td>
                <td>${myItem.quantity}</td>
                <td>${myItem.unit[0]}</td>
                <td><img src="${myItem.iconUrl}" class="rounded-circle" width="60" height="60"/></td>
            </tr>
        `;
    });
    $("#result-ingrecient").html(result);
};
// this is code for increas and minus increas
var addDataIngredient = () => {
    $('#add').on('click', function () {
        addData();
        var sum = $('#sum').val();
        var recipes = $('#recipe').val();
        updateDataRecipe(recipes, sum);
    });
};
var minusDataIngredient = () => {
    $('#minus').on('click', function () {
        minusData();
        var sum = $('#sum').val();
        var recipes = $('#recipe').val();
        updateDataRecipe(recipes, sum);
    });
};
var addData = () => {
    var sum = $('#sum').val();
    var number = parseInt(sum) + 1;
    if (number <= 15) {
        $('#sum').val(number);
    };
};
var minusData = () => {
    var sum = $('#sum').val();
    var number = parseInt(sum) - 1;
    if (number >= 1) {
        $('#sum').val(number);
    };
};
// this is function for hide all in selete
var hide = () => {
    $('#hide').css('display', 'block');
};
var hides = () => {
    $('#hides').css('display', 'block');
};