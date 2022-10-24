const deleteBtn = document.querySelectorAll(".delete-btn")
const printBtn = document.querySelector('.print')

deleteBtn.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (!confirm('are you sure ?')) {
            e.preventDefault()
        }
    })
}) 

printBtn.addEventListener('click' , (e) => {
    e.preventDefault()
    window.print()
})


const warehouseName = document.querySelectorAll('.warehouse-col')
const descriptionCol = document.querySelectorAll('.description-col')
const itemName = document.querySelectorAll('.item-name')
const hrefUrl = new URL(window.location.href)
const params = hrefUrl.searchParams.get('q');


warehouseName.forEach((elem) => {
    if(elem.textContent.match(params)) {
        elem.innerHTML = `<mark>${elem.textContent}</mark>`
    }
})

descriptionCol.forEach((elem) => {
    if(elem.textContent.match(params)) {
        elem.innerHTML = `<mark>${elem.textContent}</mark>`
    }
})

itemName.forEach((elem) => {
    if(elem.textContent.match(params)) {
        elem.innerHTML = `<mark>${elem.textContent}</mark>`
    }
})

// --------------------------- checked items handler ---------------------

const checkBox = document.querySelectorAll('input[type=checkbox]')

checkBox.forEach(element => {
    element.addEventListener('change', (e) => {
        element.childNodes
        console.log(e.target.id);
        const rowElement = e.target.parentElement.parentElement
        console.log(rowElement.childNodes);
        if(e.target.checked) {
            localStorage.setItem(`${e.target.id}`, {
                                                    warehouseName : rowElement.childNodes[3].innerText,
                                                    itemName: rowElement.childNodes[5].innerText,
                                                    catalogId : rowElement.childNodes[11].innerText,
                                                    } )
            // localStorage.setItem(`${e.target.id} itemName`,rowElement.childNodes[5].innerText)
            // localStorage.setItem(`${e.target.id} catalogId`,rowElement.childNodes[11].innerText)
            console.log(localStorage);
        }
        

    })
});


