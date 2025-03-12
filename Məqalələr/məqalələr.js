document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.container button').forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = e.target.closest('.container');
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = parseFloat(productItem.querySelector('p').textContent.replace('₼', ''));

            const cartItem = cart.find(item => item.name === productName);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }
            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <p>${item.name} x${item.quantity} - ₼${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item">Remove</button>
            `;
            cartItemElement.querySelector('.remove-item').addEventListener('click', () => {
                removeCartItem(item.name);
            });
            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotal.textContent = total.toFixed(2);
    }

    function removeCartItem(name) {
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            updateCart();
        }
    }

    // Smooth scroll for navigation
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Welcome animation
    const heroContent = document.querySelector('.container');
    heroContent.style.opacity = 0;
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1.2s';
        heroContent.style.opacity = 1;
    }, 500);

// Modal elemanlarını seç
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const span = document.getElementsByClassName("close")[0];

// Tüm görselleri seç
const images = document.querySelectorAll(".container img");

// Modal açma fonksiyonu
images.forEach(img => {
    img.onclick = function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
        setTimeout(() => {
            modal.classList.add("show");
            resizeModalContent(); // Modal açıldığında boyutlandırma
        }, 10);
    };
});

// Modal kapatma (çarpı butonu)
span.onclick = function() {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 400);
};

// Modal dışına tıklayınca kapatma
modal.onclick = function(event) {
    if (event.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 400);
    }
};

// Görseli yeniden boyutlandırma fonksiyonu
function resizeModalContent() {
    if (modal.classList.contains("show")) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const maxWidth = Math.min(viewportWidth * 0.8, 1000);
        const maxHeight = Math.min(viewportHeight * 0.8, 1000);

        const img = new Image();
        img.src = modalImg.src;
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;

        let newWidth = naturalWidth;
        let newHeight = naturalHeight;

        if (naturalWidth > maxWidth || naturalHeight > maxHeight) {
            const widthRatio = maxWidth / naturalWidth;
            const heightRatio = maxHeight / naturalHeight;
            const scale = Math.min(widthRatio, heightRatio);

            newWidth = naturalWidth * scale;
            newHeight = naturalHeight * scale;
        }

        modalImg.style.width = `${newWidth}px`;
        modalImg.style.height = `${newHeight}px`;
        modalImg.style.maxWidth = "100%";
        modalImg.style.maxHeight = "100%";
    }
}

window.addEventListener("resize", resizeModalContent);
});
