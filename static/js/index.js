const deleteBtn = document.querySelectorAll(".delete-btn")
const printBtn = document.querySelector('.print')

// ------------------- modal table creator --------------------

// console.log(document.querySelectorAll('.modal'))
function create_modal() {
    const modalTable = document.querySelector('.modal-tbody')
    const quantityElem = document.querySelector('#quantity')
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

            if (k != "id") {
                if (k == 'quantity') {
                    pElem = document.createElement('td')
                    pElem.classList = k
                    pElem.innerHTML = `<input type='number' class="modal-quantity-input" placeholder="quantity">`
                    tr.appendChild(pElem)
                } else {
                    pElem = document.createElement('td')
                    pElem.classList = k
                    pElem.textContent = data[i][k]
                    tr.appendChild(pElem)
                }

            }

        }
        // pElem = document.createElement('td')
        // pElem.innerHTML = '<button type="submit"  class="modal-delete-btn"><img src="../static/svg/delete-svgrepo-com (1).svg" alt="" class="delete-svg"><small class="info">Remove</small></button>'
        // tr.appendChild(pElem)
    }
}

create_modal()

// ------------------------ SHOW MODAL -----------------------
const modal = document.querySelector('.modal')
const list = document.querySelector('.checked-list')
const modalDeleteBtn = document.querySelectorAll('.modal-delete-btn')

modalDeleteBtn.forEach(elem => {
    elem.addEventListener('click', (e) => {
        delete (e.target.parentElement.parentElement.parentElement);
    })

})

list.addEventListener('click', () => {
    if (modal.style.display === 'flex') {
        modal.style.display = "none"
    } else {
        modal.style.display = "flex"
        create_modal()
    }
})

// --------------------------- copy to clipboard handler -----------
const copyBtn = document.querySelector('.modal-copy-btn')

copyBtn.addEventListener('click', () => {
    let dataString = ""
    const itemName = document.querySelectorAll('.itemName')
    const quantity = document.querySelectorAll('.modal-quantity-input')
    const catalogId = document.querySelectorAll('.catalogId')
    for (let i = 0; i < itemName.length; i++) {
        dataString += `item:${itemName[i].innerText}
        quantity:${quantity[i].value} 
        catalog-id:${catalogId[i].innerText}\n----------------------------------\n`
    }
    navigator.clipboard.writeText(dataString).then(() => {
        console.log("text copied");
    })

})

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
function checkedItemsBuilder() {
    const checkBox = document.querySelectorAll('input[type=checkbox]')

    checkBox.forEach(element => {
        let localStorageData = JSON.parse(localStorage.getItem(element.id))
        if (localStorageData) {
            element.checked = true
        }
    })

    checkBox.forEach(element => {
        element.addEventListener('change', (e) => {
            
            checkedListUpdate()
            const rowElement = e.target.parentElement.parentElement

            if (e.target.checked) {
                const rowData = JSON.stringify({
                    id: e.target.id,
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
    
}

checkedItemsBuilder()

//----------------------- CHECK BTN ADD TO LOCAL STORAGE ------------
function checkboxreader() {
    const checkBox = document.querySelectorAll('input[type=checkbox]')
    checkBox.forEach(element => {
        let localStorageData = JSON.parse(localStorage.getItem(element.id))
        if (localStorageData) {
            element.checked = true
        }
    })
    
    checkBox.forEach((elem) => {
        // console.log(elem.parentElement.parentElement);
        const rowElement = elem.parentElement.parentElement
        // console.log(rowElement.childNodes);
        // console.log(elem);
        if (elem.checked) {
            const rowData = JSON.stringify({
                id: elem.id,
                itemName: rowElement.childNodes[5].innerText,
                quantity: '0',
                catalogId: rowElement.childNodes[11].innerText,
            })
            localStorage.setItem(`${elem.id}`, rowData)
        } else if (elem.checked === 0) {
            localStorage.removeItem(`${elem.id}`)
        }
    }) 
    // console.log(checkBox);
}

// -------------------------- CHECK BUTTON HANDLER ------------------
const checkAllBtn = document.querySelector('.check-all-btn');
const checkedbox = document.querySelectorAll('.checkbox-btn');
const uncheckAll = document.querySelector('.uncheck-btn');

checkAllBtn.addEventListener('click', () => {
    checkedbox.forEach((elem) => {
        console.log(elem.checked);
        elem.checked = true;
    })
    
    checkboxreader()
    checkedListUpdate()
})

uncheckAll.addEventListener('click', () => {
    checkedbox.forEach((element) => {
        console.log(element.checked);
        element.checked = 0;
        localStorage.removeItem(`${element.id}`)
    })
    
    console.log('all done');
    checkedListUpdate()
})

// -------------------- PRODUCTS NUMBER ON CHECKED LIST HANDLER ----
function checkedListUpdate() {
    const checkedListBtn = document.querySelector('.checked-list');
    const checkedBtn = document.querySelectorAll('.checkbox-btn');
    let res = 0
    checkedBtn.forEach((element) => {
        if(element.checked === true) {
            res += 1;
        }
    })
    // const listLenght = modalTable.childNodes
    checkedListBtn.textContent = `Checked list ${res}`
}
checkedListUpdate()










