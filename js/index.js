const loadPhone = async (searchText='iphone',isShowAll) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  //console.log(phones);
  // console.log(phones);
  displayPhones(phones,isShowAll);
}

const displayPhones = (phones,isShowAll) =>{
  // console.log(phones)
  //1: where you want set...

  const phoneContainer = document.getElementById('phone-container');


  //clear phone container cards before adding new cards
  phoneContainer.textContent = '';

  //set how many output you want and after that left of the element will appear by click on show more button
  const showAllContainer = document.getElementById('show-more-container')
  if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden')
  }
  else{
      showAllContainer.classList.add('hidden');
   }

  if(!isShowAll){
    phones = phones.slice(0,12)
  }

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
          <p></p>
          <div class="card-actions justify-end">
              <button onclick="handleShowDetail('${phone.slug}')"class = "btn btn-primary"> Show details </button>
          </div>
      </div>
      `;
      // 4 append child
      phoneContainer.appendChild(phoneCard);
  })
}

const handleSearch = (isShowAll) =>{
  //console.log('search clicked')
  const searchField = document.getElementById('search-field').value;
  //console.log(searchField)
  loadPhone(searchField, isShowAll);
}

//handle see all button

const handleSeeAll = () => {
  //console.log('see all clicked')
  handleSearch(true);
}

const handleShowDetail = async (id) => {
    //console.log("show detail click")

    //load single phone data
   const res = await fetch (` https://openapi.programming-hero.com/api/phone/${id}`)
   const data = await res.json();
   const phone = data.data;
   showPhoneDetail(phone)

}
 const showPhoneDetail = (phone) => {
  console.log(phone);
  show_detail_modal.showModal();
  const phoneName = document.getElementById('shoe-detail-phone-name');
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show-detail-container')
  showDetailContainer.innerHTML = `
    <img src="${phone.image}"/>
    <p> Storage: "${phone.mainFeatures
      .storage}/p>
      <p> Brand: "${phone.brand}"</p>
      <p> releaseDate: "${phone.releaseDate}"</p>
  `
 }

loadPhone();