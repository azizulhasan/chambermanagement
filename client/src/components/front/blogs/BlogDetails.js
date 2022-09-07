import React from "react";

export default function BlogDetails() {
  return (
    <React.Fragment>
              {/* <!-- Page content--> */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-8">
            {/* <!-- Post content--> */}
            <article>
              {/* <!-- Post header--> */}
              <header className="mb-4">
                {/* <!-- Post title--> */}
                <h1 className="fw-bolder mb-1">Welcome to Blog Post!</h1>
                {/* <!-- Post meta content--> */}
                <div className="text-muted fst-italic mb-2">
                  Posted on January 1, 2021 by Start Bootstrap
                </div>
                {/* <!-- Post categories--> */}
                <a
                  className="badge bg-secondary text-decoration-none link-light"
                  href="#!"
                >
                  Web Design
                </a>
                <a
                  className="badge bg-secondary text-decoration-none link-light"
                  href="#!"
                >
                  Freebies
                </a>
              </header>
              {/* <!-- Preview image figure--> */}
              <figure className="mb-4">
                <img
                  className="img-fluid rounded"
                  src="https://dummyimage.com/900x400/ced4da/6c757d.jpg"
                  alt="..."
                />
              </figure>
              {/* <!-- Post content--> */}
              <section className="mb-5">
                <p className="fs-5 mb-4">
                  Science is an enterprise that should be cherished as an
                  activity of the free human mind. Because it transforms who we
                  are, how we live, and it gives us an understanding of our
                  place in the universe.
                </p>
                <p className="fs-5 mb-4">
                  The universe is large and old, and the ingredients for life as
                  we know it are everywhere, so there's no reason to think that
                  Earth would be unique in that regard. Whether of not the life
                  became intelligent is a different question, and we'll see if
                  we find that.
                </p>
                <p className="fs-5 mb-4">
                  If you get asteroids about a kilometer in size, those are
                  large enough and carry enough energy into our system to
                  disrupt transportation, communication, the food chains, and
                  that can be a really bad day on Earth.
                </p>
                <h2 className="fw-bolder mb-4 mt-5">
                  I have odd cosmic thoughts every day
                </h2>
                <p className="fs-5 mb-4">
                  For me, the most fascinating interface is Twitter. I have odd
                  cosmic thoughts every day and I realized I could hold them to
                  myself or share them with people who might be interested.
                </p>
                <p className="fs-5 mb-4">
                  Venus has a runaway greenhouse effect. I kind of want to know
                  what happened there because we're twirling knobs here on Earth
                  without knowing the consequences of it. Mars once had running
                  water. It's bone dry today. Something bad happened there as
                  well.
                </p>
              </section>
            </article>
            {/* <!-- Comments section--> */}
            <section className="mb-5">
              <div className="card bg-light">
                <div className="card-body">
                  {/* <!-- Comment form--> */}
                  <form className="mb-4">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Join the discussion and leave a comment!"
                    ></textarea>
                  </form>
                  {/* <!-- Comment with nested comments--> */}
                  <div className="d-flex mb-4">
                    {/* <!-- Parent comment--> */}
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-circle"
                        src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                        alt="..."
                      />
                    </div>
                    <div className="ms-3">
                      <div className="fw-bold">Commenter Name</div>
                      <p>
                      If you're going to lead a space frontier, it has to be
                      government; it'll never be private enterprise. Because the
                      space frontier is dangerous, and it's expensive, and it
                      has unquantified risks.
                      </p>
                      {/* <!-- Child comment 1--> */}
                      <div className="d-flex mt-4">
                        <div className="flex-shrink-0">
                          <img
                            className="rounded-circle"
                            src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                            alt="..."
                          />
                        </div>
                        <div className="ms-3">
                          <div className="fw-bold">Commenter Name</div>
                          <p>
                          And under those conditions, you cannot establish a
                          capital-market evaluation of that enterprise. You
                          can't get investors.
                          </p>
                        </div>
                      </div>
                      {/* <!-- Child comment 2--> */}
                      <div className="d-flex mt-4">
                        <div className="flex-shrink-0">
                          <img
                            className="rounded-circle"
                            src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                            alt="..."
                          />
                        </div>
                        <div className="ms-3">
                          <div className="fw-bold">Commenter Name</div>
                          <p>
                          When you put money directly to a problem, it makes a
                          good headline.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Single comment--> */}
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-circle"
                        src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                        alt="..."
                      />
                    </div>
                    <div className="ms-3">
                      <div className="fw-bold">Commenter Name</div>
                      <p>
                      When I look at the universe and all the ways the universe
                      wants to kill us, I find it hard to reconcile that with
                      statements of beneficence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* <!-- Side widgets--> */}
          <div className="col-lg-4">
            {/* <!-- Search widget--> */}
            <div className="card mb-4">
              <div className="card-header">Search</div>
              <div className="card-body">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter search term..."
                    aria-label="Enter search term..."
                    aria-describedby="button-search"
                  />
                  <button
                    className="btn btn-primary"
                    id="button-search"
                    type="button"
                  >
                    Go!
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- Categories widget--> */}
            <div className="card mb-4">
              <div className="card-header">Categories</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <ul className="list-unstyled mb-0">
                      <li>
                        <a href="#!">Web Design</a>
                      </li>
                      <li>
                        <a href="#!">HTML</a>
                      </li>
                      <li>
                        <a href="#!">Freebies</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-6">
                    <ul className="list-unstyled mb-0">
                      <li>
                        <a href="#!">JavaScript</a>
                      </li>
                      <li>
                        <a href="#!">CSS</a>
                      </li>
                      <li>
                        <a href="#!">Tutorials</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Side widget--> */}
            <div className="card mb-4">
              <div className="card-header">Side Widget</div>
              <div className="card-body">
                You can put anything you want inside of these side widgets. They
                are easy to use, and feature the Bootstrap 5 card component!
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer--> */}
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; Your Website 2021
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
}
