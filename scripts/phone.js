
const loadPhone = async (search = "iphone") => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = phones => {

    const phoneContainer = document.getElementById("phone_container");

    // clear phone container card before adding new card
    phoneContainer.textContent = "";

    // display show all button if there are more then 12 phones
    const showAllContainer = document.getElementById("show_all_container");
    if (phones.length > 12) {
        showAllContainer.classList.remove("hidden")
    }
    else {
        showAllContainer.classList.add("hidden")
    }

    // display only 12 phones
    phones = phones.slice(0, 12);

    phones.forEach(phone => {
        // console.log(phone);

        const phoneCard = document.createElement("div");
        phoneCard.classList = `card bg-base-100 shadow-xl py-10`;
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone.brand}</h2>
            <p>${phone.phone_name}</p>
            <div class="card-actions justify-center mt-5">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn">Show Details</button>
            </div>
            </div>
            `
        phoneContainer.appendChild(phoneCard);

    });
    // hide loading
    toggleLoading(false)
}


const handleShowDetails = async (id) => {
    // load single phone data
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    const phone = data.data;
    showPhoneDeetails(phone)
}

const showPhoneDeetails = (phone) => {
    console.log(phone);

    const phoneName = document.getElementById("phone_name");
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById("show_detail_container");
    showDetailContainer.innerHTML = `
        <div class="flex justify-center"><img class="mt-5" src="${phone.image}" alt=""></div>
        <p class="mt-5"><span>Storage : </span>${phone?.mainFeatures?.storage}</p>
        <p class="mt-2"><span>Brand : </span>${phone?.brand}</p>
        <p class="mt-2"><span>Chip Set : </span>${phone?.mainFeatures?.chipSet}</p>
        <p class="mt-2"><span>Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
        <p class="mt-2"><span>Memory : </span>${phone?.mainFeatures?.memory}</p>
        <p class="mt-2"><span>Bluetooth : </span>${phone?.others?.Bluetooth}</p>
        <p class="mt-2"><span>GPS : </span>${phone?.others?.GPS}</p>
        <p class="mt-2"><span>NFC : </span>${phone?.others?.NFC}</p>
        <p class="mt-2"><span>Radio : </span>${phone?.others?.Radio}</p>
        <p class="mt-2"><span>USB : </span>${phone?.others?.USB}</p>
        <p class="mt-2"><span>WLAN : </span>${phone?.others?.WLAN}</p>
    `

    // show the modal
    show_details_modal.showModal()
}


const handleSearch = () => {
    toggleLoading(true)
    const searchField = document.getElementById("search_field");
    const searchText = searchField.value;
    loadPhone(searchText)
}

const toggleLoading = (isLoading) => {
    const loading = document.getElementById("loading");

    if (isLoading) {
        loading.classList.remove("hidden")
    }
    else {
        loading.classList.add("hidden")
    }
}

loadPhone()
