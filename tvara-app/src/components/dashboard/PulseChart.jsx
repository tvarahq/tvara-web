import { useMemo } from 'react'

// 30-day automation counts — realistic upward trend with slight variance
const BASE_DATA = [
  2, 3, 5, 4, 6, 5, 7, 8, 6, 9,
  10, 8, 11, 9, 12, 10, 13, 11, 14, 12,
  15, 13, 14, 16, 15, 17, 14, 18, 16, 19,
]

export default function PulseChart() {
  const data = useMemo(
    () => BASE_DATA.map((v, i) => ({ day: i + 1, value: v })),
    []
  )

  const W = 580
  const H = 96
  const PAD = { top: 8, right: 8, bottom: 4, left: 4 }

  const xMin = 1
  const xMax = 30
  const yMin = 0
  const yMax = Math.max(...data.map((d) => d.value)) + 3

  const xs = (x) => PAD.left + ((x - xMin) / (xMax - xMin)) * (W - PAD.left - PAD.right)
  const ys = (y) => H - PAD.bottom - ((y - yMin) / (yMax - yMin)) * (H - PAD.top - PAD.bottom)

  const linePath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xs(d.day).toFixed(1)} ${ys(d.value).toFixed(1)}`)
    .join(' ')

  const fillPath =
    linePath +
    ` L ${xs(xMax).toFixed(1)} ${ys(0).toFixed(1)} L ${xs(xMin).toFixed(1)} ${ys(0).toFixed(1)} Z`

  const last = data[data.length - 1]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: H }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pulseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3399B4" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3399B4" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <path d={fillPath} fill="url(#pulseGrad)" />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke="#3399B4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Terminal dot */}
      <circle cx={xs(last.day).toFixed(1)} cy={ys(last.value).toFixed(1)} r="4" fill="#3399B4" />
      <circle
        cx={xs(last.day).toFixed(1)}
        cy={ys(last.value).toFixed(1)}
        r="4"
        fill="#3399B4"
        opacity="0.3"
      >
        <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
