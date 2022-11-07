const selectElement = document.querySelector('.selector');
console.log(selectElement);

selectElement.addEventListener('change', (e) => {
    output = document.querySelector('input')
    console.log(e.target.value);
    output.value = e.target.value
})


