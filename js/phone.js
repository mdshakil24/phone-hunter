
// This is the first way to load data
// function loadPhone() {
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     .then(response => response.json())
//     .then(data => console.log(data))
// }

// loadPhone()

// Or 

// const loadPhone = () => {
//     fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     .then(res => res.json())
//     .then(data => console.log(data));
// }
// loadPhone()

// This is the second way to load data

// load phone from API
const loadPhone = async (searchText='iphone',isShowAll) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phones = data.data;
    console.log(isShowAll);

    // if((phones.length === 0 || !searchText) && !isShowAll) {
    //     document.getElementById('didNotGetData').innerHTML = `<h2 class="text-center text-3xl w-full">No Data Available</h2>`;
    // }else {
    //     document.getElementById('inputText').innerText = 'iphone';
    // }

    
    displayPhones(phones,isShowAll);


   
}
// this is call for default search value
loadPhone();


// Display phones 
const displayPhones = (getPhoneData,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');

    // clear the previous search result
    phoneContainer.textContent = '';

    // Display show all button If there are more than 9 phones
    const showAllBtn = document.getElementById('show-all-btn');
    if(getPhoneData.length > 9 && !isShowAll) {
        showAllBtn.classList.remove('hidden');
    }else {
        showAllBtn.classList.add('hidden');
    }


    // display only first 9 phones If not show all 
    if(!isShowAll) {
        getPhoneData =  getPhoneData.slice(0,9);
    }

    getPhoneData.forEach((phoneElement) => {
        // console.log(phoneElement)
        const createDiv = document.createElement('div');
        createDiv.classList = 'card bg-white shadow-xl'
        createDiv.innerHTML = `
        <figure class="p-5 pb-0">
                  <img
                    src="${phoneElement.image}"
                    alt="phoneImage" />
                </figure>
                <div class="card-body p-5">
                  <h2 class="card5title text-black font-semibold">${phoneElement.phone_name}</h2>
                  <p class="text-black">If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-center">
                    <button onclick='handleShowDetails("${phoneElement.slug}");' class="btn btn-primary w-40 mt-3">Show Details</button>
                  </div>
                </div>
        `;
        phoneContainer.appendChild(createDiv);
    });

    handleLoading(false);

}

// handle show details 
const handleShowDetails = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const phone = data.data; 
    showDetails(phone);
}

const showDetails = (phone) => {
    console.log(phone);

    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
        <div class='text-center'>
            <img class="block m-auto" src='${phone.image}' alt='phoneImage'>
        </div>
        <div class='phone-details py-5'>
         <h3 class="text-xl font-bold">${phone.name}</h3>
            <p class='my-3'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <p><span class='font-bold'>Storage : </span> ${phone.mainFeatures?.storage}</p>
            <p><span class='font-bold'>Display Size : </span> ${phone.mainFeatures?.displaySize} </p>
            <p><span class='font-bold'>Chipset: </span> ${phone.mainFeatures?.chipSet} </p>
            <p><span class='font-bold'>Memory: </span> ${phone.mainFeatures?.memory} </p>
            <p><span class='font-bold'>Slug: </span> ${phone.slug}</p>
            <p><span class='font-bold'>Release data: </span> ${phone?.releaseDate || 'No release date'}</p>
            <p><span class='font-bold'>Brand: </span> ${phone.brand}</p>
            <p><span class='font-bold'>GPS: </span> ${phone.others?.GPS ? phone.others.GPS : "No GPS"}</p> 
        </div>
    `;

    show_details.showModal();
}

// handle search phone
const searchPhone = (isShowAll) => {
    handleLoading(true);
    const searchText = document.getElementById('inputText').value;
    loadPhone(searchText,isShowAll);
}


// handle loading spinner
const handleLoading = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading) {
        loadingSpinner.classList.remove('hidden');
    }else {
        loadingSpinner.classList.add('hidden');
    }
}


// handle show all phones
const showAllPhones = () => {
    handleLoading(true);
    searchPhone(true);

}





