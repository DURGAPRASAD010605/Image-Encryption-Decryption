# 🔐 Image Encryption & Decryption (Frontend Only)

A simple client‑side image encryption & decryption tool powered by **HTML5 Canvas**, **JavaScript**, and **CSS3**.  
Now includes **user‑entered encryption keys**, while preserving the original block‑shuffle + XOR logic.

---

## 🚀 Features

- Upload PNG/JPG images
- Encrypt image using:
  - Pixel block shuffling
  - XOR scrambling
  - User-provided secret key
- Decrypt image using the same key
- Perfectly reversible output
- 100% frontend‑only (no backend)
- Works offline — just open `index.html`
- Download encrypted/decrypted image

---

## 🔐 Encryption Process

### **1️⃣ Block Shuffling**
The image is sliced into blocks (e.g., 16×16).  
A deterministic permutation (based on your key) scrambles block positions.

### **2️⃣ Pixel XOR**
Every RGB pixel value is XOR'ed using a key-derived number:

```
R = R XOR key
G = G XOR key
B = B XOR key
```

Applying XOR again restores the original data—making it fully reversible.

---

## 🔓 Decryption Process

Uses the exact reverse steps:

1. Apply XOR again  
2. Reverse block permutation  
3. Reconstruct the original image

A wrong key produces a distorted output.

---

## 📁 Project Structure

```
index.html
style.css
script.js
README.md
```

---

## ▶️ Run Locally

Simply open:

```
index.html
```

in any modern browser.

No installation. No server. No external libraries.

---

## 🛠️ Technologies Used

- HTML5 Canvas
- JavaScript (Vanilla)
- CSS3

---

## 📝 Notes

- All encryption happens **inside the browser memory**
- No image data is uploaded or stored anywhere
- Educational project demonstrating client-side image manipulation & reversible encryption

---

## 📄 License

MIT — free to use & modify.
