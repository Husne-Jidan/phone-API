const loadPhone = async (searchText) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  console.log(phones);
  // console.log(phones);
  displayPhones(phones);
}

const displayPhones = phones =>{
  // console.log(phones)
  //1: where you want set...

  const phoneContainer = document.getElementById('phone-container');


  //clear phone container cards before adding new cards
  phoneContainer.textContent = '';

  //set how many output you want and after that left of the element will appear by click on show more button
  const showAllContainer = document.getElementById('show-more-container')
  if(phones.length > 12){
      showAllContainer.classList.remove('hidden')
  }
  else{
      showAllContainer.classList.add('hidden');
   }

  phones = phones.slice(0,12)

  phones.forEach(phone =>{
      //console.log(phone);
      // 2 create a div
      const phoneCard = document.createElement('div');
      phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
      // 3: set inner html
      phoneCard.innerHTML = `
      <figure><img src="${phone.image}" alt="Shoes" /></figure>
      <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.slug}</p>
          <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
          </div>
      </div>
      `;
      // 4 append child
      phoneContainer.appendChild(phoneCard);
  })
}

const handleSearch = () =>{
  //console.log('search clicked')
  const searchField = document.getElementById('search-field').value;
  //console.log(searchField)
  loadPhone(searchField);
}

