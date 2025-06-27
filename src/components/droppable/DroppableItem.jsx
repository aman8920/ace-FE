
import { useRef } from 'react'
import classNames from 'classnames';
import { useDrop } from 'react-dnd';
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider';
import DraggableItem from '../draggable/DraggableItem';

const style = {
  "alignSelf": "flex-end",
  cursor: "move"
}

const DroppableItem = (props) => {
  const { planogramData, setPlanogramData,customPlanogramData, 
    setCustomPlanogramData } = usePlanogram()
  const { isLast, className, position } = props;
  const ref = useRef(null);

  /**
   * Dropping Action for the Item, it does the item rearrangement in the context
   * @param {*} dragIndex 
   * @param {*} hoverIndex 
   * @param {*} droppingPlanogramItem 
   */
  const moveItem = (dragIndex, hoverIndex, droppingPlanogramItem) => {

    const findDroppingPositionItem = planogramData.findIndex(planogramItem => planogramItem.index === hoverIndex);
    const findDraggingIndexItem = planogramData.findIndex(planogramItem => planogramItem.index === droppingPlanogramItem.index);

    // Carrying the previous_shelf_id
    planogramData[findDraggingIndexItem].old_shelf_id = planogramData[findDraggingIndexItem].shelf_id;
    // Carrying the previous_section_details
    planogramData[findDraggingIndexItem].old_modlr_sect_nbr_derived = planogramData[findDraggingIndexItem].modlr_sect_nbr_derived;

    // Setting new shelfId After dropping the item
    planogramData[findDraggingIndexItem].shelf_id = planogramData[findDroppingPositionItem].shelf_id
    // Setting new section After dropping the item
    planogramData[findDraggingIndexItem].modlr_sect_nbr_derived = planogramData[findDroppingPositionItem].modlr_sect_nbr_derived

    const updatedPlanogramItem = { ...planogramData[findDraggingIndexItem] }

    planogramData.splice(findDraggingIndexItem, 1); // 2nd parameter means remove one item only
    planogramData.splice(findDroppingPositionItem, 0, updatedPlanogramItem);
    setPlanogramData([...planogramData])
  }


   /**
   * Dropping Action for the Item, it does the item rearrangement in the context
   * @param {*} dragIndex 
   * @param {*} hoverIndex 
   * @param {*} droppingPlanogramItem 
   */
   const moveItemCustom = (dragIndex, hoverIndex, droppingPlanogramItem) => {

    const findDroppingPositionItem = customPlanogramData.findIndex(planogramItem => planogramItem.index === hoverIndex);
    const findDraggingIndexItem = customPlanogramData.findIndex(planogramItem => planogramItem.index === droppingPlanogramItem.index);

    // Carrying the previous_shelf_id
    customPlanogramData[findDraggingIndexItem].old_shelf_id = customPlanogramData[findDraggingIndexItem].shelf_id;
    // Carrying the previous_section_details
    customPlanogramData[findDraggingIndexItem].old_modlr_sect_nbr_derived = customPlanogramData[findDraggingIndexItem].modlr_sect_nbr_derived;

    // Setting new shelfId After dropping the item
    customPlanogramData[findDraggingIndexItem].shelf_id = customPlanogramData[findDroppingPositionItem].shelf_id
    // Setting new section After dropping the item
    customPlanogramData[findDraggingIndexItem].modlr_sect_nbr_derived = customPlanogramData[findDroppingPositionItem].modlr_sect_nbr_derived

    const updatedPlanogramItem = { ...customPlanogramData[findDraggingIndexItem] }

    customPlanogramData.splice(findDraggingIndexItem, 1); // 2nd parameter means remove one item only
    customPlanogramData.splice(findDroppingPositionItem, 0, updatedPlanogramItem);
    setCustomPlanogramData([...customPlanogramData])

  }

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'ITEM'+props.pane,
    drop: (item) => {
      const dragIndex = item.index;
      const hoverIndex = position
      if(props.pane === 'pane-1')
      moveItem(dragIndex, hoverIndex, item)
      else
      moveItemCustom(dragIndex, hoverIndex, item)
    },
    canDrop: (item) => {
      return true
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  })
  const isActive = isOver && canDrop;
  drop(ref)

  return (
    <div
      ref={ref}
      style={{ ...style }}
      className={classNames('dropZone',
        { active: isActive, isLast },
        className)
      }
    >
      <DraggableItem
        key={props.idx}
        pane={props.pane}
        splitPane={props.splitPane}
        data={props.data}
        selectedBrand={props.selectedBrand}
        selectedSubcat={props.selectedSubcat}
        selectedFineline={props.selectedFineline}
        brandColors={props.brandColors}
        subcatColors={props.subcatColors}
      />
    </div>
  )

}

export default DroppableItem