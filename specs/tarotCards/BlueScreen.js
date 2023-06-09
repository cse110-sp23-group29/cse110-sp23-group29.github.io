document.addEventListener('load', () => {
  // Apply settings
  audioSettings.volumeSlider.addEventListener("input", (e) => {
    audioSettings.adjustVolume(e.currentTarget.value / 100);
  });

  audioSettings.musicCheckBox.addEventListener('change', () => {
      audioSettings.toggleMusic();
  });

  audioSettings.volumeIcon.addEventListener('click', () =>{
      audioSettings.toggleVolumeIcon();
  });

  // if audio should be paused, pause and change volume icon
  if (localStorage.getItem("paused")) {
      audioSettings.audio.pause();
      audioSettings.volumeIcon.src = "./specs/images/volume-off.png";
  }
  else {
      audioSettings.audio.play();
      audioSettings.volumeIcon.src = "./specs/images/volume-on.png";
  }

  // if the audio is paused but the music checkbox is checked, uncheck it
  if (audioSettings.audio.paused && audioSettings.musicCheckBox.checked) 
      audioSettings.musicCheckBox.click();
});

// Declaring the selectedArcana object
/**
 * Declaring selectedArcana Object
 * @name selectedArcana
 * @type {Object<Array>}
 */
var selectedArcana = {
    past: [],
    present: [],
    future: []
  };
  
/**
* Function to validate the form
* @name validateForm
*/
  function validateForm() {
    // Getting form input values
    var name = document.getElementById("name").value;
    var city = document.getElementById("city").value;
    var date = document.getElementById("date").value;
    var isValid = true;
  
    // Checking if name is empty
    if (name === "") {
      document.getElementById("name").classList.add("error");
      isValid = false;
    } else {
      document.getElementById("name").classList.remove("error");
    }
  
    // Checking if city is empty
    if (city === "") {
      document.getElementById("city").classList.add("error");
      isValid = false;
    } else {
      document.getElementById("city").classList.remove("error");
    }
  
    // Checking if date is empty
    if (date === "") {
      document.getElementById("date").classList.add("error");
      isValid = false;
    } else {
      document.getElementById("date").classList.remove("error");
    }
  
    // Checking if isValid is true
    if (isValid) {
      document.querySelector(".form-container").style.display = "none";
      document.querySelector(".card-container").style.display = "flex";
    }
  }
  
/**
* Function to display fortune based on position and card
*@name displayFortune
*@param {number} position - Card Position
*@param {cardObject} card - Card Type
*/
  function displayFortune(position, card) {
    // Object containing the paths to card images
    var images = {
      "The Fool": "../specs/images/image3.png",
      "The Magician": "../specs/images/image1.png",
      "The High Priestess": "../specs/images/image2.png",
      "The Empress": "../specs/images/image23.png",
      "The Emperor": "../specs/images/image4.png",
      "The Hierophant": "../specs/images/image8.png",
      "The Lovers": "../specs/images/image5.png",
      "The Chariot": "../specs/images/image6.png",
      "Strength": "../specs/images/image7.png",
      "The Hermit": "../specs/images/image9.png",
      "Wheel of Fortune": "../specs/images/image10.png",
      "Justice": "../specs/images/image11.png",
      "The Hanged Man": "../specs/images/image12.png",
      "Death": "../specs/images/image13.png",
      "Temperance": "../specs/images/image14.png",
      "The Devil": "../specs/images/image22.png",
      "The Tower": "../specs/images/image15.png",
      "The Star": "../specs/images/image18.png",
      "The Moon": "../specs/images/image16.png",
      "The Sun": "../specs/images/image17.png",
      "Judgment": "../specs/images/image19.png",
      "The World": "../specs/images/image20.png",
    };

/**
 * Object containing available arcana at each position
 * @name arcana
 * @type {Object<Array>} Card Type Dictionary
 */
    var arcana = {
      past: [
        "The Fool",
        "The Magician",
        "The High Priestess",
        "The Empress",
        "The Emperor",
        "The Hierophant",
        "The Lovers",
        "The Chariot",
        "Strength",
        "The Hermit",
        "Wheel of Fortune",
        "Justice",
        "The Hanged Man",
        "Death",
        "Temperance",
        "The Devil",
        "The Tower",
        "The Star",
        "The Moon",
        "The Sun",
        "Judgment",
        "The World"
      ],
      present: [
        "The Fool",
        "The Magician",
        "The High Priestess",
        "The Empress",
        "The Emperor",
        "The Hierophant",
        "The Lovers",
        "The Chariot",
        "Strength",
        "The Hermit",
        "Wheel of Fortune",
        "Justice",
        "The Hanged Man",
        "Death",
        "Temperance",
        "The Devil",
        "The Tower",
        "The Star",
        "The Moon",
        "The Sun",
        "Judgment",
        "The World"
      ],
      future: [
        "The Fool",
        "The Magician",
        "The High Priestess",
        "The Empress",
        "The Emperor",
        "The Hierophant",
        "The Lovers",
        "The Chariot",
        "Strength",
        "The Hermit",
        "Wheel of Fortune",
        "Justice",
        "The Hanged Man",
        "Death",
        "Temperance",
        "The Devil",
        "The Tower",
        "The Star",
        "The Moon",
        "The Sun",
        "Judgment",
        "The World"
      ]
    };
  
    
    /**
     * Filter Available arcana for given position
     * @name availableArcana
     */
    var availableArcana = arcana[position].filter(function(card) {
      return (
        !selectedArcana.past.includes(card) &&
        !selectedArcana.present.includes(card) &&
        !selectedArcana.future.includes(card)
      );
    });
  
    // Displaying an alert if no more arcana is available for the position
    if (availableArcana.length === 0) {
      alert("No more arcana available for this position.");
      return;
    }
  
    var cardBack = card.querySelector(".card-back");
  
    // Selecting a random card from the available arcana
    var randomIndex = Math.floor(Math.random() * availableArcana.length);
    var selectedCard = availableArcana[randomIndex];
    var imageSrc = images[selectedCard];
    cardBack.style.backgroundImage = "url('" + imageSrc + "')";
  
    // Adding the selected card to the selectedArcana object
    selectedArcana[position].push(selectedCard);
  
    // Object containing fortunes for each arcana in past, present, and future
/**
 * Object containing fortunes of each arcana in past, present, and future
 * @name fortunes
 * @type {Object<Array>} - Fortune Descriptions
 */
    var fortunes = {
      past: {
        "The Fool": "You have experienced a significant turning point in the past that shaped your current path.",
        "The Magician": "Your past actions have influenced your current circumstances, empowering you with creative abilities.",
        "The High Priestess": "Your past experiences have heightened your intuition and inner knowledge.",
        "The Empress": "You may have experienced a period of fertility, whether it be in the form of artistic inspiration, the birth of new ideas, or the nurturing of relationships or projects.",
        "The Emperor": " You may have encountered a situation where you took charge and established order and control. It could be related to your career or a specific area of your life.",
        "The Hierophant": "You may have sought wisdom from established institutions or mentors, following a prescribed path or set of beliefs.",
        "The Lovers": "You may have faced a significant decision regarding a romantic partnership or a deep connection with someone, which could have had a lasting impact on your life.",
        "The Chariot": "You may have experienced a period of focused effort and triumph over obstacles, leading you to achieve a goal or move forward in your endeavors.",
        "Strength": " You may have faced challenges or difficult situations, but you found the strength within you to overcome them and emerge stronger than before.",
        "The Hermit": "You may have experienced a period of introspection and soul-searching, seeking answers within yourself and finding solace in solitude.",
        "Wheel of Fortune": "You may have encountered a significant turning point or a change in circumstances that had a profound impact on your life, guiding you towards a new direction.",
        "Justice": "You may have experienced a situation where justice was served or where you were presented with an opportunity to make fair and balanced decisions.",
        "The Hanged Man": "You may have faced a situation where you had to release control and adopt a different viewpoint, leading to a shift in your perception and understanding.",
        "Death": "You may have undergone a significant transformation or experienced a major life transition, allowing you to let go of the old and embrace the new.",
        "Temperance": "You may have encountered a period where you successfully found a middle ground, blending opposing forces or finding harmony in different aspects of your life.",
        "The Devil": "You may have been caught up in negative patterns or unhealthy attachments that hindered your progress. However, this experience could have taught you valuable lessons about breaking free from limitations.",
        "The Tower": "You may have experienced a significant disruption or crisis that shattered existing structures, leading to a period of intense transformation and rebuilding.",
        "The Star": "You may have gone through a phase of renewed faith, finding inspiration and healing after a challenging period. This card suggests that brighter times are ahead.",
        "The Moon": "You may have navigated through a period of uncertainty, relying on your intuition and inner guidance to uncover hidden truths and navigate through illusions.",
        "The Sun": "You may have experienced a period of joy, abundance, and positive energy, where everything seemed to align perfectly in your life.",
        "Judgment": "You may have gone through a transformative phase of self-evaluation and decision-making, leading to a renewed sense of purpose or a fresh start.",
        "The World": "You may have reached a significant milestone or accomplished a major goal, bringing a sense of fulfillment and completion to a particular chapter of your life.",
      },
      present: {
        "The Fool": "You are currently at the beginning of a new journey filled with unlimited potential.",
        "The Magician": "The present moment is a time of manifestation and utilizing your skills and resources effectively.",
        "The High Priestess": "Your intuition and inner wisdom are guiding you through the present situation.",
        "The Empress": "The present is a time of nurturing and abundance. Focus on self-care, creativity, and the cultivation of your relationships. Embrace the fertile energy surrounding you.",
        "The Emperor": " Currently, it is important to establish structure and stability in your life. Take charge of your circumstances and demonstrate leadership to achieve your goals.",
        "The Hierophant": "Seek guidance from wise mentors or trusted institutions in the present. Embrace tradition and established practices to gain deeper insights and understanding.",
        "The Lovers": "Consider the options before you and make decisions that align with your heart's true desires.",
        "The Chariot": "You are currently in a period of focused determination and success. Stay committed to your goals and navigate through any obstacles that come your way.",
        "Strength": "Draw upon your inner strength and resilience in the present. Face challenges with courage and grace, knowing that you have the power to overcome them.",
        "The Hermit": "You may benefit from solitude and introspection. Take time to reflect on your inner self and seek answers from within.",
        "Wheel of Fortune": "Embrace the ebb and flow of life and be open to the opportunities that arise during this transformative period.",
        "Justice": "Currently, strive for fairness and balance in your actions and decisions. Trust that justice will prevail, and act with integrity and impartiality.",
        "The Hanged Man": "Release attachment to outcomes and adopt a new perspective. Embrace the pause and allow clarity to emerge.",
        "Death": "The present signifies a time of transformation and endings. Embrace the process of letting go of the old to make way for new beginnings and growth.",
        "Temperance": "Seek balance and moderation in the present. Harmonize opposing forces and find a middle ground to create stability and peace in your life.",
        "The Devil": "Currently, be aware of any negative patterns or attachments that may be holding you back. Take steps to break free from limitations and embrace a path of liberation.",
        "The Tower": "The present may involve sudden change or upheaval. Embrace the opportunity for growth and rebuilding that follows the collapse of old structures.",
        "The Star": "Have hope and maintain a positive outlook. Trust that the universe is guiding you towards inspiration, healing, and renewed vitality.",
        "The Moon": "Pay attention to your intuition and subconscious mind in the present. Navigate through uncertainty by trusting your inner guidance and seeking clarity.",
        "The Sun": "Bask in the energy of joy, success, and positivity. Embrace the abundance and celebrate the light that shines upon your life.",
        "Judgment": "Evaluate your choices and actions, and embrace the opportunity for personal growth and transformation.",
        "The World": "Celebrate your achievements and recognize the connection of your journey with the world around you.",
      },
      future: {
        "The Fool": "The future holds new adventures and opportunities for growth and exploration.",
        "The Magician": "You will have the ability to manifest your desires and achieve success in the future.",
        "The High Priestess": "Your intuition will play a crucial role in guiding you through future challenges.",
        "The Empress": "Focus on cultivating creativity, enjoying the beauty of life, and nourishing your relationships for a period of growth and fulfillment.",
        "The Emperor": "Establishing structure and stability will be crucial. Take charge of your life and demonstrate leadership to achieve your goals and maintain a sense of control.",
        "The Hierophant": "Seek guidance and wisdom from trusted mentors or institutions in the future. Embrace traditional knowledge and practices to gain deeper insights and spiritual enlightenment.",
        "The Lovers": "Be open to love and deep connections, and make choices that align with your authentic self.",
        "The Chariot": "You will experience a period of focused determination and success. Stay committed to your goals, navigate through challenges, and move forward with confidence.",
        "Strength": "The future will call upon your inner strength and resilience. Face challenges with courage and maintain your positive spirit, knowing that you have the power to overcome any obstacles.",
        "The Hermit": "You may benefit from introspection and solitude. Take time for self-reflection and seek answers from within, as it will guide you toward clarity and wisdom.",
        "Wheel of Fortune": "The future will bring cycles of change and destiny. Embrace the ever-turning wheel of life and be open to the opportunities and shifts that come your way.",
        "Justice": " Fairness and balance will play a significant role in your future. Make choices aligned with integrity and act with impartiality, trusting that justice will prevail in your endeavors.",
        "The Hanged Man": "The future calls for surrender and letting go of control. Embrace the pause, release attachments, and adopt a new perspective to bring about profound personal growth.",
        "Death": "The future signifies transformative endings and new beginnings. Embrace the process of transformation and trust that it will lead you to a place of renewal and growth.",
        "Temperance": "Strive for balance and moderation in the future. Harmonize opposing forces and find a sense of equilibrium to bring peace and stability to your life.",
        "The Devil": "Be cautious of negative patterns or attachments that may hold you back in the future. Break free from limitations, embrace your inner strength, and choose a path of liberation.",
        "The Tower": "Expect sudden change and upheaval. Trust that this disruption will lead to necessary growth and the opportunity to rebuild on a stronger foundation.",
        "The Star": "The future holds hope, inspiration, and healing. Trust that brighter times are ahead, and have faith in the universe's guidance as you navigate your path.",
        "The Moon": "Trust your intuition and navigate through uncertainties in the future. Pay attention to the subtle messages and trust the wisdom of your subconscious mind to guide you on your journey.",
        "The Sun": "The future holds joy, success, and positivity. Embrace the abundance and celebrate the light that shines upon your life, as it will continue to bring you happiness and fulfillment.",
        "Judgment": "The future calls for self-reflection and a call to action. Evaluate your choices and actions, and embrace the opportunity for personal growth, transformation, and a fresh start.",
        "The World": "You will experience a sense of completion and fulfillment. Celebrate your achievements and recognize the interconnectedness of your journey with the world around you.",
      }
    };
  /**
   * The Current Fortune
   * @name fortune
   * @type {string}
   */
    var fortune = fortunes[position][selectedCard];
  
    // Displaying the fortune based on the selected position and card
    if (position === "past") {
      document.getElementById("pastFortune").textContent = fortune;
      document.querySelector(".bottom-left").style.display = "block";
      document.querySelector(".top-left").style.pointerEvents = "none";
      document.querySelector(".bottom-left").style.pointerEvents = "none";
    } else if (position === "present") {
      document.getElementById("presentFortune").textContent = fortune;
      document.querySelector(".bottom-middle").style.display = "block";
      document.querySelector(".top-middle").style.pointerEvents = "none";
      document.querySelector(".bottom-middle").style.pointerEvents = "none";
    } else if (position === "future") {
      document.getElementById("futureFortune").textContent = fortune;
      document.querySelector(".bottom-right").style.display = "block";
      document.querySelector(".top-right").style.pointerEvents = "none";
      document.querySelector(".bottom-right").style.pointerEvents = "none";
    }
    

  }
  var flippedCardCount = 0;

  // Function to flip the card
  /**
   * Function to flip the card over
   * @param {cardObject} card - Current card
   */
  function flipCard(card) {
    card.classList.toggle("flip");

    // Increment the flippedCardCount
    flippedCardCount++;

    // Check if the third card has been flipped
    if (flippedCardCount === 3) {
      document.getElementById("askAnotherFortuneBtn").style.display = "block";
    }
  }
  
  // Function to go back to the start screen page
  function goToStartScreen() {
    window.location.href = "StartScreen.html"; 
  }

  // Add event listener to the "Ask Another Fortune" button
  document.getElementById("askAnotherFortuneBtn").addEventListener("click", goToStartScreen);

  // Hide the "Ask Another Fortune" button initially
  document.getElementById("askAnotherFortuneBtn").style.display = "none";