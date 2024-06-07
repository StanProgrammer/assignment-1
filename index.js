// Get DOM elements
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

// Color configurations
const colorsConfig = {
  blue: {
    button: document.getElementById("blue-btn"),
    color: "#2db3e5",
    image: "././assests/blue_umb.png",
    bgColor: "#c5e0dc",
  },
  yellow: {
    button: document.getElementById("yellow-btn"),
    color: "#fed144",
    image: "./assests/yellow_umb.png",
    bgColor: "#f7e09e",
  },
  pink: {
    button: document.getElementById("pink-btn"),
    color: "#da358c",
    image: "././assests/pink_umb.png",
    bgColor: "#f4c4c4",
  },
  
  
  // Add new colors here
  // Example:
  // green: {
  //   button: document.getElementById("green-btn"),
  //   color: "#28a745",
  //   image: "./assests/green_umb.png",
  //   bgColor: "#d4edda",
  // }
};

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

// Change umbrella color and image
function changeUmbrella(colorConfig) {
  currentColor = colorConfig.color;
  logoUploadButtonEl.style.backgroundColor = colorConfig.color;
  uploadLogoEl.style.backgroundColor = colorConfig.color;
  document.body.style.backgroundColor = colorConfig.bgColor;
  if (!isLogoAdded) {
    umbrellaImageEl.src = colorConfig.image;
  } else {
    showLoader(colorConfig.color);
    setTimeout(() => {
      hideLoader();
      umbrellaImageEl.src = colorConfig.image;
    }, 3000);
  }
}

// Event listeners
logoUploadInputEl.addEventListener("change", handleLogoUpload);

Object.values(colorsConfig).forEach((colorConfig) => {
  colorConfig.button.addEventListener("click", () => {
    changeUmbrella(colorConfig);
  });
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

uploadLogoEl.addEventListener("click", () => {
  logoUploadInputEl.click();
});
