const charactersDetails = document.getElementById("characters");
const personalInfo = document.getElementById("personal-info");
const anatomyDetails = document.getElementById("anatomy");
const charcterDetails = document.querySelector(".character-details");
const personalData = document.querySelector(".personal-data");
let timerId;

let charactersData = async (a) => {
  let response = await fetch(`https://swapi.dev/api/people/?search=${a}`);
  let result = await response.json();
  return result.results;
};

let main = async () => {
  let searchInput = document.querySelector(".search-bar").value;

  if (!searchInput) {
    // console.log("Nulll");
    charactersDetails.style.visibility = "hidden";
  } else {
    // console.log("Nooo");
    charactersDetails.style.visibility = "visible";
    charactersDetails.style.background = "#2d2f30";
  }
  let charactersInfo = await charactersData(searchInput);
  if (charactersInfo === undefined) {
    return false;
  }

  appendCharacters(charactersInfo);
  // console.log('charactersInfo:', charactersInfo)
};

//appending function
let appendCharacters = (c) => {
  // console.log('c:', c)
  charactersDetails.innerHTML = "";

  for (let data of c) {
    const characterName = document.createElement("p");
    const age = document.createElement("p");
    const characterGender = document.createElement("p");

    characterName.innerHTML = data.name;
    characterName.classList.add("characterName");
    characterName.addEventListener("mousemove", () => {
      characterName.style.color = "yellow";
    });
    characterName.addEventListener("mouseout", () => {
      characterName.style.color = "white";
    });

    characterName.addEventListener("click", () => {
      personalData.style.display = "block";

      let personalInfoMessage = document.createElement("p");

      let name = document.createElement("p");
      name.innerHTML = `${data.name}`;

      let birthYear = document.createElement("p");
      birthYear.innerHTML = `Birth Year : ${data.birth_year}`;

      let gender = document.createElement("p");
      gender.innerHTML = `Gender : ${data.gender}`;

      let height = document.createElement("p");
      height.innerHTML = `Height : ${data.height}`;

      let anatomy = document.createElement("p");

      let eyeColor = document.createElement("p");
      eyeColor.innerHTML = `Eye Color : ${data.eye_color}`;

      let mass = document.createElement("p");
      mass.innerHTML = `Mass : ${data.mass}`;

      let hairColor = document.createElement("p");
      hairColor.innerHTML = `Hair Color : ${data.hair_color}`;

      personalInfoMessage.append(birthYear, gender, height);
      personalInfoMessage.classList.add("personal-Info-cont");
      personalInfo.append(personalInfoMessage);
      document.querySelector(".character-name").append(name);

      anatomy.append(eyeColor, mass, hairColor);
      anatomy.classList.add("anatomy-cont");
      anatomyDetails.append(anatomy);
      // console.log('name:', name)

      // console.log('characterName:', data.birth_year )
    });

    age.innerHTML = data.birth_year;
    age.classList.add("age");
    characterGender.innerHTML = data.gender;
    characterGender.classList.add("characterGender");
    charactersDetails.append(characterName, age, characterGender);
  }
};

let debounce = (func, delay) => {
  let searchInput = document.querySelector(".search-bar").value;
  if (searchInput < 3) {
    return false;
  }

  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => {
    func();
  }, delay);
};

let goBack = () => {
  setTimeout(() => {
    window.location.reload();
  }, 100);
};