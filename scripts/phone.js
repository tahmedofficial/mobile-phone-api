
const loadPhone = async (search) => {
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
    // console.log(phones.length);

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

        const phoneCard = document.createElement("div");
        phoneCard.classList = `card bg-base-100 shadow-xl py-10`;
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
            `
        phoneContainer.appendChild(phoneCard);

    });
    // hide loading
    toggleLoading(false)
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
