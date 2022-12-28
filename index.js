import { Select } from "./select/select"
import './select/style.css'


const select = new Select('#select', {
    placeholder: 'select item',
    data: [
        {id: '1li', value: 'item one'},
        {id: '2li', value: 'item two'},
        {id: '3li', value: 'item three'},
        {id: '4li', value: 'item four'},
        {id: '5li', value: 'item five'},
        {id: '6li', value: 'item six'},
        {id: '7li', value: 'item seven'},
        {id: '8li', value: 'item eight'},
        {id: '9li', value: 'item nine'}
    ]
}) 

window.s = select
