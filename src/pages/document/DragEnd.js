import { useDispatch } from "react-redux";
import { reOrderedTasks } from "../../actions/tasks";

export const OnDragEnd = (result, data, setData) => {
  //Destructuring Results

  const { destination, source } = result;
  console.log(result);
  //Kung wala destination
  if (!destination) {
    return;
  }

  // Check kung mag kaparehas sila ng index at dropabbleId
  if (
    destination.index === source.index &&
    destination.droppableId === source.droppableId
  ) {
    return;
  }

  if (source.droppableId !== destination.droppableId) {
    const sourceColumns = data[source.droppableId];
    const destinationColumn = data[destination.droppableId];
    const copyItemSource = [...sourceColumns.datas];
    const copyItemDestination = [...destinationColumn.datas];

    const [removed] = copyItemSource.splice(source.index, 1);
    copyItemDestination.splice(destination.index, 0, removed);
    setData({
      ...data,
      [source.droppableId]: {
        ...sourceColumns,
        datas: copyItemSource,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        datas: copyItemDestination,
      },
    });
  } else {
    const sourceColumn = data[source.droppableId];
    const copyItem = [...sourceColumn.datas];
    const [removed] = copyItem.splice(source.index, 1);
    copyItem.splice(destination.index, 0, removed);

    setData({
      ...data,
      [source.droppableId]: {
        ...sourceColumn,
        datas: copyItem,
      },
    });
    const copyReorderItem = copyItem.map((copy) => {
      return copy.id;
    });
    reOrderedTasks(copyReorderItem);
  }
};
