var nigeriaStates = [
  "Abia","Adamawa","Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Federal Capital Territory (Abuja)"
];

var stateLGAMap = {
  "Abia": ["Aba North", "Aba South", "Umuahia", "Obingwa", /* ... */],
  "Adamawa": ["Yola North", "Yola South", "Mubi North", "Mubi South", /* ... */],
  "Lagos": ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", 
  "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", 
  "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"]
};

var lgaLCDAMap = {
  "Ibeju-Lekki": ["LCDA1", "LCDA2", "LCDA3", /* ... */]
};


// Function to show or hide the LGA input field based on the selected state
function showLGAInput() {
  var stateDropdown = document.getElementById("stateDropdown");
  var lgaInputContainer = document.getElementById("lgaInputContainer");
  var lgaDropdown = document.getElementById("lgaDropdown");
  
  var selectedState = stateDropdown.value;

  if (selectedState === "") {
    // If no state is selected, hide the LGA input
    lgaInputContainer.style.display = "none";
    lgaDropdown.selectedIndex = 0; // Reset the LGA dropdown
  } else {
    // If a state is selected, populate the LGA dropdown and show it
    var lgas = stateLGAMap[selectedState] || [];
    lgaDropdown.innerHTML = ""; // Clear existing options

    // Create and add options for LGAs
    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select LGA";
    lgaDropdown.appendChild(defaultOption);

    for (var i = 0; i < lgas.length; i++) {
      var option = document.createElement("option");
      option.value = lgas[i];
      option.text = lgas[i];
      lgaDropdown.appendChild(option);
    }

    lgaInputContainer.style.display = "block"; // Show the LGA input
  }
}

// Populate the state dropdown options
var stateDropdown = document.getElementById("stateDropdown");

for (var i = 0; i < nigeriaStates.length; i++) {
  var option = document.createElement("option");
  option.value = nigeriaStates[i];
  option.text = nigeriaStates[i];
  stateDropdown.appendChild(option);
}

// Function to show or hide the LCDA input field based on the selected LGA
function showLCDAInput() {
  var lgaDropdown = document.getElementById("lgaDropdown");
  var lcdaInputContainer = document.getElementById("lcdaInputContainer");
  var lcdaDropdown = document.getElementById("lcdaDropdown");

  var selectedLGA = lgaDropdown.value;

  if (selectedLGA === "") {
    // If no LGA is selected, hide the LCDA input
    lcdaInputContainer.style.display = "none";
    lcdaDropdown.selectedIndex = 0; // Reset the LCDA dropdown
  } else {
    // If an LGA is selected, populate the LCDA dropdown and show it
    var lcdas = lgaLCDAMap[selectedLGA] || [];
    lcdaDropdown.innerHTML = ""; // Clear existing options

    // Create and add options for LCDAs
    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select LCDA";
    lcdaDropdown.appendChild(defaultOption);

    for (var i = 0; i < lcdas.length; i++) {
      var option = document.createElement("option");
      option.value = lcdas[i];
      option.text = lcdas[i];
      lcdaDropdown.appendChild(option);
    }

    lcdaInputContainer.style.display = "block"; // Show the LCDA input
  }
}

// Event listener for the LGA dropdown change event
document.getElementById("lgaDropdown").addEventListener("change", showLCDAInput);


// Function to create a card with form data
function createCard() {
  var fullName = document.querySelector('input[name="fullName"]').value;
  var phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
  var email = document.querySelector('input[name="email"]').value;
  var state = document.getElementById("stateDropdown").value;
  var lga = document.getElementById("lgaDropdown").value;
  var lcda = document.getElementById("lcdaDropdown").value;

  // Generate a user ID (You can use your own logic here)
  var userId = generateUserId(fullName);

  // Create a card element
  var cardElement = document.createElement("div");
  cardElement.classList.add("card");
  
  // Create card content
  var cardContent = `
    <h3>Name: ${fullName}</h3>
    <p>User ID: ${userId}</p>
    <p>Phone Number: ${phoneNumber}</p>
    <p>Email: ${email}</p>
    <p>State: ${state}</p>
    <p>LGA: ${lga}</p>
    <p>LCDA: ${lcda}</p>
  `;
  cardElement.innerHTML = cardContent;

  // Append the card to the cardDisplay div
  document.getElementById("cardDisplay").appendChild(cardElement);

  // Clear the form fields
  document.querySelector('input[name="fullName"]').value = "";
  document.querySelector('input[name="phoneNumber"]').value = "";
  document.querySelector('input[name="email"]').value = "";
  document.getElementById("stateDropdown").value = "";
  document.getElementById("lgaDropdown").value = "";
  document.getElementById("lcdaDropdown").value = "";
  
  // Show and style the download button
  const downloadButton = document.getElementById("downloadButton");
  downloadButton.style.display = "block";
  downloadButton.classList.add("action-button");
  
  // Hide the form
  const form = document.querySelector("form.card-form");
  form.style.display = "none";
}

// Sample function to generate a user ID (You can replace this with your logic)
function generateUserId(fullName) {
  // Logic to generate a user ID based on the user's name
  // Example: NG/LAG/ETLKJK001
  // You can customize the user ID generation logic here
  return "NG/LAG/ETLKJK001";
}


// Event listener for form submission
document.querySelector("form.card-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission
  createCard(); // Call the createCard function
});

// Function to capture the card display as an image and generate a download link
function downloadCard() {
  const cardElement = document.getElementById("cardDisplay");

  // Use html2canvas to capture the card display as an image
  html2canvas(cardElement).then(function (canvas) {
    // Convert the canvas to a data URL (PNG format)
    const dataURL = canvas.toDataURL("image/png");

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "idCard.png"; // Set the filename for the downloaded image as "idCard.png"
    
    // Trigger a click event on the link to initiate the download
    document.body.appendChild(downloadLink); // Append the link to the document
    downloadLink.click(); // Click the link
    document.body.removeChild(downloadLink); // Remove the link from the document
  });
}



// Event listener for the download button
document.getElementById("downloadButton").addEventListener("click", downloadCard);

// Create an object containing the card data
var cardData = {
  fullName: fullName,
  phoneNumber: phoneNumber,
  email: email,
  state: state,
  lga: lga,
  lcda: lcda,
  userId: userId
};

// Send a POST request to the Google Apps Script web app URL
fetch('https://script.google.com/macros/s/AKfycbx5R-tf-s8v-cwFQs42OS6suLPDG68bdprBEV41ug/dev', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(cardData)
})
  .then(response => {
    // Handle the response if needed
    console.log('Data submitted successfully');
  })
  .catch(error => {
    // Handle errors if any
    console.error('Error submitting data:', error);
  });

  var fullName = document.querySelector('input[name="fullName"]').value;
  var phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
  var email = document.querySelector('input[name="email"]').value;
  var state = document.getElementById("stateDropdown").value;
  var lga = document.getElementById("lgaDropdown").value;
  var lcda = document.getElementById("lcdaDropdown").value;
  var userId = generateUserId(fullName); 