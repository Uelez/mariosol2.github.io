function copyText(element) {
  var textToCopy = element.innerText

  var myTemporaryInputElement = document.createElement('input')
  myTemporaryInputElement.type = 'text'
  myTemporaryInputElement.value = textToCopy

  document.body.appendChild(myTemporaryInputElement)

  myTemporaryInputElement.select()
  document.execCommand('Copy')

  document.body.removeChild(myTemporaryInputElement)

}

const mask = document.getElementById('mask')

const startModal = document.getElementById('startModal')
const startButton = document.getElementById('startButton')
const startModalClose = document.getElementById('startModalClose')

startButton.addEventListener('click', () => {
  startModal.classList.add('show')
})

startModalClose.addEventListener('click', () => {
  startModal.classList.remove('show')
})

const packmanModal = document.getElementById('packmanModal')
const packmanButton = document.getElementById('packmanButton')
const packmanModalClose = document.getElementById('packmanModalClose')

packmanButton.addEventListener('click', () => {
  packmanModal.classList.add('show')
})

packmanModalClose.addEventListener('click', () => {
  packmanModal.classList.remove('show')
})

const minesweeperModal = document.getElementById('minesweeperModal')
const minesweeperButton = document.getElementById('minesweeperButton')
const minesweeperModalClose = document.getElementById('minesweeperModalClose')

minesweeperButton.addEventListener('click', () => {
  minesweeperModal.classList.add('show')
})

minesweeperModalClose.addEventListener('click', () => {
  minesweeperModal.classList.remove('show')
})

const copyButton = document.getElementById('copyButton')
const contractNumber = document.querySelector('.contract-number')
copyButton.addEventListener('click', () => {
  copyText(contractNumber)
})

const buyModal = document.getElementById('buyModal')
const buyButtons = document.querySelectorAll('.buy-open')
const buyModalClose = document.getElementById('buyModalClose')

const phantomConnected = document.getElementById('modalPhantom')
const solflareConnected = document.getElementById('modalSolflare')

buyButtons.forEach(button => {
  button.addEventListener('click', async () => {
    buyModal.classList.add('show')

    if ('phantom' in window) {
      const provider = window.phantom?.solana

      if (provider?.isPhantom) {
        await provider.connect()
          .then(resp => {
            if (provider.isConnected) {
              phantomButtonText.innerText = resp.publicKey.toString()
              console.log('Connected to Phantom')
              phantomConnected.classList.add('show')
            }
          })
          .catch(err => console.log(err))
      }
    }

    if (window.solflare) {
      window.solflare.connect()
      window.solflare.on('connect', () => {
        console.log('connected!')
        solflareConnected.classList.add('show')
      })
    }
  })
})

buyModalClose.addEventListener('click', () => {
  buyModal.classList.remove('show')
})

const walletModal = document.getElementById('walletModal')
const walletButtons = document.querySelectorAll('.wallet-btn')
const walletModalClose = document.getElementById('walletModalClose')

walletButtons.forEach(button => {
  button.addEventListener('click', () => {
    walletModal.classList.add('show')
    mask.classList.add('show')
  })
})

walletModalClose.addEventListener('click', () => {
  walletModal.classList.remove('show')
  mask.classList.remove('show')
})

const roadmapModal = document.getElementById('roadmapModal')
const roadmapButton = document.getElementById('roadmapButton')
const roadmapModalClose = document.getElementById('roadmapModalClose')

roadmapButton.addEventListener('click', () => {
  roadmapModal.classList.add('show')
})

roadmapModalClose.addEventListener('click', () => {
  roadmapModal.classList.remove('show')
})



const phantomButton = document.getElementById('phantomButton')
const phantomButtonText = document.getElementById('phantomButtonText')

phantomButton.addEventListener('click', async () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana

    if (provider?.isPhantom) {
      await provider.connect()
        .then(resp => {
          if (provider.isConnected) {
            phantomButtonText.innerText = resp.publicKey.toString()
            console.log('Connected to Phantom')
          }
        })
        .catch(err => console.log(err))
    } else {
      window.open('https://phantom.app/', '_blank')
    }
  } else {
    window.open('https://phantom.app/', '_blank')
  }
})

const solflareButton = document.getElementById('solflareButton')
const solflareButtonText = document.getElementById('solflareButtonText')

solflareButton.addEventListener('click', async () => {
  if (window.solflare) {
    window.solflare.connect()
    window.solflare.on('connect', () => console.log('connected!'))
    setTimeout(() => {
      solflareButtonText.innerText = window.solflare.publicKey.toString()
    }, 100)
  } else {
    window.open('https://solflare.com/', '_blank')
  }
})