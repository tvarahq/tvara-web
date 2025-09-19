import React from 'react'
import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function Canvas() {
    return (
        <div className='w-full h-full'>
            <ReactFlow

                style={{ backgroundColor: '#0f181f' }}
                fitView
                fitViewOptions={{
                    padding: 0.2,
                    minZoom: 0.5,
                    maxZoom: 1.2
                }}
                defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
                minZoom={0.3}
                maxZoom={2}
                zoomOnScroll={false}
                panOnScroll={false}
            >
                <Background variant="dots" color="#fff" gap={20} size={1} />
            </ReactFlow>
        </div>
    )
}
