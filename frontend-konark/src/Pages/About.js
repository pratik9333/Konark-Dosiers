import React, { Fragment } from "react";

const About = () => {
  return (
    <Fragment>
      <section className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content">
                <h1 className="page-name">About Us</h1>
                <ol className="breadcrumb">
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li className="active">about us</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

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
