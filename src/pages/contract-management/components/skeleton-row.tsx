const SkeletonRowContract = () => {
  return [...Array(10)].map((_, i) => (
    <tr
      key={i}
      className="animate-pulse border-b odd:bg-white even:bg-gray-100"
    >
      {Array.from({ length: 8 }).map((__, j) => (
        <td key={j} className="px-3 py-2">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </td>
      ))}
    </tr>
  ))
}

export default SkeletonRowContract
