import css from 'dom-css';
let scrollbarWidth = false;

export default function getScrollbarWidth() {
    if (scrollbarWidth !== false) return scrollbarWidth;
    /* istanbul ignore else */
    if (typeof document !== 'undefined') {
        const div = document.createElement('div');
        css(div, {
            width: 100,
            height: 100,
            position: 'absolute',
            top: -9999,
            overflow: 'scroll',
            MsOverflowStyle: 'scrollbar'
        });
        document.body.appendChild(div);
        scrollbarWidth = div.offsetWidth - div.clientWidth;

        /*
        * On OSX scroll sometimes not shown even for overflow: scroll
        * So, we are adding some class, which can be changed in project with ::-webkit-scrollbar
        * We are making this class public as it can be buggy for now,
        * and it is easier for you to fix everything inside your project
        * TODO: make this logic not public, when all styles will be ready enough
        * */
        if (scrollbarWidth === 0) {
            div.className = 'react-custom-scrollbars-detect';
            scrollbarWidth = div.offsetWidth - div.clientWidth;
        }

        document.body.removeChild(div);
    } else {
        scrollbarWidth = 0;
    }
    return scrollbarWidth || 0;
}
