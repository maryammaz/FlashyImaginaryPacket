// Array of images (without image 12)
const imageSources = [
    "one.jpg", "two.jpg", "three.jpg", "four.jpg", "twenty7.jpg", "thirty1.jpg", "twenty4.jpg", "eight.jpg", "ten.jpg", "six.jpg", "nine.jpg", "five.jpg", "seven.jpg",
    "eleven.jpg", "twenty6.jpg", "thirty3.jpg", "thirteen.jpg", "twenty8.jpg", "fourteen.jpg", "fifteen.jpg", 
    "sixteen.jpg", "seventeen.jpg", "eighteen.jpg", "nineteen.jpg", "twenty5.jpg", 
    "twenty.jpg", "twenty1.jpg", "thirty2.jpg", "twenty3.jpg", 
    "twenty9.jpg"
];

// Array of quotes corresponding to each image
const quotes = [
    "The fastest way to someone's heart is their diary ;) You never know what you might find along the way...",
    "Sometimes all you need is a cute puppy and your blanket.",
    "Good friends are like stars – you don’t always see them, but you know they’re always there.",
    "Don’t try to be perfect; just be authentic to yourself.",
    "I’m not a nerd, I’m a unique blend of weird and awesome.",
    "When life gives you lemons, make lemonade. Or just throw them at people. You could always just grab a mic and wing it too.",
    "Sometimes all you need is a little adventure to find yourself.",
    "It’s not about fitting in; it’s about standing out.",
    "Confidence is the best accessory. Rock it and own it! Especially if it's your birthday!",
    "You don't need a reason to be happy; you just need to be.",
    "Cupcakes and drama – the perfect recipe for high school!",
    "Welcome to my world, where every day is a new dorky adventure!",
    "The secret ingredient to friendship is laughter and a pinch of chaos!",
    "Just a girl, her diary, and a million embarrassing moments to write about.",
    "You are the author of your own story.",
    "Prom snacks taste better than the actual prom – it’s a fact!",
    "Sometimes you’ve just got to tell your frenemies how it is.",
    "Game night is for laughs, snacks, and that one friend who always cheats at Jenga.",
    "Dogs make life better – and messier!",
    "Puppies are proof that good things come in furry, wiggly packages.",
    "Not every battle is worth fighting, especially when your phone has all the tea.",
    "Don’t be afraid to stand your ground. That’s where the magic happens.",
    "Sometimes all you need is a unicorn to make your day magical!",
    "Mornings are overrated, especially when your little sister is involved.",
    "You can’t spell awesome without some ‘me’ time (especially in Paris!)",
    "Being a princess isn’t always about the crown; it’s about owning your story.",
    "Even frenemies can look picture-perfect in selfies… sometimes.",
    "It’s the little moments that mean the most… and sometimes make you blush!",
    "This bag may or may not contain a disaster waiting to happen...",
    "Even a diva and her drama queen sister can find a moment between themselves."
];

// Add images to the grid
const imageGrid = document.getElementById('image-grid');
imageSources.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = `/static/images/title_page/${src}`;
    img.alt = `Image ${src}`;
    imageGrid.appendChild(img);

    // Add click event listener to show quote on image click
    img.addEventListener('click', () => {
        const quoteText = document.getElementById('quote-text');
        quoteText.textContent = quotes[index];  // Set the quote corresponding to the image
        const modal = document.getElementById('quote-modal');
        modal.style.display = 'flex';  // Show the modal with the quote
    });
});

// Close modal when the close button is clicked
document.getElementById('close-modal').addEventListener('click', () => {
    const modal = document.getElementById('quote-modal');
    modal.style.display = 'none';  // Hide the modal
});

// Close modal if clicked outside the modal content
window.addEventListener('click', (e) => {
    const modal = document.getElementById('quote-modal');
    if (e.target === modal) {
        modal.style.display = 'none';  // Hide the modal if the user clicks outside it
    }
});