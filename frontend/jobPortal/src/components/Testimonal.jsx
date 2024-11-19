import React from 'react'

function Testimonal() {
    return (
        <>
            {/* <!-- Header End --> */}
            <div className="container-flex py-5 bg-dark page-header mb-5">
                <div className="container my-5 pt-5 pb-4">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Testimonial</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Pages</a></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">Testimonial</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* <!-- Header End --> */}


            {/* <!-- Testimonial Start --> */}
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <h1 className="text-center mb-5">Our Clients Say!!!</h1>
                    <div className="owl-carousel testimonial-carousel">
                        <div className="testimonial-item bg-light rounded p-4">
                            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                            <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                            <div className="d-flex align-items-center">
                                <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-1.jpg" style={{width: "50px;", height: "50px;"}}/>
                                    <div className="ps-3">
                                        <h5 className="mb-1">Client Name</h5>
                                        <small>Profession</small>
                                    </div>
                            </div>
                        </div>
                        <div className="testimonial-item bg-light rounded p-4">
                            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                            <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                            <div className="d-flex align-items-center">
                                <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-2.jpg" style={{width: "50px;", height: "50px;"}}/>
                                    <div class="ps-3">
                                        <h5 className="mb-1">Client Name</h5>
                                        <small>Profession</small>
                                    </div>
                            </div>
                        </div>
                        <div className="testimonial-item bg-light rounded p-4">
                            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                            <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                            <div className="d-flex align-items-center">
                                <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-3.jpg" style={{width: "50px;", height: "50px;"}}/>
                                    <div className="ps-3">
                                        <h5 className="mb-1">Client Name</h5>
                                        <small>Profession</small>
                                    </div>
                            </div>
                        </div>
                        <div className="testimonial-item bg-light rounded p-4">
                            <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                            <p>Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam</p>
                            <div class="d-flex align-items-center">
                                <img className="img-fluid flex-shrink-0 rounded" src="img/testimonial-4.jpg" style={{width: "50px;", height: "50px;"}}/>
                                    <div className="ps-3">
                                        <h5 className="mb-1">Client Name</h5>
                                        <small>Profession</small>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Testimonial End --> */}
        </>
    )
}

export default Testimonal