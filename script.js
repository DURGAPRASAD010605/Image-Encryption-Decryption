const KEY = 123;
const BLOCK = 16; // Best block size (secure + stable)

// ---------- Simple XORShift PRNG ----------
function XORShift(seed) {
    return function () {
        seed ^= seed << 13;
        seed ^= seed >> 17;
        seed ^= seed << 5;
        return (seed >>> 0) / 4294967296;
    };
}

// ---------- Generate deterministic permutation ----------
function generatePermutation(total, seed) {
    const rand = XORShift(seed);
    const arr = Array.from({ length: total }, (_, i) => i);

    for (let i = total - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ---------- Load image ----------
function loadImage(fileInput, canvasId, callback) {
    const file = fileInput.files[0];
    if (!file) return alert("Upload an image!");

    const img = new Image();
    img.onload = () => {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);
        callback(canvas, ctx);
    };
    img.src = URL.createObjectURL(file);
}

// ---------- XOR Encryption ----------
function applyXOR(data) {
    for (let i = 0; i < data.length; i += 4) {
        data[i] ^= KEY;
        data[i + 1] ^= KEY;
        data[i + 2] ^= KEY;
    }
}

// ---------- Reversible Block Shuffle ----------
function shuffleBlocks(data, width, height, reverse = false) {
    const blocksX = Math.ceil(width / BLOCK);
    const blocksY = Math.ceil(height / BLOCK);
    const totalBlocks = blocksX * blocksY;

    const perm = generatePermutation(totalBlocks, KEY);
    const inverse = Array(totalBlocks);
    perm.forEach((p, i) => (inverse[p] = i));

    const output = new Uint8ClampedArray(data.length);

    for (let index = 0; index < totalBlocks; index++) {
        const srcBlock = reverse ? perm[index] : index;
        const dstBlock = reverse ? index : perm[index];

        const sx = (srcBlock % blocksX) * BLOCK;
        const sy = Math.floor(srcBlock / blocksX) * BLOCK;

        const dx = (dstBlock % blocksX) * BLOCK;
        const dy = Math.floor(dstBlock / blocksX) * BLOCK;

        const blockW = Math.min(BLOCK, width - sx);
        const blockH = Math.min(BLOCK, height - sy);

        for (let y = 0; y < blockH; y++) {
            for (let x = 0; x < blockW; x++) {
                const sPos = ((sy + y) * width + (sx + x)) * 4;
                const dPos = ((dy + y) * width + (dx + x)) * 4;

                output[dPos] = data[sPos];
                output[dPos + 1] = data[sPos + 1];
                output[dPos + 2] = data[sPos + 2];
                output[dPos + 3] = data[sPos + 3];
            }
        }
    }

    return output;
}

// ---------- Encrypt ----------
function encryptImage() {
    loadImage(document.getElementById("encryptUpload"), "encryptCanvas", (canvas, ctx) => {
        const { width, height } = canvas;
        let imgData = ctx.getImageData(0, 0, width, height);
        let data = imgData.data;

        data = shuffleBlocks(data, width, height, false);
        applyXOR(data);

        imgData.data.set(data);
        ctx.putImageData(imgData, 0, 0);

        alert("Encrypted!");
    });
}

// ---------- Decrypt ----------
function decryptImage() {
    loadImage(document.getElementById("decryptUpload"), "decryptCanvas", (canvas, ctx) => {
        const { width, height } = canvas;
        let imgData = ctx.getImageData(0, 0, width, height);
        let data = imgData.data;

        applyXOR(data);
        data = shuffleBlocks(data, width, height, true);

        imgData.data.set(data);
        ctx.putImageData(imgData, 0, 0);

        alert("Decrypted!");
    });
}

// ---------- Download ----------
function downloadEncrypted() {
    const link = document.createElement("a");
    link.download = "encrypted.png";
    link.href = encryptCanvas.toDataURL();
    link.click();
}

function downloadDecrypted() {
    const link = document.createElement("a");
    link.download = "decrypted.png";
    link.href = decryptCanvas.toDataURL();
    link.click();
}
