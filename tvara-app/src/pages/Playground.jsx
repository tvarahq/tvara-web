import React, { useState } from 'react'
import Topbar from '../components/playground/Topbar'
import DefaultSideBar from '../components/common/DefaultSideBar'
import NodesSideBar from '../components/playground/NodesSideBar'
import Canvas from '../components/playground/Canvas'

export default function Playground() {
  const [nodes, setNodes] = useState([]);

  const handleAddNode = (nodeData) => {
    console.log('Node added:', nodeData);
    // Handle any parent-level logic for adding nodes
  };

  const handleDeleteSelectedNodes = (selectedNodes) => {
    console.log('Nodes deleted:', selectedNodes);
    // Handle any parent-level logic for deleting nodes
  };

  return (
    <div className='bg-canvas-bg w-full'>
      <Topbar page_name={"Workflow Builder"} />

      <div className='flex w-full '>
        <DefaultSideBar />
        <div className='w-full flex border-t-[1px] border-l-[1px] border-canvas-text/30'>
          <NodesSideBar
            onAddNode={handleAddNode}
            onDeleteSelectedNodes={handleDeleteSelectedNodes} />
          <div className='bg-[#000] w-full h-[88.6vh] border-l-[1px] border-canvas-text/30'>
            <Canvas onAddNode={handleAddNode}
              onDeleteSelectedNodes={handleDeleteSelectedNodes} />
          </div>
        </div>
      </div>
    </div>
  )
}
