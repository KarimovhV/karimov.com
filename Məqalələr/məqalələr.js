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

    // Modal ve kapatma butonu seçimi
    var modal = document.querySelector(".modal");
    var modalImg = document.querySelector(".modal-content");
    var closeModal = document.querySelector(".close");
    var images = document.querySelectorAll(".wsus-img"); // Doğru sınıf: .wsus-img

    images.forEach(function (img) {
        img.addEventListener("click", function () {
            modal.style.display = "block"; // Modalı görünür yap
            modal.classList.add("show"); // Sadece .show ekleyerek CSS'e bırakıyoruz
            modalImg.src = this.src;
        });
    });

    closeModal.addEventListener("click", function () {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);
        }
    });
    function resizeModalContent() {
        if (modal.classList.contains('show')) {
            modalContent.style.width = '80%';
            modalContent.style.maxWidth = '700px';
        }
    }

    window.addEventListener('resize', resizeModalContent);

    // Modal açıldığında boyutlandırma işlevini çağır
    modal.addEventListener('transitionend', function() {
        if (modal.classList.contains('show')) {
            resizeModalContent();
        }
    });
});