let doces = document.querySelector(".doces")

let pratos = document.querySelector(".pratos")

const elementos = document.querySelectorAll(".parallax")

//FUNCÕES

const secoesAtivas = new Set()

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      secoesAtivas.add(entrada.target)
    } else {
      secoesAtivas.delete(entrada.target)
    }
  })
}, {threshold: 0.1})

observador.observe(doces)
observador.observe(pratos)


const mapaElementos = new Map()

function obterElementos(section) {
  if(!mapaElementos.has(section)) {
    mapaElementos.set(section, section.querySelectorAll(".parallax"))
  }
  return mapaElementos.get(section)
}



function animarSection(section){

const scroll = window.scrollY
const sectionTop = section.offsetTop
const sectionHeight = section.offsetHeight

const progresso = (scroll - sectionTop + window.innerHeight * 0.7) / (sectionHeight + window.innerHeight)
const progressoLimitado = Math.max(0, Math.min(progresso, 1))

const elementos = obterElementos(section)

elementos.forEach((elemento) => {

const delay = parseFloat(elemento.dataset.delay) || 0
const progressoElemento = Math.max(0, progressoLimitado - delay)

const larguraTela = window.innerWidth
const alturaTela = window.innerHeight

const distanciaX = (parseFloat(elemento.dataset.x) || 1) * larguraTela
const distanciaY = (parseFloat(elemento.dataset.y) || 1) * alturaTela

const velocidade = parseFloat(elemento.dataset.speed) || 1

const movimentoX = progressoElemento * distanciaX * velocidade
const movimentoY = progressoElemento * distanciaY * velocidade

const rotacaoTotal = parseFloat(elemento.dataset.rotate) || 0
const rotacao = progressoElemento * rotacaoTotal


elemento.style.transform =
`translate3d(${movimentoX}px, ${movimentoY}px, 0) rotate(${rotacao}deg)`

})
}


function loop() {
  secoesAtivas.forEach(section => {
    animarSection(section)
  })

  requestAnimationFrame(loop)
}

loop()


const footer = document.querySelector(".marquee")
let footerStarted = false

window.addEventListener("scroll", () => {
  
  const scrollY = window.scrollY
  const viewportHeight = window.innerHeight
  const pageHeight = document.body.scrollHeight
  
  const distanceFromBottom = pageHeight - (scrollY + viewportHeight)

  if (distanceFromBottom < 150 && !footerStarted) {
    footer.classList.add("active")

    setTimeout(() => {
      footer.classList.add("running")
    }, 1600)

    footerStarted = true
  }

})
