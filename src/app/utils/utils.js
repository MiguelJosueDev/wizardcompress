
export const getFrequencies = (text) => {
    const frequencies = {};
    const regex = /(\([0-9]+,[0-9]+\)|[a-z]+)/g;
    let match;

    while (match = regex.exec(text)) {
        if (frequencies[match[0]]) {
            frequencies[match[0]] += 1;
        } else {
            frequencies[match[0]] = 1;
        }
    }
    console.log('frequencies', frequencies);
    return frequencies;
};

export const buildHuffmanTree = (frequencies) => {
    const nodes = Object.entries(frequencies).map(([char, freq]) => ({ char, freq, left: null, right: null }));
    nodes.sort((a, b) => a.freq - b.freq);

    while (nodes.length > 1) {
        const leftNode = nodes.shift();
        const rightNode = nodes.shift();
        const newNode = {
            char: leftNode.char + rightNode.char,
            freq: leftNode.freq + rightNode.freq,
            left: leftNode,
            right: rightNode,
        };
        nodes.push(newNode);
        nodes.sort((a, b) => a.freq - b.freq);
    }
    console.log('buildHuffmanTree', nodes[0]);
    return nodes[0];
};

export const buildCodes = (node, currentCode = "", codes = {}) => {
    if (!node.left && !node.right) {
        codes[node.char] = currentCode;
        return codes;
    }
    if (node.left) buildCodes(node.left, currentCode + "0", codes);
    if (node.right) buildCodes(node.right, currentCode + "1", codes);
    console.log('buildCodes', codes);
    return codes;
};

export const encodeText = (text, codes) => {
    const compressedLZ77 = lz77Compress(text);
    console.log('compressedLZ77', compressedLZ77);

    let result = '';
    let buffer = '';

    for (let i = 0; i < compressedLZ77.length; i++) {
        buffer += compressedLZ77[i];

        if (codes.hasOwnProperty(buffer)) {
            result += codes[buffer];
            buffer = '';
        }
    }

    if (buffer.length > 0) {
        console.log('Unmapped characters at the end:', buffer);
        result += buffer;
    }

    console.log('encodeText', result);
    return result;
};

export const huffmanDecode = (encodedText, huffmanTree) => {
    let currentNode = huffmanTree;
    let decodedOutput = '';
    for (let bit of encodedText) {
        currentNode = (bit === '0') ? currentNode.left : currentNode.right;

        if (!currentNode.left && !currentNode.right) {
            decodedOutput += currentNode.char;
            currentNode = huffmanTree;
        }
    }
    console.log('decodedOutput', decodedOutput);
    return decodedOutput;
}

export const decodeText = (text, huffmanTree) => {
    let decompressedHuffman = huffmanDecode(text, huffmanTree);
    return lz77Decompress(decompressedHuffman);
};

export const lz77Compress = (input) => {
    const windowSize = 10;
    const lookaheadBufferSize = 4;
    let i = 0;
    const output = [];

    while (i < input.length) {
        let match = { length: 0, distance: 0 };
        const end = Math.min(i + lookaheadBufferSize, input.length);

        for (let j = Math.max(0, i - windowSize); j < i; j++) {
            let k = 0;
            while (k < end - i && input[j + k] === input[i + k]) {
                k++;
            }
            if (k > match.length) {
                match = { length: k, distance: i - j };
            }
        }

        if (match.length > 0 && match.length > 1) {
            output.push(`(${match.distance},${match.length})`);
            i += match.length;
        } else {
            output.push(input[i]);
            i++;
        }
    }
    console.log('lz77Compress', output.join(''));
    return output.join('');
};

export const lz77Decompress = (input) => {
    const output = [];
    let i = 0;

    while (i < input.length) {
        if (input[i] === '(') {
            const end = input.indexOf(')', i);
            const [distance, length] = input.slice(i + 1, end).split(',').map(Number);
            const start = output.length - distance;
            for (let j = 0; j < length; j++) {
                output.push(output[start + j]);
            }
            i = end + 1;
        } else {
            output.push(input[i]);
            i++;
        }
    }

    console.log('lz77Decompress', output);

    return output.join('');
};

export const serializeHuffmanTree = (node) => {
    if (!node) return null;
    return {
        char: node.char,
        freq: node.freq,
        left: serializeHuffmanTree(node.left),
        right: serializeHuffmanTree(node.right),
    };
};

export const deserializeHuffmanTree = (data) => {
    if (!data) return null;
    const node = {
        char: data.char,
        freq: data.freq,
        left: deserializeHuffmanTree(data.left),
        right: deserializeHuffmanTree(data.right),
    };
    return node;
};

// const result = lz77Compress("abracadabra");
// console.log("abracadabra".slice(4, 7));
// const huffmanTree = buildHuffmanTree(getFrequencies(result));
// const codes = buildCodes(huffmanTree);
// const encodedText = encodeText(result, codes);
// const decodedText = decodeText(encodedText, huffmanTree);
// console.log(codes);
// console.log(huffmanTree);
// console.log(result);
// console.log(encodedText);
// console.log(decodedText);
