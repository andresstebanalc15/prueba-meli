import React from 'react'
import {Nav} from './styles'
import { Logo } from '../Logo'
import { Input } from '../Input'
import LogoImg from '../../assets/static/Logo.png';

export const Navbar = () => (
    <div className='row'>
        <Nav className='row p-2' >
            <div className='col-2'>
                <Logo />
            </div>
            <div className='col-8 ps-3 p-1'>
                <Input text='Nunca dejes de buscar'/>
            </div>
            
        </Nav>    
    </div>
    
)
