import React from 'react';
import styles from '../styles/Footer.module.css';
import { FaFacebook, FaWhatsapp, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className={styles.fcontainer}>
            <div className={styles.footer}>

                <div className={styles.fcontent}>
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Advisors</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                <div className={styles.fcontent}>
                    <h2>Follow Us</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th><FaFacebook /></th>
                                <td>Facebook</td>
                            </tr>
                            <tr>
                                <th><FaWhatsapp /></th>
                                <td>Whatsapp</td>
                            </tr>
                            <tr>
                                <th><FaInstagram /></th>
                                <td>Instagram</td>
                            </tr>
                            <tr>
                                <th><FaTwitter /></th>
                                <td>Twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.fcontent}>
                    <h2>Contact Us</h2>
                    <address>
                        31/2, AGB Colony, Motijheel, Dhaka - 1000 <br />
                        Email: amql3it@gmail.com <br />
                        Phone: +8801517094266
                    </address>
                </div>
            </div>

            <hr className={styles.hr} />
            
            <div className={styles.addLine}>
                <p>&copy; 2025 AMQL3it. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
