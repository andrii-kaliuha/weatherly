// import { observer } from "mobx-react-lite";
// import requestStore from "../store/request/requestStore";
// import { useState } from "react";

// const DevPanel = observer(() => {
//   const { stats, loading } = requestStore;
//   const [isVisible, setIsVisible] = useState(true);

//   if (!stats) return null;

//   if (!stats) return null;

//   const sourceLabel = {
//     cache: "💾 Кеш",
//     ip: "🌐 IP",
//     gps: "📍 GPS",
//   }[stats.source];

//   if (!isVisible) {
//     return (
//       <button
//         onClick={() => setIsVisible(true)}
//         className="fixed bottom-64 right-6 z-[9999] bg-black/80 p-2 rounded-full border border-purple-500/50 shadow-lg text-lg hover:scale-110 transition-transform"
//         title="Show Debug Stats"
//       >
//         ⚡
//       </button>
//     );
//   }

//   return (
//     <div className="fixed bottom-64 right-6 z-[9999] bg-black/80 text-white p-4 rounded-lg text-xs font-mono border border-gray-700 shadow-2xl backdrop-blur-sm min-w-[180px]">
//       <div className="flex justify-between items-center mb-3">
//         <h4 className="text-purple-400 font-bold">⚡ Debug Stats</h4>
//         <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-white transition-colors p-1">
//           ✕
//         </button>
//       </div>

//       <div className="space-y-1">
//         {/* Джерело локації */}
//         <p>
//           Source: <span className="text-cyan-400">{sourceLabel}</span>
//         </p>

//         <hr className="border-gray-700 my-1" />

//         {/* IP або кеш */}
//         {stats.ip !== null && (
//           <p>
//             IP: <span className={stats.ip > 500 ? "text-yellow-400" : "text-green-400"}>{stats.ip.toFixed(0)}ms</span>
//           </p>
//         )}

//         {stats.source === "cache" && (
//           <p>
//             Cache: <span className="text-green-400">~0ms</span>
//           </p>
//         )}

//         {/* GPS — з'являється коли прийде */}
//         <p>
//           GPS:{" "}
//           {stats.gps !== null ?
//             <span className={stats.gps > 5000 ? "text-red-400" : "text-green-400"}>{stats.gps.toFixed(0)}ms</span>
//           : <span className="text-gray-500 animate-pulse">очікування...</span>}
//         </p>

//         {/* API */}
//         <p>
//           API: <span className={stats.api > 1000 ? "text-yellow-400" : "text-green-400"}>{stats.api.toFixed(0)}ms</span>
//         </p>

//         <hr className="border-gray-700 my-1" />

//         <p className="font-bold text-sm">Total: {stats.total.toFixed(0)}ms</p>
//       </div>

//       {loading && <div className="mt-2 text-[10px] animate-pulse text-blue-400">Requesting...</div>}
//     </div>
//   );
// });

// export default DevPanel;
