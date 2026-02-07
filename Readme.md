# 🔐 Image Encryption & Decryption (Frontend-Only)

A lightweight, browser-based web application that encrypts and decrypts images using **block shuffling** and **XOR-based pixel encryption**.  
Built with **HTML5 Canvas**, **JavaScript**, and **CSS**, with **no backend** and **no external libraries**.

🌐 Live Demo:  
https://image-encryption-decryption.netlify.app/

---

## 🚀 Features

- Upload any image (JPG, PNG, WebP)
- Encrypt using:
  - Key-based block permutation
  - XOR pixel scrambling
- Decrypt with perfect restoration
- Download encrypted/decrypted images
- Works 100% client-side
- Clean and responsive UI

---

## 🧠 How the Encryption Works

### **1️⃣ Block Shuffling**
- The image is divided into blocks (default: 16×16)
- A seeded pseudo-random permutation is generated using XORShift
- Blocks are rearranged into a new order
- A reverse permutation is used during decryption

### **2️⃣ XOR Pixel Encryption**
Each RGB value is XORed with a symmetric key:

```
R = R XOR KEY  
G = G XOR KEY  
B = B XOR KEY
```

Applying XOR a second time restores original colors.

---

## 🔁 Decryption Process

Decryption reverses the encryption steps:

1. Reverse XOR  
2. Reverse block permutation  
3. Canvas renders the original image

This produces a **pixel-perfect** restoration.

---

## 📁 Project Structure

```
project/
│── index.html
│── style.css
│── script.js
│── README.md
```

---

## ▶️ How to Run

Just open:

```
index.html
```

Works instantly in any modern browser — no setup required.

---

## ⚙️ Customization

### **Block Size**
```javascript
const BLOCK = 16;
```

### **XOR Key**
```javascript
const KEY = 123;
```

---

## 🎯 Planned Enhancements

- Adjustable block size from UI
- Custom user-entered encryption key
- Drag & drop image upload
- Dark / light theme toggle
- Multi-layer encryption options
- Animated encryption/decryption preview
- More mobile-friendly UI improvements

---

## 🛠️ Tech Stack

- HTML5 Canvas  
- JavaScript  
- CSS3  

---

