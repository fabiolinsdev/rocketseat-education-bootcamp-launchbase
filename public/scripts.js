const Mask ={
    apply(input, func){
        setTimeout(function(){
           input.value = Mask[func](input.value)
        }, 1)

    },
    formatBRL(value){
        
        value = value.replace(/\D/g,"")

        return  new Intl.NumberFormat( 'pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
    }
}

const PhotosUpload =  {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit:6,
    files: [],
    handleFileInput(event) {
        const { File: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)           

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

       PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const {files: fileList} = input


        if (fileList.length > uploadLimit) {
          alert(`Evite no maximo ${uploadLimit}fotos`)
            event.preventDefault()
            return true
        }
        
        const photoDiv = []
        preview.childNodes.forEach(item =>{
            if (item.classListass && item.classList.value == "photo")
            photoDiv.push(item)
        })

        const totalPhotos = fileList.length + photoDiv.length
        if (totalPhotos > uploadLimit) {
            alert("Voçê antigiu o limite máximo de fotos")
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent (""). clipboardData || new DataTransfer ()

        PhotosUpload.file.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(Image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removerPhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = 'close'
        return button
    },
    removerPhoto(event) {
        const photoDiv =  event.target.parentNode
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoDiv =  event.target.parentNode
        
        if (photoDiv.id) {
                const removedFiles = document.querySelector('input [name="removed_files"]')
                if (removedFiles) {
                    removedFiles.value += `${photoDiv.id},`
                }
            }

        photoDiv.remove()
    }

}

const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('gallery-preview img'),
    setImage(e) {
        const {target} = e

        ImageGallery.previews.forEach(preview => previews.classList.remove('active'))

        target.classList.add('active')

        ImageGallery.highlight.src = target.src
        Lightbox.image.src = target.src
    }
}

const Lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeBotton: document.querySelector('.lightbox-target a.lightbox-close'),
    open () {
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top = 0
        Lightbox.target.style.bottom = 0
        Lightbox.closeBotton.style.top = 0
    },
    close () {
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.bottom = "initial"
        Lightbox.closeBotton.style.top = "-80px"
    }
}