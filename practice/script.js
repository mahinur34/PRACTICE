function getRecipes(){

    let ingredient = document.getElementById("ingredient").value;
    document.getElementById("meals").innerHTML = "";
    document.getElementById("ingredient").value = "";
    document.getElementById("ingredient").focus();

    if(!ingredient){
        alert("Lütfen bir malzeme giriniz.");
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        if(data.meals){

            data.meals.forEach(meal => {
                document.getElementById("meals").innerHTML += `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h4>${meal.strMeal}</h4>
                    <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">Tarifi Gör</a>
                </div>`;
            });
            
        }
        else {
            document.getElementById("meals").innerHTML = "Bu malzemeyle bir yemek bulunamadı."
        }
    })
    .catch(err => {
        console.error(err);
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    });

    document.body.style.alignItems = "start";
    document.querySelector(".container").style.margin = "20px 0";
    document.querySelector(".container").style.maxWidth = "1000px";
}

btnSearch.onclick = getRecipes;
document.getElementById("ingredient").onkeydown = (event)=>{
    if(event.key == "Enter"){
        getRecipes();
    }
}