import React, { Fragment, useEffect } from "react";
import Breadcumb from "../Components/Breadcumb";

const About = () => {
  useEffect(() => {
    window.scrollTo(1, 1);
  }, []);
  return (
    <Fragment>
      <Breadcumb to="About Us" what="About Us" />
      <section className="about section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img className="img-responsive" src="" />
            </div>
            <div className="col-md-6">
              <h2 className="mt-40">About Our Shop</h2>
              <p>blah</p>
              <p>blah</p>
              <p>blah</p>
              <a href="contact.html" className="btn btn-main mt-20">
                Download Company Profile
              </a>
            </div>
          </div>
          <div className="row mt-40">
            <div className="col-md-3 text-center">
              <img src="" />
            </div>
            <div className="col-md-3 text-center">
              <img src="" />
            </div>
            <div className="col-md-3 text-center">
              <img src="" />
            </div>
            <div className="col-md-3 text-center">
              <img src="" />
            </div>
          </div>
        </div>
      </section>
      <section className="team-members ">
        <div className="container">
          <div className="row">
            <div className="title">
              <h2>Team Members</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="team-member text-center">
                <img className="img-circle" src="" />
                <h4>Pratik</h4>
                <p>Founder</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="team-member text-center">
                <img className="img-circle" src="" />
                <h4>Rohit</h4>
                <p>Developer</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="team-member text-center">
                <img className="img-circle" src="" />
                <h4>Kartik</h4>
                <p>Shop Manager</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="team-member text-center">
                <img className="img-circle" src="" />
                <h4>Aryan</h4>
                <p>Shop Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section video-testimonial bg-1 overly-white text-center mt-50">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Video presentation</h2>
              <a className="play-icon" href="" data-toggle="lightbox">
                <i className="tf-ion-ios-play"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
