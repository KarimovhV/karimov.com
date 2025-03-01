document.addEventListener('DOMContentLoaded', () => {
    // Cart functionality
    const cart = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    document.querySelectorAll('.product-item button').forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = e.target.closest('.product-item');
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
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = 0;
    setTimeout(() => {
        heroContent.style.transition = 'opacity 2s';
        heroContent.style.opacity = 1;
    }, 500);

    // Modal functionality
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");

    document.querySelectorAll(".product-item img, .service-item img").forEach(img => {
        img.onclick = function() {
            modal.style.display = "flex";
            setTimeout(() => {
                modal.classList.add("show");
            }, 10); // Kısa bir gecikme ekleyerek geçişin çalışmasını sağla
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
    });

    const span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 400); // Geçiş süresiyle uyumlu olmalı
    }

    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.classList.remove("show");
            setTimeout(() => {
                modal.style.display = "none";
            }, 400); // Geçiş süresiyle uyumlu olmalı
        }
    }
});