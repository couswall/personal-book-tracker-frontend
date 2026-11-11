import isPropValid from '@emotion/is-prop-valid';

// Themed component props that are semantically meaningful (not raw CSS escape hatches) but
// happen to collide with a real HTML attribute name used on some *other* element (e.g. `shape`
// is valid on <area>, `color` is valid on the legacy <font>/<hr>), so @emotion/is-prop-valid
// can't tell they don't belong on this element.
const THEMED_PROP_COLLISIONS = new Set(['shape', 'color']);

export const shouldForwardProp = (propName: string, target: unknown): boolean => {
    if (THEMED_PROP_COLLISIONS.has(propName)) return false;
    return typeof target === 'string' ? isPropValid(propName) : true;
};
