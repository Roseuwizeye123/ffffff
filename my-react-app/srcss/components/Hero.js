import React from "react";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <section class="py-5 hero mb-4">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mt-5">
            <h2 class="display-4">Join Our Community</h2>
            <p class="lead">
              Be part of our awesome community and stay updated with the latest
              skills and knowledge.
            </p>
            <Link class="btn btn-secondary btn-lg" to="/register">
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
