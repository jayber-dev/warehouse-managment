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

