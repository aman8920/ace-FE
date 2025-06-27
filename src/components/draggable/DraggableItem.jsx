import { useRef } from 'react'
import { useDrag } from 'react-dnd'
import ItemSet from '../ItemSet'

const style = {
    cursor: "move"
}

const DraggableItem = (props) => {
    const {idx, data } = props;
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'ITEM'+props.pane,
        item: {...data,idx},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const opacity = isDragging ? 0 : 1;
    drag(ref);

    return (
        <div
            ref={ref}
            style={{ ...style, opacity }}
            className='draggableItem draggable'
        >
            <ItemSet key={props.idx}
                data={props.data}
                pane={props.pane}
                splitPane={props.splitPane}
                selectedBrand={props.selectedBrand}
                selectedSubcat={props.selectedSubcat}
                selectedFineline={props.selectedFineline}
                brandColors={props.brandColors}
                subcatColors={props.subcatColors} ></ItemSet>
        </div>
    )

}

export default DraggableItem
