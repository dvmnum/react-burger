import PropTypes from 'prop-types';

const strRequired = PropTypes.string.isRequired
const numRequired = PropTypes.number.isRequired

const productPropTypes = PropTypes.shape({
    _id:           strRequired,
    name:          strRequired,
    type:          strRequired,
    proteins:      numRequired,
    fat:           numRequired,
    carbohydrates: numRequired,
    calories:      numRequired,
    price:         numRequired,
    image:         strRequired,
    image_mobile:  strRequired,
    image_large:   strRequired,
    __v:           numRequired,
    id:            PropTypes.string
}).isRequired

const constructorItemPropTypes = PropTypes.shape({
    _id:           strRequired,
    name:          strRequired,
    type:          strRequired,
    proteins:      numRequired,
    fat:           numRequired,
    carbohydrates: numRequired,
    calories:      numRequired,
    price:         numRequired,
    image:         strRequired,
    image_mobile:  strRequired,
    image_large:   strRequired,
    __v:           numRequired,
    id:            PropTypes.string
}).isRequired

const productArrayPropTypes = PropTypes.arrayOf(productPropTypes).isRequired

export { productArrayPropTypes, productPropTypes, constructorItemPropTypes }