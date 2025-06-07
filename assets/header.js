(function () {
	const header = () => {
		const header = document.querySelector(".shopify-section-header");
		const menu = document.querySelector(".list-menu--inline");
		const menuLinks = document.querySelectorAll(".list-menu-item");
		const search = document.querySelector(".header__search");

		header.addEventListener("keydown", (e) => {
			if (e.code === "Escape" && search.isOpen) {
				search.close();
			}
		});

		const annBar = document.querySelector(".section-announcement");
		const annBarObserver = new IntersectionObserver((entries) => {
			const [entry] = entries;

			if (entry.isIntersecting) {
				document.documentElement.style.setProperty(
					"--ann-height",
					`${entry.intersectionRect.height}px`,
				);
			} else {
				document.documentElement.style.setProperty("--ann-height", `0px`);
			}
		});
		if (annBar) annBarObserver.observe(annBar);

		menuLinks.forEach((link) => {
			link.addEventListener("mouseenter", (e) => {
				if (link.classList.contains("list-menu--megamenu")) {
					link.classList.add("list-menu--megamenu-visible");

					menuLinks.forEach((el) => {
						if (el !== link) {
							el.classList.remove("list-menu--megamenu-visible");
						}
					});
				} else {
					menuLinks.forEach((el) => {
						el.classList.remove("list-menu--megamenu-visible");
					});
				}
			});
			link.addEventListener("focus", (e) => {
				if (link.classList.contains("list-menu--megamenu")) {
					link.classList.add("list-menu--megamenu-visible");

					menuLinks.forEach((el) => {
						if (el !== link) {
							el.classList.remove("list-menu--megamenu-visible");
						}
					});
				} else {
					menuLinks.forEach((el) => {
						el.classList.remove("list-menu--megamenu-visible");
					});
				}
			});
		});
		menu.addEventListener("mouseleave", (e) => {
			menuLinks.forEach((link) => {
				link.classList.remove("list-menu--megamenu-visible");
			});
		});
		menu.addEventListener("focusout", (e) => {
			menuLinks.forEach((link) => {
				link.classList.remove("list-menu--megamenu-visible");
			});
		});

		const megaMenuTabs = () => {
			$(".mega-menu__tab-wrapper")
				.children()
				.find(".mega-menu__tab-wrapper")
				.first()
				.addClass("mega-menu__tab-wrapper--active");
			$(".mega-menu__tab-wrapper").mouseenter(function (event) {
				$(".mega-menu__tab-wrapper").removeClass(
					"mega-menu__tab-wrapper--active",
				);
				$(this).addClass("mega-menu__tab-wrapper--active");
			});
			$(".mega-menu__tab-wrapper").focus(function (event) {
				$(".mega-menu__tab-wrapper").removeClass(
					"mega-menu__tab-wrapper--active",
				);
				$(this).addClass("mega-menu__tab-wrapper--active");
			});
			$(".mega-menu__tab-wrapper").focusin(function (event) {
				$(".mega-menu__tab-wrapper").removeClass(
					"mega-menu__tab-wrapper--active",
				);
				$(this).addClass("mega-menu__tab-wrapper--active");
			});
		};
		megaMenuTabs();

		const main = document.querySelector("main");
		const breadcrumbs = document.querySelector(".breadcrumbs-wrapper");
		if (
			main.querySelectorAll(".shopify-section")[0] &&
			main
				.querySelectorAll(".shopify-section")[0]
				.classList.contains("section--has-overlay")
		) {
		}

		const menuCloseBtn = document.querySelector(".header__modal-close-button");
		const mobileMenuDrawer = document.querySelector("header-drawer");
		menuCloseBtn.addEventListener("click", (e) => {
			mobileMenuDrawer.closeMenuDrawer(e);
		});
	};

	document.addEventListener("shopify:section:load", header);
	document.addEventListener("shopify:section:unload", header);
	document.addEventListener("shopify:section:reorder", header);

	header();
})();
