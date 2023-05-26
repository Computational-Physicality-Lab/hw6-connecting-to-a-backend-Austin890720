import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import './Tshirts.css';
import shirts from '../../shared/shirts'
import routes from '../../shared/appRoutes';
const Tshirts = () => {
    const handleClick = (i) => {
        localStorage.setItem('shirt_number', i);
        localStorage.setItem('shirt_color', 'white');
    }
    return (
        <Container className='Tshirts'>
            <div className="Our_T-shirt">Our T-shirts</div>
            <div className="T-SHIRTS">
                {shirts.map((shirt, i) => (
                    <div className='shirt_box' key={i}>
                        <Link to={routes.detail}>
                            <button className='shirtImageButton' onClick={() => handleClick(i)}>
                                <img src={shirt.colors.white.front} className='image' alt=""/>
                            </button>
                        </Link>
                        <div className='name'>{shirt.name}</div>
                        <div className='colors'>Available in {Object.keys(shirt.colors).length} colors</div>
                        <div className='shirt_button'>
                            <Link to={routes.detail}>
                                <button className='leftAndRight_button' onClick={() => handleClick(i)}>
                                    See Page
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};
export default Tshirts;
