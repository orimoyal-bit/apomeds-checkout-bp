import os from "node:os";

const port = process.env.PORT || 5173;
const nets = os.networkInterfaces();
const ips = [];

for (const name of Object.keys(nets)) {
  for (const net of nets[name] ?? []) {
    if (net.family === "IPv4" && !net.internal) {
      ips.push(net.address);
    }
  }
}

console.log("\n📱 Open on your iPhone (same Wi‑Fi):\n");
if (ips.length === 0) {
  console.log("  No LAN IP found. Check Wi‑Fi connection.\n");
} else {
  for (const ip of ips) {
    console.log(`  http://${ip}:${port}/`);
  }
}
console.log("\n  Dev menu: add /dev to any URL, or tap ⚙ on screen.\n");
