/* eslint-disable quotes */
const generateForm = document.querySelector(".generate-form");
const nextButton = generateForm.querySelector(".next-button");
const copyButton = generateForm.querySelector(".copy-button");
const imagePreview = document.querySelector(".image-preview");
const copyClipboardUrl = document.querySelector(".copy-clipboard-url");

let isImageGenerating = false;

const updateImage = ({image, title}) => {
  imagePreview.src = image;
  imagePreview.alt = title;
  copyClipboardUrl.value = image;
};

const giphy = {
  baseURL: "https://api.giphy.com/v1/gifs/",
  apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
  type: "random",
  rating: "pg-13"
};

const generateImage = async () => {
  try {

    const tag = [
      "falling", 
      "fail", 
      "fighting", 
      "spinning", 
      "parkour", 
      "skydiving",
      "bird", 
      "corgi", 
      "hamster",
      "funny",
      "chihuahua",
      "asteroids",
      "slow motion",
      "car",
      "robot",
      "grumpy cat",
      "duck",
      "goat"][Math.floor(Math.random() * 18)];

    const getImage = await fetch(encodeURI(`${giphy.baseURL}${giphy.type}?api_key=${giphy.apiKey}&tag=${tag}&rating=${giphy.rating}`), {
      method: "GET"
    });

    if (!getImage.ok) throw new Error("Failed to get image. Please try again!");

    const response = await getImage.json();
    
    updateImage({
      image:  response.data.images.original.url, 
      title: response.data.title
    });

  } catch (error) {

    alert(error.message);

  } finally {

    nextButton.removeAttribute("disabled");
    isImageGenerating = false;
    nextButton.innerText = "Next";
  }
};

const handleImageGeneration = (e) => {

  e.preventDefault();

  if(isImageGenerating) return;

  nextButton.setAttribute("disabled", true);
  isImageGenerating = true;
  nextButton.innerText = "Generating";

  generateImage();
};

const copyClipboard = (e) => {
  e.preventDefault();

  copyClipboardUrl.select();
  copyClipboardUrl.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyClipboardUrl.value);

  copyButton.style.backgroundColor = "lightgreen";
  copyButton.innerHTML = `<i class="fa fa-check">Copied</i>`;

  setTimeout(function(){
    copyButton.style.backgroundColor = "#f7d477";
    copyButton.innerHTML = `<i class="fa fa-clipboard">Copy</i>`;
  }, 1000);

};

generateForm.addEventListener("submit", handleImageGeneration);
copyButton.addEventListener("click", copyClipboard);
window.addEventListener("load", handleImageGeneration);