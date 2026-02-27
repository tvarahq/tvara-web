import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null
  const success = payload.find((p) => p.dataKey === 'success')?.value ?? 0
  const failed = payload.find((p) => p.dataKey === 'failed')?.value ?? 0
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-3 py-2">
      <p className="text-[10px] text-gray-400 mb-1">{label}</p>
      <p className="text-xs font-medium" style={{ color: '#3399B4' }}>
        {success} successful
      </p>
      <p className="text-xs font-medium" style={{ color: '#F87171' }}>
        {failed} failed
      </p>
    </div>
  )
}

export default function PulseChart({ data }) {
  const hasData = Array.isArray(data) && data.length > 0

  if (!hasData) {
    return (
      <div className="flex items-center justify-center" style={{ height: 110 }}>
        <span className="text-xs text-gray-300 select-none">No run data yet</span>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={110}>
      <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3399B4" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#3399B4" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="failedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F87171" stopOpacity={0.12} />
            <stop offset="100%" stopColor="#F87171" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} stroke="#F3F4F6" strokeDasharray="3 3" />

        <XAxis
          dataKey="date"
          interval="preserveStartEnd"
          tick={{ fontSize: 10, fill: '#9CA3AF' }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          allowDecimals={false}
          tickCount={4}
          tick={{ fontSize: 10, fill: '#9CA3AF' }}
          tickLine={false}
          axisLine={false}
          width={28}
        />

        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="success"
          stroke="#3399B4"
          strokeWidth={2}
          fill="url(#successGrad)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0, fill: '#3399B4' }}
        />

        <Area
          type="monotone"
          dataKey="failed"
          stroke="#F87171"
          strokeWidth={2}
          fill="url(#failedGrad)"
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0, fill: '#F87171' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
