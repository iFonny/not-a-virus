import NextI18Next from "next-i18next";
import path from "path";

const nextI18Next = new NextI18Next({
	otherLanguages: ["en", "tr"],
	defaultLanguage: "en",
	localeSubpaths: {
		tr: "tr",
		en: "en",
	},
	localePath: path.resolve("./public/locales"),
});

export const {
	appWithTranslation,
	withTranslation,
	i18n,
	Link,
	Router,
	useTranslation,
} = nextI18Next;

export default nextI18Next;
