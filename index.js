// Get DOM elements
const blueBtnEl = document.getElementById("blue-btn");
const yellowBtnEl = document.getElementById("yellow-btn");
const pinkBtnEl = document.getElementById("pink-btn");
const umbrellaImageEl = document.getElementById("umbrella-image");
const loaderContainerEl = document.getElementById("loader-container");
const logoUploadButtonEl = document.getElementById("logo-upload-button");
const logoUploadInputEl = document.getElementById("logo-upload-input");
const logoTextEl = document.getElementById("logText");
const removeLogoEl = document.getElementById("remove-logo");
const uploadLogoEl = document.getElementById("upload-logo");
const umbrellaUploadedLogoEl = document.getElementById("umbrella-uploaded-logo");
const uploadLoaderEl = document.getElementById("upload-loader");

// State variables
let isLogoAdded = false;
let currentColor = "#2db3e5";
let currentImage = "././assests/blue_umb.png";

// Set initial styles
uploadLogoEl.style.fill = "white";

// Helper functions
function showLoader(color) {
  umbrellaImageEl.style.display = "none";
  umbrellaUploadedLogoEl.style.display = "none";
  document.getElementById("loader").style.fill = color ? color : currentColor;
  uploadLogoEl.style.display = "none";
  uploadLoaderEl.style.display = "block";
  uploadLoaderEl.style.backgroundColor = "transparent";
  uploadLoaderEl.style.fill = "white";
  loaderContainerEl.style.opacity = 1;
}

function hideLoader() {
  uploadLogoEl.style.display = "block";
  uploadLoaderEl.style.display = "none";
  loaderContainerEl.style.opacity = 0;
  umbrellaImageEl.style.display = "block";
  umbrellaUploadedLogoEl.style.display = "block";
}

// Trim text and add ellipsis if length exceeds limit
function trimText(text, limit = 15) {
  if (text.length > limit) {
    return `${text.slice(0, limit)}...`;
  }
  return text;
}

// Handle logo upload
function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    console.log(1);
    return;
  }
  if (file.size > 5242880) {
    alert("Warning: File size is greater than 5MB");
    return;
  }

  // Disable the upload button and change cursor
  logoUploadButtonEl.disabled = true;
  logoUploadButtonEl.classList.add("disabled-button");

  umbrellaUploadedLogoEl.style.display = "none";
  logoTextEl.innerText = trimText(file.name);

  const reader = new FileReader();
  reader.readAsDataURL(file);

  // Reset the FileReader object on loadend to prevent memory leaks
  reader.onloadend = () => {
    try {
      isLogoAdded = true;
      umbrellaImageEl.style.display = "none";
      showLoader();
      setTimeout(() => {
        hideLoader();

        umbrellaUploadedLogoEl.src = reader.result;
        logoTextEl.innerText = trimText(file.name);

        // Re-enable the upload button and change cursor back
        logoUploadButtonEl.disabled = false;
        logoUploadButtonEl.classList.remove("disabled-button");
      }, 3000);
    } catch (error) {
      console.error("Error reading the file:", error);
    } finally {
      reader.abort(); // Abort the file reading process after it's done
    }
  };

  removeLogoEl.style.display = "block";
}



// Event listeners
logoUploadInputEl.addEventListener("change", handleLogoUpload);

// Blue Umbrella
blueBtnEl.addEventListener("click", () => {
  currentColor = "#2db3e5";
  logoUploadButtonEl.style.backgroundColor = currentColor;
  uploadLogoEl.style.backgroundColor = currentColor;
  document.body.style.backgroundColor = "#c5e0dc";
  if (!isLogoAdded) {
    umbrellaImageEl.src = "././assests/blue_umb.png";
  } else {
    showLoader("#2db3e5");
    setTimeout(() => {
      hideLoader();
      umbrellaImageEl.src = "././assests/blue_umb.png";
    }, 3000);
  }
});

// Yellow Umbrella
yellowBtnEl.addEventListener("click", () => {
  currentColor = "#fed144";
  uploadLogoEl.style.backgroundColor = currentColor;
  logoUploadButtonEl.style.backgroundColor = currentColor;
  document.body.style.backgroundColor = "#f7e09e";
  if (!isLogoAdded) {
    umbrellaImageEl.src = "./assests/yellow_umb.png";
  } else {
    showLoader("#fed144");
    setTimeout(() => {
      hideLoader();
      umbrellaImageEl.src = "./assests/yellow_umb.png";
    }, 3000);
  }
});

removeLogoEl.addEventListener("click", () => {
  isLogoAdded = false;
  umbrellaUploadedLogoEl.src = "";
  umbrellaUploadedLogoEl.style.display = "none"; // Hide the uploaded logo element
  logoTextEl.innerText = "UPLOAD LOGO";
  removeLogoEl.style.display = "none";

  // Clear the value of the file input to allow re-selection of the same file
  logoUploadInputEl.value = "";
});



// Pink Umbrella
pinkBtnEl.addEventListener("click", () => {
  currentColor = "#da358c";
  logoUploadButtonEl.style.backgroundColor = currentColor;
  uploadLogoEl.style.backgroundColor = currentColor;
  document.body.style.backgroundColor = "#f4c4c4";
  if (!isLogoAdded) {
    umbrellaImageEl.src = "./assests/pink_umb.png";
  } else {
    showLoader("#da358c");
    setTimeout(() => {
      hideLoader();
      umbrellaImageEl.src = "././assests/pink_umb.png";
    }, 3000);
  }
});

uploadLogoEl.addEventListener("click", () => {
  console.log(1)
  logoUploadInputEl.click();
});