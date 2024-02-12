import styles from './ConstructorItemHolder.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { productArrayPropTypes, constructorItemPropTypes } from '../../utils/prop-types'
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';

function ConstructorItemHolder({ data, index, handleClose, moveCard }) {
    const { id } = data
    const constructorIngredients = useSelector(state => state.constructorReducer.ingredients)
    const itemIndex = constructorIngredients.indexOf(data)

    const ref = useRef(null);
    const dispatch = useDispatch();

    const [{ handlerId }, drop] = useDrop({
        accept: 'list',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'list',
        item: () => {
            return { id, index }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref))

    return (
        <div className={styles.holder} ref={ref} data-handler-id={handlerId} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={data.name}
                price={data.price}
                thumbnail={data.image}
                extraClass='ml-2'
                handleClose={handleClose}
            />
        </div>
    )
}

ConstructorItemHolder.propTypes = {
    data: constructorItemPropTypes
}

export default ConstructorItemHolder