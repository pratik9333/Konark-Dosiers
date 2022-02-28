import React from "react";

export const Footer = () => {
  return (
    <footer
      className="footer section text-center"
      style={{ marginTop: "150px" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ul className="social-media">
              <li>
                <i className="tf-ion-social-facebook"></i>
              </li>
              <li>
                <i className="tf-ion-social-instagram"></i>
              </li>
              <li>
                <i className="tf-ion-social-twitter"></i>
              </li>
              <li>
                <i className="tf-ion-social-pinterest"></i>
              </li>
            </ul>
            <ul className="footer-menu text-uppercase">
              <li>CONTACT</li>
              <li>SHOP</li>
              <li>PRIVACY POLICY</li>
            </ul>
            <p className="copyright-text text-dark">
              Copyright &copy;2021, Designed &amp; Developed by Konark Dossiers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
