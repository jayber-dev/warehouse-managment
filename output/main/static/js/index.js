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


