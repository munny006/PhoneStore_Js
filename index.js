const loadPhones = async() =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}
const displayPhones = phones =>{
   const phoneContainer = document.getElementById('phones-container')
   phones.foreach(phone =>{

   })
}
loadPhones();