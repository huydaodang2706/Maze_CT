var row = 10;
initArray(value) {
    return new Array(row).fill().map(() => new Array().fill(value));
}