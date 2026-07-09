const year = new Date().getFullYear();

document.title = `Fresh Graduate CS Portfolio · ${year}`;

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
	const slideCount = slides.length;

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

	prevButton.addEventListener("click", () => goTo(currentIndex - 1));
	nextButton.addEventListener("click", () => goTo(currentIndex + 1));

	dots.forEach((dot) => {
		dot.addEventListener("click", () => {
			goTo(Number(dot.dataset.carouselDot));
		});
	});

	carousel.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft") {
			goTo(currentIndex - 1);
		}

		if (event.key === "ArrowRight") {
			goTo(currentIndex + 1);
		}
	});

	carousel.setAttribute("tabindex", "0");
	render();
}
