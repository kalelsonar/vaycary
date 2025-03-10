export function NotFoundLinks() {
    const redirectionLinks = [
        {
            path: '/',
            label: 'home'
        },
        {
            path: '/s',
            label: 'search'
        },
        {
            path: '/help',
            label: 'help'
        },
        {
            path: '/whyhost',
            label: 'hostingOn',
            isSite: true
        },
        {
            path: '/safety',
            label: 'trustSafety'
        }
    ];
    return redirectionLinks;
}