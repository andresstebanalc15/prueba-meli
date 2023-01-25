import React from 'react'
import LogoImg from '../../assets/static/ic_search.png';
import {Button} from './styles'

export const Input = ({text = ''}) => (
    <div className="input-group">
        <input className="form-control" placeholder={text}/>
        <Button className="btn btn-light p-0" type="button"><img src={LogoImg} className="col-7"></img></Button>
    </div>
)
