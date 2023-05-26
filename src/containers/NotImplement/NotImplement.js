import React from 'react';
import { Container } from 'reactstrap';
import scotty from "../../assets/images/scotty.png"
import './NotImplement.css';

const NotImplement = () => {
    return (
        <Container className='NotImplement'>
            <div className="not_implemented">
                <img src={scotty} alt=''/>
                    <p className="Oops">Oops, this page doesn't exist yet... how about a shirt from the last page?</p>
            </div>
        </Container >
    );
};
export default NotImplement;