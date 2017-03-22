
var myRequest = new XMLHttpRequest();
var myRequest2 = new XMLHttpRequest();
var productContainer = document.getElementById("productContainer");
var saleSeason = document.getElementById("seasonSelector");
var productString = "";
var products=[];
var categories = [];
var season = "";


function productCards(){
  productString = "";
  for (var k=0; k<products.length; k++){

    productString += `<div class="column">`;
    productString += `<div class="col-sm-6 col-md-4">`;
    productString += `<div class="thumbnail">`;
    productString += `<div class="caption">`;
    productString += `<h3>${products[k].name}</h3>`;
    productString += `<p>${products[k].category_name}</p>`;
    if (products[k].category_season==season){
      productString += `<p>${products[k].category_discPrice}</p>`;
    } else {
      productString += `<p>${products[k].price}</p>`
    }
    productString += `</div></div></div></div>`
  }
  
  productContainer.innerHTML = productString;
}


function determineDepartment(xhrData2){
  categories=xhrData2.categories;
  products.forEach(function(products){
    for(var x=0; x< categories.length; x++){
      if (products.category_id===categories[x].id){
        products["category_name"] = categories[x].name;
        products["category_discount"] = categories[x].discount;
        products["category_season"] = categories[x].season_discount;
        var discountPrice = (1-categories[x].discount) * products.price;
        products["category_discPrice"] =discountPrice.toFixed(2);
      }
    }
    
  });
  
  productCards();
}
function productInfo(xhrData){

  products=xhrData.products;
  myRequest2.addEventListener("load", executeThisCodeAfterLoad2);
  myRequest2.addEventListener("error", executeThisCodeAfterFail);
  myRequest2.open("GET", "categories.json");
  myRequest2.send();

}

function executeThisCodeAfterLoad(){
  var data = JSON.parse(this.responseText);
  productInfo(data)
}

function executeThisCodeAfterFail(){
  console.log("boooooo");
}
function executeThisCodeAfterLoad2(){
  var data = JSON.parse(this.responseText);
  determineDepartment(data);
}

function whichSeason(event) {
  season=event.target.value;
  productCards();
}
myRequest.addEventListener("load", executeThisCodeAfterLoad);
myRequest.addEventListener("error", executeThisCodeAfterFail);
myRequest.open("GET", "products.json")
myRequest.send();
saleSeason.addEventListener("change", whichSeason);

