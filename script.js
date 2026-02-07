const KEY = 123;
const BLOCK = 32;

// ---------- Simple XORShift PRNG (seeded) ----------
function XORShift(seed) {
    return function () {
        seed ^= seed << 13;
        seed ^= seed >> 17;
        seed ^= seed << 5;
        return (seed >>> 0) / 4294967296;
    };
}

// ---------- Generate deterministic permutation ----------
function generatePermutation(totalBlocks, seed) {
    const rand = XORShift(seed);
    const arr = Array.from({ length: totalBlocks }, (_, i) => i);

    // Fisher-Yates Shuffle
    for (let i = totalBlocks - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ---------- Image Loader ----------
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
        data[i+1] ^= KEY;
        data[i+2] ^= KEY;
    }
}

// ---------- TRUE reversible block shuffling ----------
function shuffleBlocks(data, width, height, reverse = false) {
    const blockW = BLOCK;
    const blockH = BLOCK;

    const bxCount = Math.ceil(width / blockW);
    const byCount = Math.ceil(height / blockH);
    const totalBlocks = bxCount * byCount;

    const perm = generatePermutation(totalBlocks, KEY);
    const invPerm = Array(totalBlocks);

    perm.forEach((p, i) => invPerm[p] = i);

    const output = new Uint8ClampedArray(data.length);

    for (let blockIndex = 0; blockIndex < totalBlocks; blockIndex++) {
        const srcIndex = reverse ? perm[blockIndex] : blockIndex;
        const dstIndex = reverse ? blockIndex : perm[blockIndex];

        const sx = (srcIndex % bxCount) * blockW;
        const sy = Math.floor(srcIndex / bxCount) * blockH;

        const dx = (dstIndex % bxCount) * blockW;
        const dy = Math.floor(dstIndex / bxCount) * blockH;

        for (let y = 0; y < blockH; y++) {
            for (let x = 0; x < blockW; x++) {
                const sxx = sx + x, syy = sy + y;
                const dxx = dx + x, dyy = dy + y;

                if (sxx < width && syy < height && dxx < width && dyy < height) {
                    const sPos = (syy * width + sxx) * 4;
                    const dPos = (dyy * width + dxx) * 4;

                    output[dPos] = data[sPos];
                    output[dPos+1] = data[sPos+1];
                    output[dPos+2] = data[sPos+2];
                    output[dPos+3] = data[sPos+3];
                }
            }
        }
    }

    return output;
}

// ---------- ENCRYPT ----------
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

// ---------- DECRYPT ----------
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
