import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import routes from '../../shared/appRoutes';
import './Footer.css';

const Footer = () => {
  return (
    <Container className='Footer'>
      <div className="foot">
        <Link to={routes.notImplemented} className="foot_Text">Contact Us</Link>
        <Link to={routes.notImplemented} className="foot_Text">Site Map</Link>
        <Link to={routes.notImplemented} className="foot_Text">Privacy Policy</Link>
        <Link to={routes.notImplemented} className="foot_Text">Careers</Link>
        <Link to={routes.notImplemented} className="foot_Text">Reviews</Link>
        <p className="austin_foot_Text">Designed by Austin</p>
      </div>
    </Container >
  );
};

export default Footer;
