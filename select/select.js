const getTemplate = (data = [], placeholder, selectedId)=> {
    let text = placeholder ?? 'default placeholder'
    const lihtml = data.map(item => {
        if (item.id === selectedId) {
            text = item.value
        }
        return `<li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>`
    })
   return `
   <div class="close__backdrop" data-type="close"></div>
    <div class="input" data-type="input"><span data-type="input">${text}</span><div class="arricon"><i class="fa-solid fa-caret-down" data-type="input"></i></div></div>
            <div class="dropdown">
               <ul class="select__list">
                 ${lihtml.join('')} 
               </ul> 
            </div>
    `
}

export class Select {
    constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId
    this.#render()
    this.#setup()
    
    }

    #render() {
        const {placeholder, data} = this.options
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$arr = this.$el.querySelector('i')
        this.$value = this.$el.querySelector('span')
    }

    clickHandler(event) {
        const {type} = event.target.dataset
        if (type === 'input') {
            this.toggle()
        } else if (type === 'item') {
            const id = event.target.dataset.id
            this.select(id) 
        } else if (type === 'close') {
            this.close()
        }
    }

    get isOpen() {
       return this.$el.classList.contains('open')
    }
    get current() {
        return this.options.data.find(item => item.id === this.selectedId)
    }
    select(id) {
        this.selectedId = id
        this.$value.textContent = this.current.value
        this.$el.querySelectorAll(`[data-type="item"]`).forEach(el => {
            el.classList.remove('selected')
        })
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
        this.options.onSelect ? this.options.onSelect(this.current) : null
        this.close()
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.$el.classList.add('open')
        this.$arr.classList.remove('fa-caret-down')
        this.$arr.classList.add('fa-caret-up')
    }
    close() {
        this.$el.classList.remove('open')
        this.$arr.classList.remove('fa-caret-up')
        this.$arr.classList.add('fa-caret-down')
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler)
        this.$el.innerHTML = ''
    }
}