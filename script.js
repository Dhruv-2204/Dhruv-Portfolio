const year = new Date().getFullYear();

document.title = `Fresh Graduate CS Portfolio · ${year}`;

const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

if (revealItems.length) {
	revealItems.forEach((item, index) => {
		item.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
	});

	if ("IntersectionObserver" in window) {
		const revealObserver = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}

					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				});
			},
			{
				threshold: 0.18,
				rootMargin: "0px 0px -8% 0px",
			}
		);

		revealItems.forEach((item) => revealObserver.observe(item));
	} else {
		revealItems.forEach((item) => item.classList.add("is-visible"));
	}
}

const carousel = document.querySelector("[data-carousel]");

if (carousel) {
	const track = carousel.querySelector(".carousel-track");
	const slides = Array.from(carousel.querySelectorAll(".project-slide"));
	const prevButton = carousel.querySelector('[data-carousel-action="prev"]');
	const nextButton = carousel.querySelector('[data-carousel-action="next"]');
	const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
	const currentLabel = carousel.querySelector("[data-carousel-current]");
	const totalLabel = carousel.querySelector("[data-carousel-total]");

	let currentIndex = 0;
	let autoplayId = null;
	const slideCount = slides.length;
	const autoplayMs = 4500;

	const render = () => {
		track.style.transform = `translateX(-${currentIndex * 100}%)`;
		currentLabel.textContent = String(currentIndex + 1).padStart(2, "0");
		totalLabel.textContent = String(slideCount).padStart(2, "0");

		slides.forEach((slide, index) => {
			slide.setAttribute("aria-hidden", String(index !== currentIndex));
		});

		dots.forEach((dot, index) => {
			dot.setAttribute("aria-current", String(index === currentIndex));
		});
	};

	const goTo = (index) => {
		currentIndex = (index + slideCount) % slideCount;
		render();
	};

	const stopAutoplay = () => {
		if (autoplayId) {
			clearInterval(autoplayId);
			autoplayId = null;
		}
	};

	const startAutoplay = () => {
		stopAutoplay();
		autoplayId = setInterval(() => {
			goTo(currentIndex + 1);
		}, autoplayMs);
	};

	prevButton.addEventListener("click", () => {
		goTo(currentIndex - 1);
		startAutoplay();
	});

	nextButton.addEventListener("click", () => {
		goTo(currentIndex + 1);
		startAutoplay();
	});

	dots.forEach((dot) => {
		dot.addEventListener("click", () => {
			goTo(Number(dot.dataset.carouselDot));
			startAutoplay();
		});
	});

	carousel.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft") {
			goTo(currentIndex - 1);
			startAutoplay();
		}

		if (event.key === "ArrowRight") {
			goTo(currentIndex + 1);
			startAutoplay();
		}
	});

	carousel.addEventListener("mouseenter", stopAutoplay);
	carousel.addEventListener("mouseleave", startAutoplay);
	carousel.addEventListener("focusin", stopAutoplay);
	carousel.addEventListener("focusout", startAutoplay);

	document.addEventListener("visibilitychange", () => {
		if (document.hidden) {
			stopAutoplay();
			return;
		}

		startAutoplay();
	});

	carousel.setAttribute("tabindex", "0");
	render();
	startAutoplay();
}
