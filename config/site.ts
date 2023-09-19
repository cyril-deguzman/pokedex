export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Pokédex",
	description: "a simple catalogue webpage where you can list and view details of Pokemon.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "About",
      href: "/about",
    }
	],
	navMenuItems: [
    {
			label: "Home",
			href: "/",
		},
    {
      label: "About",
      href: "/about",
    }
	],
	links: {
		github: "https://github.com/cyril-deguzman",
		discord: "https://discordapp.com/users/tantuwu",
    linkedin: "https://www.linkedin.com/in/cyril-ethan-de-guzman-cead119/"
	},
};
