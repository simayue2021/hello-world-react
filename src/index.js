let fileContent = '';

function displayRandomParagraph() {
  fetch('textFile.txt') // Replace 'textFile.txt' with your actual file name
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      fileContent = data;
      showIntroAnimation();
      setTimeout(() => {
        const paragraphs = fileContent.split(/\b\d+\b\s+/).filter(Boolean);
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        const randomParagraph = paragraphs[randomIndex];

        const matches = randomParagraph.match(/【原文】(.*?)【出处】(.*?)【译文】(.*)/s);

        if (matches && matches.length === 4) {
          const originalText = matches[1].trim();
          const source = matches[2].trim();
          const translatedText = matches[3].trim();

          displayParagraphInfo(originalText, source, translatedText);
        } else {
          displayErrorMessage();
        }
      }, 3000); // 3000 milliseconds (3 seconds) for the intro animation
    })
    .catch(error => {
      console.error('There was a problem fetching the file:', error);
    });
}

// Other functions (showIntroAnimation, displayParagraphInfo, displayErrorMessage) remain the same


function showIntroAnimation() {
  const introDiv = document.getElementById('displayParagraph');
  introDiv.innerHTML = '<div class="intro-animation">咚咚咚...</div>';
}

function displayParagraphInfo(originalText, source, translatedText) {
  const displayDiv = document.getElementById('displayParagraph');
  displayDiv.classList.remove('intro-animation'); // Remove the animation class

  displayDiv.innerHTML = `
    <div class="paragraph-section">
      <strong>原文:</strong>
      <p>${originalText}</p>
    </div>
    <div class="paragraph-section">
      <strong>出处:</strong>
      <p>${source}</p>
    </div>
    <div class="paragraph-section">
      <strong>译文:</strong>
      <p>${translatedText}</p>
    </div>
  `;
}

function displayErrorMessage() {
  document.getElementById('displayParagraph').textContent = 'Paragraph format not recognized.';
}