document.addEventListener("DOMContentLoaded", () => {
  let nextLink = document.getElementById("next");
  let prevLink = document.getElementById("prev");

  let nextLinkVisibility = document.getElementById("toggle-display-next");
  let prevLinkVisibility = document.getElementById("toggle-display-prev");

  let currentPageIndex = 0;
  let pages = ["index.html", "second.html", "third.html", "forth.html"];

  firstPageInTransition();

  nextLink.addEventListener("click", event => {
    fetchPage(pages[++currentPageIndex], true);
    if (currentPageIndex > 0) {
      prevLinkVisibility.style.display = "block";
      nextLinkVisibility.style.display = "block";
    }
    if (currentPageIndex === pages.length - 1) {
      nextLinkVisibility.style.display = "none";
    }
  });

  prevLink.addEventListener("click", event => {
    fetchPage(pages[--currentPageIndex], false);
    if (currentPageIndex === 0) {
      prevLinkVisibility.style.display = "none";
    }
    if (currentPageIndex !== 0 && currentPageIndex < pages.length - 1) {
      nextLinkVisibility.style.display = "block";
      prevLinkVisibility.style.display = "block";
    }
  });

  function fetchPage(page, isNext) {
    let baseURL = `${window.location.protocol}//${window.location.hostname}`;
    if (window.location.port) {
      baseURL += `:${window.location.port}`;
    }
    fetch(`${baseURL}/${page}`)
      .then(response => response.text())
      .then(async htmlText => {
        let html = new DOMParser().parseFromString(htmlText, "text/html");
        currentPageIndex = pages.indexOf(page);
        if (isNext) {
          switch (currentPageIndex) {
            case 1:
              await firstPageOutTransition();
              break;
            case 2:
              await secondPageOutTransition("left");
              break;
            case 3:
              await thirdPageOutTransition("left");
              break;
            default:
              break;
          }
        }
        if (!isNext) {
          switch (currentPageIndex) {
            case 0:
              await secondPageOutTransition("right");
              break;
            case 1:
              await thirdPageOutTransition("right");
              break;
            case 2:
              await forthPageOutTransition("right");
              break;
            default:
              break;
          }
        }

        document
          .querySelector(".container")
          .appendChild(html.querySelector(".container-wrapper"));

        if (isNext) {
          switch (currentPageIndex) {
            case 1:
              secondPageInTransition("left");
            case 2:
              thirdPageInTransition("left");
            case 3:
              forthPageInTransition("left");
            default:
              break;
          }
        }
        if (!isNext) {
          switch (currentPageIndex) {
            case 0:
              firstPageInTransition();
              break;
            case 1:
              secondPageInTransition("right");
              break;
            case 2:
              thirdPageInTransition("right");
              break;
            default:
              break;
          }
        }
      });
  }

  // Direction means in which direction the content is flowing.

  function firstPageInTransition() {
    anime
      .timeline({
        easing: "easeInOutQuad"
      })
      .add({
        targets: ".title, .outlined, .button",
        translateX: [-400, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 1000
      })
      .add(
        {
          targets: ".collections",
          translateY: [-100, 0],
          opacity: [0, 1],
          duration: 1000
        },
        "-=1000"
      )
      .add(
        {
          targets: ".background",
          width: [0, "100%"],
          duration: 1000
        },
        "-=1000"
      );
  }

  function firstPageOutTransition() {
    return new Promise((resolve, reject) => {
      anime
        .timeline({
          easing: "easeInOutQuad"
        })
        .add({
          targets: ".title, .outlined, .button",
          translateX: [0, -400],
          opacity: [1, 0],
          delay: anime.stagger(100),
          duration: 1000
        })
        .add(
          {
            targets: ".collections",
            translateY: [0, 100],
            opacity: [1, 0],
            duration: 1000
          },
          "-=1000"
        )
        .add(
          {
            targets: ".background",
            width: 0,
            duration: 1000,
            complete: anime => {
              document.querySelector(".container-wrapper").remove();
              return resolve(true);
            }
          },
          "-=1000"
        );
    });
  }

  function secondPageInTransition(direction) {
    anime
      .timeline({
        easing: "easeInOutQuad"
      })
      .add({
        targets:
          ".title, .outlined, .product-name, .product-price, .image-wrapper, .add_button, .first, .second, .third, .fourth",
        translateX: direction == "left" ? [400, 0] : [-400, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 1000
      });
  }

  function secondPageOutTransition(direction) {
    return new Promise((resolve, reject) => {
      anime
        .timeline({
          easing: "easeInOutQuad"
        })
        .add({
          targets:
            ".title, .outlined, .product-name, .product-price, .image-wrapper, .add_button, .first, .second, .third, .fourth",
          translateX: direction == "left" ? [0, -400] : [0, 400],
          opacity: [1, 0],
          delay: anime.stagger(100),
          duration: 1000,
          complete: anim => {
            document.querySelector(".container-wrapper").remove();
            return resolve(true);
          }
        });
    });
  }

  function thirdPageInTransition(direction) {
    anime
      .timeline({
        easing: "easeInOutQuad"
      })
      .add({
        targets:
          ".title, .outlined, .description, .button, .first, .second, .third",
        translateX: direction == "left" ? [400, 0] : [-400, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 1000
      });
  }

  function thirdPageOutTransition(direction) {
    return new Promise((resolve, reject) => {
      anime
        .timeline({
          easing: "easeInOutQuad"
        })
        .add({
          targets:
            ".title, .outlined, .description, .button, .first, .second, .third",
          translateX: direction == "left" ? [0, -400] : [0, 400],
          opacity: [1, 0],
          delay: anime.stagger(100),
          duration: 1000,
          complete: anim => {
            document.querySelector(".container-wrapper").remove();
            return resolve(true);
          }
        });
    });
  }

  function forthPageInTransition(direction) {
    anime
      .timeline({
        easing: "easeInOutQuad"
      })
      .add({
        targets: ".title, .description, input, textarea, .button, .background",
        translateX: direction == "left" ? [400, 0] : [-400, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 1000
      });
  }

  function forthPageOutTransition(direction) {
    return new Promise((resolve, reject) => {
      anime
        .timeline({
          easing: "easeInOutQuad"
        })
        .add({
          targets:
            ".title, .description, input, textarea, .button, .background",
          translateX: direction == "left" ? [0, -400] : [0, 400],
          opacity: [1, 0],
          delay: anime.stagger(100),
          duration: 1000,
          complete: anim => {
            document.querySelector(".container-wrapper").remove();
            return resolve(true);
          }
        });
    });
  }
});
