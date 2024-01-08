import React from 'react'
import './ingredient.css'
import BreadTop from '../../../assets/images/top.png'
import BreadBottom from '../../../assets/images/bottom.png'
import Meat from '../../../assets/images/meat.png'
import Cucom from '../../../assets/images/cucom.png'
import Cheese from '../../../assets/images/cheese.png'
import Tomato from '../../../assets/images/tomato.png'
import Onion from '../../../assets/images/onion.png'
import Veg from '../../../assets/images/veg.png'

const Ingredient = (props) => {
    let ingredient = null
    switch (props.type) {
        case 'bread-top':
            ingredient = <div style={{margin: "0"}}><img src={BreadTop} alt={props.type}/></div>
            break;
        case 'bread-bottom':
            ingredient = <div style={{margin: "0"}}><img src={BreadBottom} alt={props.type}/></div>
            break;
            case 'tomato':
            ingredient = <div><img src={Tomato} alt={props.type}/></div>
            break;
        case 'onion':
            ingredient = <div><img src={Onion} alt={props.type}/></div>
            break;
        case 'vegitable':
            ingredient = <div><img src={Veg} alt={props.type}/></div>
            break;
        case 'cucumber':
            ingredient = <div><img src={Cucom} alt={props.type}/></div>
            break;
        case 'meat':
            ingredient = <div><img src={Meat} alt={props.type}/></div>
            break;
        case 'cheese':
            ingredient = <div><img src={Cheese} alt={props.type}/></div>
            break;
    
        default:
            ingredient = null;
    }
  return (
    <div className='ingredient'>
        {ingredient}
    </div>
  )
}

export default Ingredient