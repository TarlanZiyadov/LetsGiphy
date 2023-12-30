const generateForm = document.querySelector(".generate-form");
const nextButton = generateForm.querySelector(".next-button");
const imagePreview = document.querySelector(".image-preview");
const category = document.querySelector(".category-select");

let isImageGenerating = false;

const updateImage = ({image, title}) => {
    imagePreview.src = image;
    imagePreview.alt = title;
}

const giphy = {
  baseURL: "https://api.giphy.com/v1/gifs/",
  apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
  tag: "fail",
  type: "random",
  rating: "pg-13"
};

const generateImage = async () => {
  try {

    const getImage = await fetch(encodeURI(`${giphy.baseURL}${giphy.type}?api_key=${giphy.apiKey}&tag=${giphy.tag}&rating=${giphy.rating}`), {
      method: "GET"
    })

    if(!getImage.ok) throw new Error("Failed to get image. Please try again!");

    const response = await getImage.json();

    updateImage({
      image:  response.data.images.original.url, 
      title: response.data.title
    })

  } catch (error) {

    alert(error.message);

  } finally {

    nextButton.removeAttribute("disabled");
    isImageGenerating = false;
    nextButton.innerText = "Next";
  }
}

const handleImageGeneration = (e) => {

  e.preventDefault();

  if(isImageGenerating) return;

  nextButton.setAttribute("disabled", true);
  isImageGenerating = true;
  nextButton.innerText = "Generating";

  generateImage();
}

generateForm.addEventListener("submit", handleImageGeneration);
window.addEventListener("load", handleImageGeneration);