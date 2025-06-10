
const createForm = document.querySelector('form')

createForm.addEventListener('submit', async(e)=>{
	e.preventDefault()

	const bookData = new FormData(createForm)
	const reqBody = Object.fromEntries(bookData)
        console.log(reqBody)
        
    const response = await fetch('/post/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(reqBody)

})
window.locaion.href="/reviewed-apps"
})
