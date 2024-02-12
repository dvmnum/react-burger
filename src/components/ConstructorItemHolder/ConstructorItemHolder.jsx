import styles from './ConstructorItemHolder.module.css'
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { productPropTypes } from '../../utils/prop-types'
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

function ConstructorItemHolder({ data, index, handleClose, moveCard }) {
    const { id } = data

    const ref = useRef(null);

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
    data: productPropTypes,
    index: PropTypes.number.isRequired,
    handleClose: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired
}

export default ConstructorItemHolder