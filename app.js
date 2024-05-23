const filterBtn=document.querySelector(".filterBtn");
const themeBtn=document.querySelector(".themeBtn");
const sunIcon=document.querySelector("#sun");
const moonIcon=document.querySelector("#moon");
const countryCon=document.querySelector(".country-container");
const search=document.querySelector(".userInput");

const theme=()=>{
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
}
theme();

let data; 

const fetchData = async () => {
  try {
    const res = await fetch('data.json');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    data = await res.json();
    let countriesHTML = '';

    data.forEach(des => {
      countriesHTML += `
        <div class="country">
          <img src=${des.flags.svg} alt="" loading="lazy">
          <section class="country-detail">
            <a href="country.html?name=${encodeURIComponent(des.name)}"><h2 class="country-name">${des.name}</h2></a>
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

filterBtn.addEventListener("change",(e)=>{
  const selectRegion=e.target.value;
  filterByRegion(selectRegion);
})

const filterByRegion=(region)=>{
  const filterData=data.filter(country => country.region==region);
  displayFilterData(filterData);
}

const displayFilterData=(filterData)=>{
  let countriesHTML = '';
  filterData.forEach(des=>{
    countriesHTML += `
        <div class="country">
          <img src=${des.flags.svg} alt="" loading="lazy">
          <section class="country-detail">
            <a href="country.html?name=${encodeURIComponent(des.name)}"><h2 class="country-name">${des.name}</h2></a>
            <p><b>Population: </b>${des.population}</p>
            <p class="region-name"><b>Region: </b>${des.region}</p>
            <p><b>Capital: </b>${des.capital}</p>
          </section>
        </div>
      `;
  });
  countryCon.innerHTML = countriesHTML;
}

search.addEventListener("input",(e)=>{
  const searchTerm=e.target.value.toLowerCase();
  const filteredData=data.filter(des => des.name.toLowerCase().includes(searchTerm));
  displayFilterData(filteredData);
})
