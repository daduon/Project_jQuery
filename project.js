function getUrl() {
    var url ="https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(() =>{
    requestApi();
    $('#recipe').on('change',function(){
        var recipes = $('#recipe').val();
        getRecipe(recipes);
    });

});
function requestApi(){
    $.ajax({
        dataType: 'json',
        url:getUrl(),
        success: (data) => chhosenRechipe(data.recipes),
        error: () => console.log("Cannot get data"),
    })
}
var alldata = [];
function chhosenRechipe(rechipe){
    alldata = rechipe;
    rechipe.forEach(element => {
        Option +=`
            <option value = "${element.id}">${element.name}</option>
        `;
    });
    $('#recipe').append(Option);
}
    // var myString = "<step>Add the avocado, sugar and concentrated milk into the blender<step>Add the ice<step>Mix for 10 mins";
    // var arr = myString.split('<step>');
    // console.log(myString);
    // console.log(arr[0]);
    // console.log(arr[1]);
    // console.log(arr[2]);
function getRecipe(rechipeId){
    alldata.forEach(element =>{
        if(element.id == rechipeId){
            var step = element.instructions;
            var cutStep = step.split('<step>');
            // cutStep.forEach(myStep =>{
            //     countStep++;
            //     resultStep +=`
            //         <tr>
            //             <td>${countStep}</td>
            //             <td>${myStep}</td>
            //         </tr>
            //     `;
            // });
            var countStep =1;
            var resultStep = "";
            for(let i =1; i< cutStep.length; i++){
                resultStep += `
                    <tr>
                        <td><p>Step</p></td>
                        <td>${countStep} </td>
                        <td>${cutStep[i]} </td>
                    </tr>
                `;
                countStep++;
               console.log(cutStep[i]);
               console.log(countStep);
            };
            $('#result-step').html(resultStep);
           getEachRecipe(element.iconUrl,element.name,element.ingredients);
        };
    });   
};
var getEachRecipe = (img,name,ingredient) =>{
    gerInstructions(ingredient);
    var result = "";
    result +=`
        <img src="${img}" width="100">
        <p>${name}</p>
    `;
    $('#result').html(result);
}
var gerInstructions=(item)=>{
    var result ="";
    item.forEach(myItem =>{
        result +=`
            <tr>
                <td>${myItem.name}</td>
                <td>${myItem.quantity}</td>
                <td>${myItem.unit[0]}</td>
                <td><img src="${myItem.iconUrl}" width="60"/></td>
            </tr>
        `;   
    });
    $("#result-ingrecient").html(result);
};
function cutStep(step){
    console.log(step);
}