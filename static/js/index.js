const deleteBtn = document.querySelectorAll(".delete-btn")
const printBtn = document.querySelector('.print')

// ------------------- modal table creator --------------------

// console.log(document.querySelectorAll('.modal'))
function create_modal() {
    const modalTable = document.querySelector('.modal-tbody')
    modalTable.innerHTML = ""
    const data = new Array()

    for (i in localStorage) {
        if (localStorage.getItem(i)) {
            data.push(JSON.parse(localStorage.getItem(i)))
        }
    }
    
    for (let i = 0; i < data.length; i++) {
        const tr = document.createElement('tr')
        modalTable.appendChild(tr)
        for (k in data[i]) {

            console.log(data[i][k])
            if (k != "id") {
                pElem = document.createElement('td')
                pElem.setAttribute('id', k)
                pElem.textContent = data[i][k]
                tr.appendChild(pElem)
            }
        }
        pElem = document.createElement('td')
        pElem.innerHTML = '<button type="submit"  class="modal-delete-btn"><img src="../static/svg/delete-svgrepo-com (1).svg" alt="" class="delete-svg"><small class="info">Remove</small></button>'
        tr.appendChild(pElem)
    }
}

create_modal()

//  --------------------------search handler -----------------------

deleteBtn.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (!confirm('are you sure ?')) {
            e.preventDefault()
        }
    })
})

printBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.print()
})


const warehouseName = document.querySelectorAll('.warehouse-col')
const descriptionCol = document.querySelectorAll('.description-col')
const itemName = document.querySelectorAll('.item-name')
const hrefUrl = new URL(window.location.href)
const params = hrefUrl.searchParams.get('q');


warehouseName.forEach((elem) => {
    if (elem.textContent.match(params)) {
        elem.innerHTML = `<mark>${elem.textContent}</mark>`
    }
})

descriptionCol.forEach((elem) => {
    if (elem.textContent.match(params)) {
        elem.innerHTML = `<mark>${elem.textContent}</mark>`
    }
})

itemName.forEach((elem) => {
    if (elem.textContent.match(params)) {
        elem.innerHTML = `<mark>${elem.textContent}</mark>`
    }
})

// ---------------------------main screen checked items handler ---------------------

const checkBox = document.querySelectorAll('input[type=checkbox]')

checkBox.forEach(element => {
    let localStorageData = JSON.parse(localStorage.getItem(element.id))
    if (localStorageData) {
        element.checked = true
    }
})

checkBox.forEach(element => {
    element.addEventListener('change', (e) => {
        const rowElement = e.target.parentElement.parentElement

        if (e.target.checked) {
            const rowData = JSON.stringify({
                id: e.target.id,
                // warehouseName : rowElement.childNodes[3].innerText,
                itemName: rowElement.childNodes[5].innerText,
                quantity: '0',
                catalogId: rowElement.childNodes[11].innerText,
            })
            localStorage.setItem(`${e.target.id}`, rowData)
        } else if (!e.target.checked) {
            localStorage.removeItem(`${e.target.id}`)
            
        }
    })

    
});

// ------------------------ SHOW MODAL -----------------------
const modal = document.querySelector('.modal')
const list = document.querySelector('.checked-list')
const modalDeleteBtn = document.querySelectorAll('.modal-delete-btn')
console.log(modalDeleteBtn);

modalDeleteBtn.forEach(elem => {
    elem.addEventListener('click', (e) => {
        delete (e.target.parentElement.parentElement.parentElement);
    })

})

list.addEventListener('click', () => {
    console.log(modal.style.display);
    if (modal.style.display === 'flex') {
        modal.style.display = "none"
    } else {
        modal.style.display = "flex"
        create_modal()
    }
})








