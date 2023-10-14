/**
 * Detect if a touch event happened on the left, middle, or right side of the element
 * @param {MouseEvent} event
 * @returns {'left'|'middle'|'right'}
 */
export default function getTouchSection(event) {
    /**
     * @type {DOMRect}
     */
    const clientRect = event.target.getBoundingClientRect();

    // is it on the right
    if (event.offsetX >= ((2/3)*clientRect.width)) {
        return 'right';
    } 

    // is it on the middle
    if (event.offsetX >= ((1/3)*clientRect.width)) {
        return 'middle';
    }

    return 'left';
}