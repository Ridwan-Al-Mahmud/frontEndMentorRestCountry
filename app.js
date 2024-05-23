const dropdown=document.querySelector(".dropdown");
const dropOpt=document.querySelector(".dropOpt");
const themeBtn=document.querySelector(".themeBtn");
const sunIcon=document.querySelector("#sun");
const moonIcon=document.querySelector("#moon");
const countryCon=document.querySelector(".country-container");
const search=document.querySelector(".userInput");
const regions=document.querySelectorAll(".region");

dropdown.addEventListener("click",()=>{
  dropOpt.classList.toggle("showOpt");
})

themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  if(document.body.classList.contains("dark")){
    sun.style.display="block";
    moon.style.display="none";
  }else{
    moon.style.display="block";
    sun.style.display="none";
  }
})


const fetchData = async () => {
  try {
    const res = await fetch('data.json');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json(); 
    let countriesHTML = '';

    data.forEach(des => {
      countriesHTML += `
        <div class="country">
          <img src=${des.flags.svg} alt="" loading="lazy">
          <section class="country-detail">
            <h4 class="country-name">${des.name}</h4>
            <p><b>Population: </b>${des.population}</p>
            <p class="region-name"><b>Region: </b>${des.region}</p>
            <p><b>Capital: </b>${des.capital}</p>
          </section>
        </div>
      `;
    });

    countryCon.innerHTML = countriesHTML;

  } catch (err) {
    console.error('Fetch error:', err);
  }
};

fetchData();

const countryName=document.querySelectorAll(".country-name");
search.addEventListener("input",()=>{
const   Array.from(countryName).forEach(country=>{
    if(country.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      country.parentElement.parentElement.style.display="grid";
    }else {
      country.parentElement.parentElement.style.display="none";
    }
  })
})

const regionName = document.querySelectorAll(".region-name");

regions.forEach(region => {
  region.addEventListener("click", (e) => {
    Array.from(regionName).forEach(elem => {
      if (elem.innerText.includes(region.innerText) || region.innerText === "All") {
        elem.parentElement.parentElement.style.display = "grid";
      } else {
        elem.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
