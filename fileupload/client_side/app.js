const fileInput = document.getElementById('fileInput')
const fileName = document.getElementById('fileName')
const fileSize = document.getElementById('fileSize')
const fileInfo = document.getElementById('fileInfo')
const submitBtn = document.getElementById('submitBtn')
const dropZone = document.getElementById('dropZone')
const form = document.getElementById('uploadForm')
const percentage = document.getElementById('percent')
const progressBar = document.getElementById('progressBar')

fileInput.addEventListener('change', (e) => {
  if (fileInput.files.length > 0) {
    uploadFile(fileInput.files[0])
    console.log(fileInput.files[0])
  }
})

function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`
}

const uploadFile = (file) => {
  fileName.textContent = file.name
  fileSize.textContent = formatSize(file.size)
  fileInfo.style.display = 'block'
  submitBtn.disabled = false

  let img = URL.createObjectURL(file)
  if (file.type === 'image/jpeg' || file.type === 'image/png') {
    dropZone.style.background = `url(${img})`
    dropZone.style.backgroundRepeat = 'no-repeat'
    dropZone.style.backgroundSize = '100px 100px'
    dropZone.style.backgroundSize = '100px 100px'
    dropZone.style.backgroundPosition = 'center'
    dropZone.textContent = ''
    dropZone.style.border = 0
  }

  if (file.type.startsWith('image/')) {
    submitBtn.addEventListener(
      'click',
      () => {
        URL.revokeObjectURL(img)
      },
      { once: true }
    )
  }
}

// drag and drop handling
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault()
  e.stopPropagation()
})

dropZone.addEventListener('drop', (e) => {
  e.preventDefault()
  e.stopPropagation()
  if (e.dataTransfer.files.length > 0) {
    fileInput.files = e.dataTransfer.files
    uploadFile(fileInput.files[0])
  }
})

// Handling form submission

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const file = fileInput.files[0]

  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  const xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:3000/upload', true)

  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      const percent = (e.loaded / e.total) * 100
      progressBar.style.width = `${percent}%`
      progressBar.style.background = '#4CAF50'
      percentage.textContent = `${Math.floor(percent)}%`
    }
  }
  progressBar.style.display = 'block'
  submitBtn.disabled = true
  submitBtn.textContent = 'Uploading...'

  xhr.onload = function () {
    if (this.status == 200) {
      progressBar.style.background = '#4CAF50'
      submitBtn.textContent = 'Upload Complete'
    } else {
      progressBar.style.background = '#f44336'
      submitBtn.textContent = 'Upload failed'
      console.error('Upload failed', this.statusText)
    }
  }

  xhr.onerror = () => {
    progressBar.style.backgroundColor = '#f44336'
    submitBtn.textContent = 'Upload Failed'
    console.error('Network error during upload')
  }

  xhr.send(formData)
})
