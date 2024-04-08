import styles from './ConstructorItemHolder.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { Identifier, XYCoord } from 'dnd-core';
import { TIngredient } from '../../services/types/data';

type CIHProps = {
    data: TIngredient,
    index: number,
    handleClose: () => void,
    moveCard: (dragIndex: number, hoverIndex: number) => void,
    listIndex?: number
}

interface DragItem {
    index: number
    id: string
    type: string
}

const ConstructorItemHolder: React.FC<CIHProps> = ({ data, index, handleClose, moveCard }) => {
    const { id } = data

    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'list',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
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
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
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
                text={data.name as string}
                price={data.price as number}
                thumbnail={data.image as string}
                extraClass='ml-2'
                handleClose={handleClose}
            />
        </div>
    )
}

export default ConstructorItemHolder