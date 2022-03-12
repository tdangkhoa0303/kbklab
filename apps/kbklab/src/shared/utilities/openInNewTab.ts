export const openInNewTab = (url: string): void => {
	Object.assign(document.createElement('a'), {
		target: '_blank',
		href: url,
	}).click();
}
