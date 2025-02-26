export default function LegendItem({ color, label }: { color: string, label: string }) {
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-4 h-4 ${color} rounded-full`} />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
    )
  }