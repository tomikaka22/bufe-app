let splash = [
	'Az otthon készitett étel sokkal egészségesebb.',
	'Ezen az oldalon nem pörög a cookie.',
	'Adsz egy csókot?',
	'Valaki hozzányúlt a spagettimhez!',
	'Nyisd ki a szád, jön a kaja gránát!',
	'A tényekben nem szabad hinni.',
	'www.kkszki.{!straight}',
	'Órán telefonozni szigorúan tilos.',
	'6 ember rendelt az appomon ezen a héten!',
	'Nuraphone rossz.',
	'Puppy linux < bármelyik másik distro.',
	'Szigma himek nem használnak classokat.',
	'Akik OTL-t hallgatnak nem számitanak.',
	'Pár rendelés és utóléred a kövér macskáimat.',
	'Tiborral ne húzz ujjat.',
	'Ne engedd szék vagy fűzet közelébe!',
	'App bepukkasztva',
	'Release date: valamikor',
	'Májkölszoft Binbóz',
	'Általam kedvelt tanároknak jó napot kivánok!'

];

export async function load() {
	return {'splash': splash[Math.floor(Math.random() * splash.length)]};
}