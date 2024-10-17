import { NodeResizer } from 'reactflow';

function Container({ isConnectable, onDragStart, draggable }) {
    return (
        <>
            <NodeResizer minWidth={180} minHeight={50} />
            <div className='custom-node' >

                <div style={{ width: 100, height: 40 }} onDragStart={onDragStart} draggable={draggable}>
                </div>

            </div>
        </>
    );
}

export default Container;


