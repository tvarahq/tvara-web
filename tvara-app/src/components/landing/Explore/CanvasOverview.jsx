// import React, { useState } from 'react'
// import Canvas from './Canvas';
// import { buttons } from '../../../utils/landing';

// export default function CanvasOverview() {
//   const [activeTab, setActiveTab] = useState(1);

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 1:
//         return <Canvas />;
//       case 2:
//         return (
//           <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-purple-600/20'>
//             <div className='text-center'>
//               <h2 className='text-2xl font-bold text-white mb-4'>Drag & Drop Interface</h2>
//               <p className='text-gray-300'>Interactive drag and drop components will be shown here</p>
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-red-900/20 to-red-600/20'>
//             <div className='text-center'>
//               <h2 className='text-2xl font-bold text-white mb-4'>Event-Driven Workflows</h2>
//               <p className='text-gray-300'>Event trigger configurations will be displayed here</p>
//             </div>
//           </div>
//         );
//       case 4:
//         return (
//           <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-green-900/20 to-green-600/20'>
//             <div className='text-center'>
//               <h2 className='text-2xl font-bold text-white mb-4'>Credential Management</h2>
//               <p className='text-gray-300'>Security vault interface will be shown here</p>
//             </div>
//           </div>
//         );
//       case 5:
//         return (
//           <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-900/20 to-yellow-600/20'>
//             <div className='text-center'>
//               <h2 className='text-2xl font-bold text-white mb-4'>Team Collaboration</h2>
//               <p className='text-gray-300'>Collaboration tools and team management will be here</p>
//             </div>
//           </div>
//         );
//       case 6:
//         return (
//           <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-900/20 to-cyan-600/20'>
//             <div className='text-center'>
//               <h2 className='text-2xl font-bold text-white mb-4'>One-Click Deployment</h2>
//               <p className='text-gray-300'>Deployment dashboard and controls will be displayed here</p>
//             </div>
//           </div>
//         );
//       default:
//         return <Canvas />;
//     }
//   };

//   return (
//     <div id='canvas-overview' className=' w-[85%] h-[90vh]'>
//       <div className='w-full h-[93%] bg-[#726D6D2E]/80 mt-6 rounded-[10px] flex items-center justify-center p-6 gap-6 shadow-xl shadow-[#0031343c] border-2 border-gray-800'>

//         {/* Tab Buttons */}
//         <div className='w-[25%] flex flex-col justify-between h-full'>
//           {buttons.map((button) => (
//             <div
//               className={`flex gap-4 items-center rounded-[10px] p-2 shadow-sm shadow-[#373d3d] w-full cursor-pointer transition-all duration-300 flex-1 ${activeTab === button.id
//                   ? 'bg-[#726D6D2E]/100 transform scale-105'
//                   : 'bg-[#726D6D2E]/80 hover:bg-[#726D6D2E]/90'
//                 }`}
//               key={button.id}
//               onClick={() => setActiveTab(button.id)}
//               style={{
//                 borderLeft: activeTab === button.id ? `4px solid ${button.icon_color}` : 'none',
//                 marginBottom: button.id !== buttons.length ? '12px' : '0'
//               }}
//             >
//               <button.icon
//                 color={button.icon_color}
//                 size={50}
//                 className={`transition-all duration-300 flex-shrink-0 ${activeTab === button.id ? 'transform scale-110' : ''
//                   }`}
//               />
//               <div className='min-w-0 flex-1'>
//                 <h3 className={`text-[17px] font-bold leading-6 transition-colors duration-300 ${activeTab === button.id ? 'text-white' : 'text-gray-300'
//                   }`}
//                   style={{
//                     color: activeTab === button.id ? button.icon_color : undefined
//                   }}>
//                   {button.title}
//                 </h3>
//                 <p className={`text-[10px] font-light transition-colors duration-300 ${activeTab === button.id ? 'text-gray-200' : 'text-gray-400'
//                   }`}>
//                   {button.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Tab Content Area */}
//         <div className='bg-white w-[75%] h-full rounded-[10px] overflow-hidden border-2 border-gray-800 shadow-sm shadow-[#373d3d] relative'>
//           {/* Tab Content */}
//           <div className='w-full h-full bg-[#000]'>
//             {renderTabContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import React, { useState } from 'react'
import Canvas from './Canvas';
import { 
  DragDropCanvas,
  EventWorkflowCanvas, 
  CredentialVaultCanvas,
  TeamCollaborationCanvas,
  DeploymentCanvas
} from './Test';

// Mock buttons data since it's imported from utils
const buttons = [
  { id: 1, title: 'Visual Flow Builder', description: 'Drag-and-drop workflow designer', icon_color: '#3b82f6' },
  { id: 2, title: 'Drag & Drop Interface', description: 'Interactive drag and drop components', icon_color: '#8b5cf6' },
  { id: 3, title: 'Event-Driven Workflows', description: 'Event trigger configurations', icon_color: '#ef4444' },
  { id: 4, title: 'Credential Management', description: 'Security vault interface', icon_color: '#10b981' },
  { id: 5, title: 'Team Collaboration', description: 'Collaboration tools and team management', icon_color: '#f59e0b' },
  { id: 6, title: 'One-Click Deployment', description: 'Deployment dashboard and controls', icon_color: '#06b6d4' }
];

export default function CanvasOverview() {
  const [activeTab, setActiveTab] = useState(1);

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <Canvas />;
      case 2:
        return <DragDropCanvas />;
      case 3:
        return <EventWorkflowCanvas />;
      case 4:
        return <CredentialVaultCanvas />;
      case 5:
        return <TeamCollaborationCanvas />;
      case 6:
        return <DeploymentCanvas />;
      default:
        return <Canvas />;
    }
  };

  return (
    <div id='canvas-overview' className=' w-[85%] h-[90vh]'>
      <div className='w-full h-[93%] bg-[#726D6D2E]/80 mt-6 rounded-[10px] flex items-center justify-center p-6 gap-6 shadow-xl shadow-[#0031343c] border-2 border-gray-800'>

        {/* Tab Buttons */}
        <div className='w-[25%] flex flex-col justify-between h-full'>
          {buttons.map((button) => (
            <div
              className={`flex gap-4 items-center rounded-[10px] p-2 shadow-sm shadow-[#373d3d] w-full cursor-pointer transition-all duration-300 flex-1 ${activeTab === button.id
                  ? 'bg-[#726D6D2E]/100 transform scale-105'
                  : 'bg-[#726D6D2E]/80 hover:bg-[#726D6D2E]/90'
                }`}
              key={button.id}
              onClick={() => setActiveTab(button.id)}
              style={{
                borderLeft: activeTab === button.id ? `4px solid ${button.icon_color}` : 'none',
                marginBottom: button.id !== buttons.length ? '12px' : '0'
              }}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${activeTab === button.id ? 'transform scale-110' : ''
                  }`}
                style={{ backgroundColor: `${button.icon_color}20`, border: `2px solid ${button.icon_color}` }}
              >
                <div 
                  className="w-6 h-6 rounded" 
                  style={{ backgroundColor: button.icon_color }}
                ></div>
              </div>
              <div className='min-w-0 flex-1'>
                <h3 className={`text-[17px] font-bold leading-6 transition-colors duration-300 ${activeTab === button.id ? 'text-white' : 'text-gray-300'
                  }`}
                  style={{
                    color: activeTab === button.id ? button.icon_color : undefined
                  }}>
                  {button.title}
                </h3>
                <p className={`text-[10px] font-light transition-colors duration-300 ${activeTab === button.id ? 'text-gray-200' : 'text-gray-400'
                  }`}>
                  {button.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className='bg-white w-[75%] h-full rounded-[10px] overflow-hidden border-2 border-gray-800 shadow-sm shadow-[#373d3d] relative'>
          {/* Tab Content */}
          <div className='w-full h-full bg-[#000]'>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}