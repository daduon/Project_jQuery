var sumAvocado;
var sumFrench;
$(document).ready(function () {
       Avocado();
       French(); 
    // This is code for increase ingredient of Avocado Shake (Toek KaLok)
    $('#aAvocado').on('click', function () {
        var sum = $('#sAvocado').val();
        updateAvocado();
        sumAvocado = sum;
        addAvocado(sum);
    });
    $('#mAvocado').on('click', function () {
        var minus = $('#sAvocado').val();
        updateAvocado();
        sumAvocado = minus;
        minusAvocado(minus);
    });
    // This is code for increase ingredient of French creps
    $('#aFrench').on('click', function () {
        var sum = $('#sFrench').val();
        updateFrench();
        sumFrench = sum;
        addFrench(sum);
    });
    $('#mFrench').on('click', function () {
        var minus = $('#sFrench').val();
        updateFrench();
        sumFrench = minus;
        minusFrench(minus);
    });
});

var Avocado=()=> {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => defaultAvocado(data),
        error: () => getError(),
    });
}
var getUrl=() =>{
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
 // This is code for output  Avocado Shake (Toek KaLok) image and name
var defaultAvocado=(myData)=> {
    var result ="";
    myData.recipes.forEach( recipe => {
        if(recipe.id == 0){
             result+=`
            <div class="card-header">
                ${recipe.name}
            </div>
            <div class="card-body">
                <img src="${recipe.iconUrl}" class="img-fluid"/>
            </div>
            <div class="card-footer">
                ${recipe.instructions}
            </div>
        `;
        Avocadoingredient(recipe);
        };
    });
    $('#Avocado').html(result);
}
 // This is code for output ingredients of  Avocado Shake (Toek KaLok)
var Avocadoingredient=(myIngredients)=> {
    result = "";
    myIngredients.ingredients.forEach(item => {
        result += `
            <tr>
                <td><img src="${item.iconUrl}" width="100"></td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.unit[0]}</td>
            </tr>
        `;
    });
    $('#ingredientAvocado').html(result);  
}
var updateAvocado=()=> {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => getAvocado(data),
        error: () => getError(),
    });
}
// This is code for increase ingredient of Avocado Shake (Toek KaLok)
var getAvocado=(myData)=> {
    myData.recipes.forEach( recipe => {
        var result = "";
        if(recipe.id ==0){
            recipe.ingredients.forEach(item => {
            result += `
                <tr>
                    <td><img src="${item.iconUrl}" width="100"></td>
                    <td>${item.name}</td>
                    <td>${item.quantity * sumAvocado}</td>
                    <td>${item.unit[0]}</td>
                </tr>
            `;
        });
       $('#ingredientAvocado').html(result);
        }
        
    });
}
// This is code for increase ingredient of Avocado Shake (Toek KaLok)
var addAvocado = (num) => {
    var number = parseInt(num) + 1;
    if (number <= 15) {
        $('#sAvocado').val(number);
        conpute(number);
    }
}
var minusAvocado = (num) => {
    var number = parseInt(num) - 1;
    if (number >= 0) {
        $('#sAvocado').val(number);
    }
}
 // This is code for output French creps
var French=()=> {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => defaultFrench(data),
        error: () => getError(),
    });
}
// This is code for output French creps image and name
var defaultFrench=(myData) =>{
    var result ="";
    myData.recipes.forEach( recipe => {
        if(recipe.id == 1){
            console.log(recipe);
             result+=`
            <div class="card-header">
                ${recipe.name}
            </div>
            <div class="card-body">
                <img src="${recipe.iconUrl}" class="img-fluid"/>
            </div>
            <div class="card-footer">
                ${recipe.instructions}
            </div>
        `;
        FrenchIngredient(recipe);
        };
    });
    $('#French').html(result);
}
// This is code for output ingredinets of French creps
var FrenchIngredient=(myIngredients) =>{
    result = "";
    myIngredients.ingredients.forEach(item => {
        result += `
            <tr>
                <td><img src="${item.iconUrl}" width="100"></td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.unit[0]}</td>
            </tr>
        `;
    });
    $('#ingredientFrench').html(result);  
}
// This is code for update ingredinets of French creps
var updateFrench=()=> {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => getFrench(data),
        error: () => getError(),
    });
}
var getFrench=(myData)=> {
    myData.recipes.forEach( recipe => {
        var result = "";
        if(recipe.id ==1){
            recipe.ingredients.forEach(item => {
            result += `
                <tr>
                    <td><img src="${item.iconUrl}" width="100"></td>
                    <td>${item.name}</td>
                    <td>${item.quantity * sumFrench}</td>
                    <td>${item.unit[0]}</td>
                </tr>
            `;
        });
       $('#ingredientFrench').html(result);
        }
    });
}
    // This is code for increase ingredient of French creps
var addFrench = (num) => {
    var number = parseInt(num) + 1;
    if (number <= 15) {
        $('#sFrench').val(number);
        conpute(number);
    }
}
var minusFrench = (num) => {
    var number = parseInt(num) - 1;
    if (number >= 0) {
        $('#sFrench').val(number);
    }
}
