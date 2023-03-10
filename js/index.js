const loadPhones = async(searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit);
}
const displayPhones = (phones,dataLimit) => {
   const phonesContainer = document.getElementById('phones-container');
   phonesContainer.textContent = '';
   //display 10 phones only
   const showAll = document.getElementById('show-all');
   if(dataLimit && phones.length > 10){
    phones = phones.slice(0,10);
   showAll.classList.remove('d-none');

   }
   else{
    showAll.classList.add('d-none');
   }
  
   //display no phones found
   const noPhone = document.getElementById('no-found-message');
   if(phones.length === 0){
    noPhone.classList.remove('d-none');
   }
   else{
    noPhone.classList.add('d-none');
   }
   phones.forEach(phone =>{
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML= `
     <div class="card p-4" >
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-outline-info"data-bs-toggle="modal" data-bs-target="#phoneDetailModal">show More</button>
                     
                    </div>
                  </div>
    `;
    phonesContainer.appendChild(phoneDiv);
   });
   //stop loading
   toggleSpinner(false);

}
const processSearch = (dataLimit) =>{
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText,dataLimit);
}
document.getElementById('btn-search').addEventListener('click',function(){
  //start loader
  processSearch(10);

});
//input search enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e){
  
  if(e.key === 'Enter'){
    processSearch(10);
  }
}); 
const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }

}
document.getElementById('btn-showAll').addEventListener('click',function(){
  processSearch();
});

const loadPhoneDetails = async id =>{
  const url = `http://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
  console.log(phone);
  const modalTitle = document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById('phoneDetails');
  phoneDetails.innerHTML = `
  <img src="${phone.image}" style="float: left;margin-left: 139px;">
  <p style="margin-top: 245px;">Release Date : ${phone.releaseDate ? phone.releaseDate : 'NO release date Found'}</p>
  <p>Storage:${phone.mainFeatures.storage}</p>
  <p> Others : ${phone.others ? phone.others.Bluetooth : 'NO Bluetooth Information'}</p>
  
  `
}
loadPhones('apple');