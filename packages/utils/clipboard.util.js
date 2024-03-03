const writeText = function(text) {
    return navigator.clipboard.writeText(text);
};

export { writeText };
