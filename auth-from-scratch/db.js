const mongoose = require("mongoose");
const { exec } = require("child_process");
const { promisify } = require("util");
require("dotenv").config();

const execAsync = promisify(exec);
const MONGODB_URI = process.env.MONGODB_URL || 
  "mongodb+srv://anmol:anmol007@auth-cluster.qanpwb7.mongodb.net/?appName=auth-cluster";

// Extract parts from connection string
const match = MONGODB_URI.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/?]+)(\/.*)?/);
const [username, password, hostname, options = ""] = match ? [match[1], match[2], match[3], match[4] || ""] : [];

// Build direct connection string using nslookup
async function getDirectConnectionString() {
  if (!hostname) return null;
  
  try {
    const { stdout } = await execAsync(`nslookup -type=SRV _mongodb._tcp.${hostname}`);
    const hosts = [];
    let port = 27017;
    
    for (const line of stdout.split('\n')) {
      const portMatch = line.match(/port\s*=\s*(\d+)/i);
      if (portMatch) port = parseInt(portMatch[1]);
      
      const hostMatch = line.match(/svr\s+hostname\s*=\s*([^\s]+\.mongodb\.net)/i);
      if (hostMatch && !hosts.includes(hostMatch[1])) {
        hosts.push(`${hostMatch[1]}:${port}`);
      }
    }
    
    if (hosts.length === 0) return null;
    
    const dbPath = options.match(/^\/([^?]+)/)?.[1] || "";
    const queryParams = options.match(/\?(.+)$/)?.[1] || "";
    const params = new Map();
    
    if (queryParams) {
      queryParams.split("&").forEach(p => {
        const [key, value] = p.split("=");
        if (key) params.set(key, value || "");
      });
    }
    
    params.set("authSource", "admin");
    params.set("retryWrites", "true");
    params.set("w", "majority");
    params.set("tls", "true");
    
    const paramStr = Array.from(params.entries()).map(([k, v]) => `${k}=${v}`).join("&");
    return `mongodb://${username}:${encodeURIComponent(password)}@${hosts.join(",")}${dbPath ? `/${dbPath}` : ""}?${paramStr}`;
  } catch {
    return null;
  }
}

let directUri = null;
let isConnecting = false;

async function connect() {
  if (isConnecting) return;
  isConnecting = true;
  
  try {
    const uri = directUri || MONGODB_URI;
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });
    console.log("✅ MongoDB connected");
    isConnecting = false;
  } catch (error) {
    const isDNSError = error.message?.includes('querySrv');
    
    if (isDNSError && !directUri) {
      console.log("🔄 SRV failed, trying direct connection...");
      directUri = await getDirectConnectionString();
      if (directUri) {
        isConnecting = false;
        setTimeout(connect, 1000);
        return;
      }
    }
    
    console.error(`❌ Connection failed: ${error.message}`);
    isConnecting = false;
    setTimeout(connect, 5000);
  }
}

connect();

mongoose.connection.on("disconnected", () => {
  if (!isConnecting) setTimeout(connect, 5000);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = mongoose;
