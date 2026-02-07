
---

🔐 Image Encryption & Decryption

A modern, browser-based Image Encryption & Decryption Web Application built entirely using HTML5, CSS3, JavaScript, and Canvas API.

🚀 LIVE DEMO:
👉 [https://image-encryption-decryption.netlify.app/](https://image-encryption-decryption.netlify.app/)

---

🌟 Overview

This project demonstrates a simple yet powerful method to encrypt and decrypt images directly in the browser.
It uses a combination of:

* Block Shuffling (pixel rearrangement)
* XOR Pixel Encryption

Together, these transform the image into a highly scrambled and unreadable form, and restore it perfectly during decryption.

This project is ideal for:

✔ Academic cybersecurity assignments
✔ Demonstrating encryption concepts
✔ Learning Canvas pixel manipulation
✔ Offline browser-based processing

---

✨ Features

🔐 Image Encryption

* Deterministic key-based block shuffling
* XOR-based pixel scrambling
* High visual distortion
* Fast & entirely local processing

🔓 Image Decryption

* Reverses pixel XOR
* Reverses block permutation
* Fully restores the original image

💡 Additional Features

* Clean and beautiful UI
* Modern gradient background
* Responsive and smooth layout
* No external servers or libraries
* Secure (image never leaves your device)

---

🧠 How It Works

1️⃣ Load Image
The uploaded picture is drawn onto an HTML5 canvas.

2️⃣ Extract Pixels
Using getImageData() we access RGBA pixel values.

3️⃣ Block Shuffling (Confusion)

* The image is divided into fixed-size blocks (e.g., 32×32 px)
* A seeded pseudo-random permutation reorders the blocks
* Produces a scrambled, puzzle-like encrypted output
* Fully reversible using the same seed/key

4️⃣ XOR Encryption (Diffusion)
Each pixel’s RGB values are XOR-encrypted using a fixed symmetric key:

R = R XOR KEY
G = G XOR KEY
B = B XOR KEY

5️⃣ Decryption

* XOR is applied again → restores original colors
* Reverse permutation is applied → restores original positions
* Produces a pixel-perfect restoration of the original image

---

📁 Project Structure

📦 Image-Encryption-Decryption
│── index.html
│── style.css
│── script.js
│── README.md

---

🖼️ Screenshots (Add your own images)

🔳 Original Image
(Insert screenshot)

🔮 Encrypted Image
(Insert screenshot)

🔓 Decrypted Image
(Insert screenshot)

---

▶️ Run Locally

Clone the repository:

git clone [https://github.com/yourusername/image-encryption-decryption.git](https://github.com/yourusername/image-encryption-decryption.git)
cd image-encryption-decryption

Then open:
index.html

The project runs instantly in any modern browser.
No installation or server required.

---

🎓 Academic Notes (Useful for Viva & Documentation)

* Uses symmetric encryption (same key for both encryption & decryption)
* Combines block-based permutation + pixel-level XOR scrambling
* Entire processing happens inside browser memory
* No backend → no image is ever uploaded or stored
* Demonstrates essential cryptography principles:

  * Confusion
  * Diffusion
  * Deterministic pseudo-randomness

---

🚀 Future Enhancements

* Adjustable block size
* Custom user-provided encryption key
* Drag & drop upload
* Dark/light theme toggle
* Multi-layer encryption
* Animated encryption preview
* Mobile-optimized UI improvements

---

❤️ Acknowledgements

Built using:
HTML5 Canvas
CSS3
JavaScript

Designed for educational & academic purposes.

---

🌍 Live Version
[https://image-encryption-decryption.netlify.app/](https://image-encryption-decryption.netlify.app/)

⭐ If you found this useful, consider giving the project a star on GitHub!

---

