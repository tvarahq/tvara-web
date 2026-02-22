import { motion } from 'framer-motion'
import { SiNotion, SiSlack, SiGooglesheets, SiGmail, SiJira } from 'react-icons/si'
import { staggerItem, cardBase } from '../../../utils/animations'

const integrations = [
  { name: 'Notion', icon: SiNotion,       color: '#000000', bg: 'bg-gray-100'  },
  { name: 'Slack',  icon: SiSlack,        color: '#4A154B', bg: 'bg-purple-50' },
  { name: 'Sheets', icon: SiGooglesheets, color: '#34A853', bg: 'bg-green-50'  },
  { name: 'Gmail',  icon: SiGmail,        color: '#EA4335', bg: 'bg-red-50'    },
  { name: 'Jira',   icon: SiJira,         color: '#0052CC', bg: 'bg-blue-50'   },
]

export default function BlockIntegrations() {
  return (
    <motion.div className={`${cardBase} md:col-span-1 flex flex-col gap-4`} variants={staggerItem}>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
          Integrations
        </p>
        <h2 className="text-lg font-bold text-gray-900">
          Connects to the tools you already use.
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-auto">
        {integrations.map(({ name, icon: Icon, color, bg }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
              <Icon size={16} color={color} />
            </div>
            <span className="text-xs font-semibold text-gray-600">{name}</span>
          </div>
        ))}
        <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-dashed border-gray-200">
          <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
            <span className="text-gray-400 text-lg font-light">+</span>
          </div>
          <span className="text-xs font-semibold text-gray-400">More</span>
        </div>
      </div>
    </motion.div>
  )
}
