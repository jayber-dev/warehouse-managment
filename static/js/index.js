const deleteBtn = document.querySelectorAll(".delete-btn")
deleteBtn.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (!confirm('are you sure ?')) {
            e.preventDefault()
        }
    })
}) 
