let blue_btn = document.getElementById("blue-btn");
let yellow_btn = document.getElementById("yellow-btn");
let pink_btn = document.getElementById("pink-btn");
let umbrella_image = document.getElementById("umbrella-image");
let loader_container = document.getElementById("loader-container");
let logo_upload_button = document.getElementById("logo-upload-button");
let logo_upload_input = document.getElementById("logo-upload-input");
let logo_text = document.getElementById("logText")
let remove_logo = document.getElementById("remove-logo")
let upload_logo = document.getElementById("upload-logo");
let umbrella_uploaded_logo = document.getElementById("umbrella-uploaded-logo");
let upload_loader = document.getElementById("upload-loader");
let isLogoAdded = false;
let currentColor = "#2db3e5";
let currentImage = "././assests/blue_umb.png";
upload_logo.style.fill = "white";

function showLoader(color) {
  umbrella_image.style.display = "none";
  umbrella_uploaded_logo.style.display = "none";
  document.getElementById("loader").style.fill = color ? color : currentColor;
  upload_logo.style.display = "none";
  upload_loader.style.display = "block";
  upload_loader.style.backgroundColor = "transparent";
  upload_loader.style.fill = "white";
  loader_container.style.opacity = 1;
}

function hideLoader() {
  upload_logo.style.display = "block";
  upload_loader.style.display = "none";
  loader_container.style.opacity = 0;
  umbrella_image.style.display = "block";
  umbrella_uploaded_logo.style.display = "block";
}

// Loading handler function
function handleLogoUpload(event) {
  const file = event.target.files[0];

  if (file.size > 5242880) {
    alert("Warning: File size is greater than 5MB");
    return;
  }

  // Disable the upload button and change cursor
  const uploadButton = document.getElementById("logo-upload-button");
  uploadButton.disabled = true;
  uploadButton.classList.add("disabled-button");

  umbrella_uploaded_logo.style.display = "none";
  logo_text.innerText = file.name;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    isLogoAdded = true;
    umbrella_image.style.display = "none";
    showLoader();
    setTimeout(() => {
      hideLoader();
      umbrella_uploaded_logo.src = reader.result;
      umbrella_uploaded_logo.style.display = "block"; // Ensure the uploaded logo is displayed
      logo_text.innerText = file.name;
      
      // Re-enable the upload button and change cursor back
      uploadButton.disabled = false;
      uploadButton.classList.remove("disabled-button");
    }, 3000);
  };
  remove_logo.style.display = "block";
}



logo_upload_input.addEventListener("change", handleLogoUpload);

//Blue Umbrella
blue_btn.addEventListener("click", () => {
  currentColor = "#2db3e5";
  logo_upload_button.style.backgroundColor = currentColor;
  upload_logo.style.backgroundColor = currentColor;
  document.body.style.backgroundColor = "#c5e0dc";
  if (!isLogoAdded) {
    umbrella_image.src = "././assests/blue_umb.png";
  } else {
    showLoader("#2db3e5");
    setTimeout(() => {
      hideLoader();
      umbrella_image.src = "././assests/blue_umb.png";
    }, 3000);
  }
});

//Yellow Umbrella
yellow_btn.addEventListener("click", () => {
  currentColor = "#fed144";
  upload_logo.style.backgroundColor = currentColor;
  logo_upload_button.style.backgroundColor = currentColor;
  document.body.style.backgroundColor = "#f7e09e";
  if (!isLogoAdded) {
    umbrella_image.src = "./assests/yellow_umb.png";
  } else {
    showLoader("#fed144");
    setTimeout(() => {
      hideLoader();
      umbrella_image.src = "./assests/yellow_umb.png";
    }, 3000);
  }
});

remove_logo.addEventListener("click", () => {
  isLogoAdded = false;
  umbrella_uploaded_logo.src = "";
  logo_text.innerText = "Upload Logo";
  remove_logo.style.display = "none";
});

//Pink Umbrella
pink_btn.addEventListener("click", () => {
  currentColor = "#da358c";
  logo_upload_button.style.backgroundColor = currentColor;
  upload_logo.style.backgroundColor = currentColor;
  document.body.style.backgroundColor = "#f4c4c4";
  if (!isLogoAdded) {
    umbrella_image.src = "./assests/pink_umb.png";
  } else {
    showLoader("#da358c");
    setTimeout(() => {
      hideLoader();
      umbrella_image.src = "././assests/pink_umb.png";
    }, 3000);
  }
});

upload_logo.addEventListener("click", () => {
  logo_upload_input.click();
});